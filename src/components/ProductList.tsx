import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, SearchX, CheckCircle, Smartphone, Laptop, Headphones, Home, Sparkles } from 'lucide-react';

interface ProductListProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ searchQuery, setSearchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCat = product.categoryName.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default order
    });
  }, [selectedCategory, inStockOnly, searchQuery, sortBy]);

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'phone': return <Smartphone className="w-4 h-4" />;
      case 'laptop': return <Laptop className="w-4 h-4" />;
      case 'accessory': return <Sparkles className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'smarthome': return <Home className="w-4 h-4" />;
      default: return <SlidersHorizontal className="w-4 h-4" />;
    }
  };

  return (
    <section id="products-section" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Kho Sản Phẩm Chính Hãng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Danh Mục Thiết Bị Công Nghệ
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Khám phá các sản phẩm công nghệ tiên tiến nhất với giá ưu đãi độc quyền
            </p>
          </div>

          {/* Controls Bar: Sort & In stock filter */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Filter In Stock */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                inStockOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${inStockOnly ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Chỉ còn hàng</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="default">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search status notification if active */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-blue-50/60 border border-blue-100 px-4 py-2.5 rounded-2xl text-xs text-blue-900">
            <span>
              Kết quả tìm kiếm cho từ khóa: <strong>"{searchQuery}"</strong> ({filteredProducts.length} sản phẩm)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 font-bold hover:underline"
            >
              Xóa tìm kiếm
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Không tìm thấy sản phẩm nào</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
              Rất tiếc chúng tôi không tìm thấy sản phẩm nào khớp với bộ lọc hoặc từ khóa tìm kiếm của bạn.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setInStockOnly(false);
                setSortBy('default');
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
