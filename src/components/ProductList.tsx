import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  SearchX, 
  CheckCircle, 
  Shirt, 
  Sparkles, 
  Activity, 
  Scissors, 
  Layers,
  LayoutGrid,
  Grid3X3,
  Filter
} from 'lucide-react';

interface ProductListProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ searchQuery, setSearchQuery }) => {
  const { products, isLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('default');
  const [priceRange, setPriceRange] = useState<'all' | 'under-300' | '300-600' | 'above-600'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Price range filter
      if (priceRange === 'under-300' && product.price >= 300000) return false;
      if (priceRange === '300-600' && (product.price < 300000 || product.price > 600000)) return false;
      if (priceRange === 'above-600' && product.price <= 600000) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCat = product.categoryName.toLowerCase().includes(q);
        const matchMat = product.material.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat && !matchMat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // default order
    });
  }, [products, selectedCategory, inStockOnly, priceRange, searchQuery, sortBy]);

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'men': return <Shirt className="w-4 h-4" />;
      case 'women': return <Sparkles className="w-4 h-4" />;
      case 'pants': return <Scissors className="w-4 h-4" />;
      case 'sport': return <Activity className="w-4 h-4" />;
      case 'outerwear': return <Layers className="w-4 h-4" />;
      case 'accessories': return <SlidersHorizontal className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Count items per category
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <section id="products-section" className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5EFE6] text-[#71553E] border border-[#E0D2C0] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#A3704C]" />
              <span>Thời Trang Xu Hướng 2026 • 36 Mẫu Thiết Kế</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2117] tracking-tight">
              Bộ Sưu Tập Thời Trang Thiết Kế
            </h2>
            <p className="text-sm text-[#71553E] mt-1">
              Trang phục nam nữ phong cách hiện đại, form dáng chuẩn đẹp và êm ái suốt ngày dài
            </p>
          </div>

          {/* Quick Counter */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#71553E] bg-[#FDFCF9] border border-[#EBE3D5] px-3.5 py-2 rounded-2xl shadow-sm">
            <span>Hiển thị:</span>
            <strong className="text-[#A3704C] font-extrabold text-sm">{filteredProducts.length}</strong>
            <span>trang phục</span>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#A3704C] text-[#FAF8F5] shadow-md shadow-[#A3704C]/25 scale-[1.02]'
                    : 'bg-[#FDFCF9] text-[#71553E] border border-[#EBE3D5] hover:bg-[#FAF8F5] hover:border-[#DDD1BF] hover:text-[#2D2117]'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#F5EFE6] text-[#71553E]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row: Price, In-stock, Sorting & View Toggle */}
        <div className="bg-[#FDFCF9] border border-[#EBE3D5] p-3 sm:p-4 rounded-2xl shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3">
          
          {/* Price Range Filters */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-[#71553E] flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#A98D71]" />
              Mức giá:
            </span>
            <button
              onClick={() => setPriceRange('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                priceRange === 'all'
                  ? 'bg-[#2D2117] text-[#FAF8F5] shadow-sm'
                  : 'bg-[#FAF8F5] text-[#71553E] border border-[#EBE3D5] hover:bg-[#F5EFE6]'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setPriceRange('under-300')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                priceRange === 'under-300'
                  ? 'bg-[#2D2117] text-[#FAF8F5] shadow-sm'
                  : 'bg-[#FAF8F5] text-[#71553E] border border-[#EBE3D5] hover:bg-[#F5EFE6]'
              }`}
            >
              Dưới 300k
            </button>
            <button
              onClick={() => setPriceRange('300-600')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                priceRange === '300-600'
                  ? 'bg-[#2D2117] text-[#FAF8F5] shadow-sm'
                  : 'bg-[#FAF8F5] text-[#71553E] border border-[#EBE3D5] hover:bg-[#F5EFE6]'
              }`}
            >
              300k - 600k
            </button>
            <button
              onClick={() => setPriceRange('above-600')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                priceRange === 'above-600'
                  ? 'bg-[#2D2117] text-[#FAF8F5] shadow-sm'
                  : 'bg-[#FAF8F5] text-[#71553E] border border-[#EBE3D5] hover:bg-[#F5EFE6]'
              }`}
            >
              Trên 600k
            </button>
          </div>

          {/* Right Controls: In-Stock toggle, Sort & Layout Switch */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter In Stock */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                inStockOnly
                  ? 'bg-[#EFF5EB] border-[#D5E3CC] text-[#587346] font-bold'
                  : 'bg-[#FAF8F5] border-[#EBE3D5] text-[#71553E] hover:bg-[#F5EFE6]'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${inStockOnly ? 'text-[#587346]' : 'text-[#A98D71]'}`} />
              <span>Còn hàng</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#EBE3D5] px-3 py-1.5 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A98D71]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold text-[#2D2117] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="default">Phổ biến nhất</option>
                <option value="newest">Mới nhất 2026</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

            {/* Grid Columns Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#EBE3D5]">
              <button
                onClick={() => setColumns(3)}
                className={`p-1 rounded-lg transition-colors ${
                  columns === 3 ? 'bg-[#FDFCF9] text-[#A3704C] shadow-sm' : 'text-[#A98D71] hover:text-[#2D2117]'
                }`}
                title="Lưới 3 cột"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1 rounded-lg transition-colors ${
                  columns === 4 ? 'bg-[#FDFCF9] text-[#A3704C] shadow-sm' : 'text-[#A98D71] hover:text-[#2D2117]'
                }`}
                title="Lưới 4 cột"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Search status banner if active */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-[#F5EFE6] border border-[#E0D2C0] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#2D2117] shadow-sm">
            <span>
              Tìm thấy <strong>{filteredProducts.length}</strong> mẫu trang phục khớp với từ khóa: <strong>"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#A3704C] font-bold hover:underline ml-4"
            >
              Xóa tìm kiếm
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-4 border-[#A3704C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-semibold text-[#71553E]">Đang đồng bộ dữ liệu sản phẩm từ MongoDB...</p>
          </div>
        )}

        {/* Product Cards Grid */}
        {!isLoading && filteredProducts.length > 0 ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : !isLoading ? (
          /* Empty State */
          <div className="text-center py-16 bg-[#FDFCF9] rounded-3xl border border-dashed border-[#DDD1BF] p-8 shadow-sm">
            <div className="w-16 h-16 bg-[#F5EFE6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#A98D71]">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#2D2117] mb-1">Không tìm thấy mẫu trang phục nào</h3>
            <p className="text-xs text-[#71553E] max-w-md mx-auto mb-6">
              Không có sản phẩm nào thỏa mãn điều kiện lọc của bạn. Hãy thử chọn danh mục khác hoặc xóa bộ lọc nhé!
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setInStockOnly(false);
                setPriceRange('all');
                setSortBy('default');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#A3704C] hover:bg-[#8E5E36] text-[#FAF8F5] text-xs font-bold transition-all shadow-md shadow-[#A3704C]/20"
            >
              Xem tất cả 36 mẫu trang phục
            </button>
          </div>
        ) : null}

      </div>
    </section>
  );
};
