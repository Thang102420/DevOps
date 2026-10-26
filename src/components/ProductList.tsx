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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Thời Trang Xu Hướng 2026 • 36 Mẫu Thiết Kế</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bộ Sưu Tập Thời Trang Thiết Kế
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Trang phục nam nữ phong cách hiện đại, form dáng chuẩn đẹp và êm ái suốt ngày dài
            </p>
          </div>

          {/* Quick Counter */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-2xl shadow-sm">
            <span>Hiển thị:</span>
            <strong className="text-blue-600 font-extrabold text-sm">{filteredProducts.length}</strong>
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
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row: Price, In-stock, Sorting & View Toggle */}
        <div className="bg-white border border-slate-200/90 p-3 sm:p-4 rounded-2xl shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3">
          
          {/* Price Range Filters */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Mức giá:
            </span>
            <button
              onClick={() => setPriceRange('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                priceRange === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setPriceRange('under-300')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                priceRange === 'under-300'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Dưới 300k
            </button>
            <button
              onClick={() => setPriceRange('300-600')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                priceRange === '300-600'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              300k - 600k
            </button>
            <button
              onClick={() => setPriceRange('above-600')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                priceRange === 'above-600'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${inStockOnly ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Còn hàng</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="default">Phổ biến nhất</option>
                <option value="newest">Mới nhất 2026</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

            {/* Grid Columns Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setColumns(3)}
                className={`p-1 rounded-lg transition-colors ${
                  columns === 3 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Lưới 3 cột"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1 rounded-lg transition-colors ${
                  columns === 4 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'
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
          <div className="mb-6 flex items-center justify-between bg-blue-50/80 border border-blue-200 px-4 py-3 rounded-2xl text-xs sm:text-sm text-blue-900 shadow-sm">
            <span>
              Tìm thấy <strong>{filteredProducts.length}</strong> mẫu trang phục khớp với từ khóa: <strong>"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 font-bold hover:underline ml-4"
            >
              Xóa tìm kiếm
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-semibold text-slate-500">Đang đồng bộ dữ liệu sản phẩm từ MongoDB...</p>
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
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Không tìm thấy mẫu trang phục nào</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
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
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
            >
              Xem tất cả 36 mẫu trang phục
            </button>
          </div>
        ) : null}

      </div>
    </section>
  );
};
