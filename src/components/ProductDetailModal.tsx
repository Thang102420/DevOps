import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingCart, ShieldCheck, Truck, Check, Plus, Minus, Cpu } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, setSelectedProductForDetail, addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
  const formattedOriginalPrice = product.originalPrice.toLocaleString('vi-VN') + '₫';

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSelectedProductForDetail(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Card */}
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <span>Chi tiết sản phẩm</span>
            <span>•</span>
            <span>{product.categoryName}</span>
          </div>
          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
            aria-label="Đóng chi tiết"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Image Col */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                    Tiết kiệm {product.discount}%
                  </span>
                )}
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Chính hãng 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Miễn phí giao hàng</span>
                </div>
              </div>
            </div>

            {/* Info Col */}
            <div className="md:col-span-7 space-y-4">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {product.name}
                </h2>
                
                {/* Rating & Stock */}
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount} đánh giá)</span>
                  </div>
                  <span>•</span>
                  <span className={`font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {product.inStock ? `Còn ${product.stockCount} sản phẩm sẵn có` : 'Tạm hết hàng'}
                  </span>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-blue-600">
                  {formattedPrice}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Đặc điểm nổi bật:</h4>
                <ul className="space-y-1.5">
                  {product.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Action Buttons */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Số lượng:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                      disabled={quantity >= product.stockCount}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-sm transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Thêm giỏ hàng</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Technical Specifications Table */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Bảng Thông Số Kỹ Thuật Chi Tiết</h3>
                <p className="text-xs text-slate-500">Thông tin được chứng nhận từ nhà sản xuất</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <tbody>
                  {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                    <tr
                      key={specKey}
                      className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                    >
                      <td className="py-3 px-4 font-semibold text-slate-700 w-1/3 border-b border-slate-200/60">
                        {specKey}
                      </td>
                      <td className="py-3 px-4 text-slate-900 border-b border-slate-200/60">
                        {specVal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
