import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Eye, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProductForDetail } = useCart();

  const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
  const formattedOriginalPrice = product.originalPrice.toLocaleString('vi-VN') + '₫';

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300/80 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount > 0 && (
            <span className="bg-rose-500 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              -{product.discount}%
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              Bán chạy
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Còn hàng
            </span>
          ) : (
            <span className="bg-slate-800/90 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-full">
              Tạm hết
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => setSelectedProductForDetail(product)}
            className="flex items-center gap-1.5 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Xem thông số</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="text-blue-600 font-semibold uppercase tracking-wider text-[11px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="font-bold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProductForDetail(product)}
            className="font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-2 transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Highlight snippet */}
          <p className="text-xs text-slate-500 line-clamp-1 mt-1">
            {product.highlights[0] || product.description}
          </p>
        </div>

        {/* Price and Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
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
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Chọn mua</span>
          </button>
        </div>

      </div>

    </div>
  );
};
