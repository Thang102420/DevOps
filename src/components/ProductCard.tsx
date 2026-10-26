import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Eye, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProductForDetail, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
  const formattedOriginalPrice = product.originalPrice.toLocaleString('vi-VN') + '₫';

  // Helper for color dots preview
  const getColorHex = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('đen')) return '#0f172a';
    if (lower.includes('trắng') || lower.includes('kem') || lower.includes('sữa')) return '#f8fafc';
    if (lower.includes('xanh navy') || lower.includes('xanh than') || lower.includes('xanh đen')) return '#1e3a8a';
    if (lower.includes('xanh biển') || lower.includes('xanh dương')) return '#0284c7';
    if (lower.includes('xanh rêu') || lower.includes('xanh bơ') || lower.includes('mint')) return '#15803d';
    if (lower.includes('đỏ')) return '#b91c1c';
    if (lower.includes('hồng')) return '#ec4899';
    if (lower.includes('xám') || lower.includes('ghi') || lower.includes('tiêu')) return '#64748b';
    if (lower.includes('be') || lower.includes('khaki') || lower.includes('cát') || lower.includes('camel')) return '#d4b996';
    if (lower.includes('nâu') || lower.includes('cafe')) return '#78350f';
    if (lower.includes('vàng')) return '#eab308';
    if (lower.includes('tím')) return '#9333ea';
    return '#94a3b8';
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges on Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount > 0 && (
            <span className="bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              -{product.discount}%
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-slate-900/90 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Hot Trend
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              Mới 2026
            </span>
          )}
        </div>

        {/* Wishlist & Stock on Right */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2">
          {/* Wishlist heart button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all ${
              wishlisted
                ? 'bg-rose-50 text-rose-500 scale-105'
                : 'bg-white/85 text-slate-500 hover:text-rose-500 hover:bg-white'
            }`}
            title={wishlisted ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Stock status tag */}
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Sẵn hàng
            </span>
          ) : (
            <span className="bg-slate-900/90 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Cháy hàng
            </span>
          )}
        </div>

        {/* Available Sizes preview pill on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-xl">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="text-[10px] font-bold text-white px-0.5">
                {s}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-slate-300 font-bold">...</span>
            )}
          </div>

          {/* Color preview dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex -space-x-1 bg-black/50 backdrop-blur-md p-1 rounded-full">
              {product.colors.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-inner"
                  style={{ backgroundColor: getColorHex(c) }}
                  title={c}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="w-3.5 h-3.5 rounded-full bg-slate-700 text-white text-[8px] flex items-center justify-center font-bold">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => setSelectedProductForDetail(product)}
            className="flex items-center gap-1.5 bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>Xem chi tiết & Thử Size</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-[11px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="font-bold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProductForDetail(product)}
            className="font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-2 transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Material Tag */}
          <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-medium">
            Chất liệu: <span className="text-slate-700">{product.material}</span>
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-blue-600">
              {formattedPrice}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                {formattedOriginalPrice}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className={`p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              product.inStock
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            title="Thêm vào túi đồ"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Chọn mua</span>
          </button>
        </div>

      </div>

    </div>
  );
};
