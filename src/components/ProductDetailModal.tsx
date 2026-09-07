import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingCart, ShieldCheck, Truck, Check, Plus, Minus, Ruler, Sparkles } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, setSelectedProductForDetail, addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (selectedProductForDetail) {
      setSelectedSize(selectedProductForDetail.sizes[0] || 'M');
      setSelectedColor(selectedProductForDetail.colors[0] || 'Tiêu chuẩn');
      setQuantity(1);
    }
  }, [selectedProductForDetail]);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
  const formattedOriginalPrice = product.originalPrice.toLocaleString('vi-VN') + '₫';

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setSelectedProductForDetail(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <span>Chi tiết thời trang</span>
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

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Image Col */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                    Ưu đãi -{product.discount}%
                  </span>
                )}
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Vải chuẩn xịn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đổi size 30 ngày</span>
                </div>
              </div>
            </div>

            {/* Product Options & Buy Form */}
            <div className="md:col-span-7 space-y-4">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount} đánh giá)</span>
                  </div>
                  <span>•</span>
                  <span className={`font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {product.inStock ? `Còn ${product.stockCount} sản phẩm trong kho` : 'Tạm hết size'}
                  </span>
                </div>
              </div>

              {/* Price */}
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

              {/* Choose Color */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Chọn Màu Sắc:</span>
                  <span className="text-blue-600 font-semibold">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedColor === color
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Choose Size */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Chọn Kích Thước (Size):</span>
                  <span className="text-blue-600 font-semibold">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Đặc điểm nổi bật:</h4>
                <ul className="space-y-1">
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
                    <span>Thêm vào túi</span>
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

          {/* Size Chart & Specs Table */}
          <div className="pt-6 border-t border-slate-200 space-y-6">
            
            {/* Size Consultation Table */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Bảng Tư Vấn Chọn Size Chuẩn Người Việt</h3>
                  <p className="text-xs text-slate-500">Đổi trả miễn phí trong 30 ngày nếu không vừa size</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
                <table className="w-full text-center border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-bold">
                    <tr>
                      <th className="py-2.5 px-3 border-b border-slate-200">Size</th>
                      <th className="py-2.5 px-3 border-b border-slate-200">Chiều cao (cm)</th>
                      <th className="py-2.5 px-3 border-b border-slate-200">Cân nặng (kg)</th>
                      <th className="py-2.5 px-3 border-b border-slate-200">Dáng mặc</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-blue-600">S</td>
                      <td className="py-2.5 px-3">1m50 - 1m62</td>
                      <td className="py-2.5 px-3">42 - 52 kg</td>
                      <td className="py-2.5 px-3">Gọn gàng, vừa vặn</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-blue-600">M</td>
                      <td className="py-2.5 px-3">1m60 - 1m70</td>
                      <td className="py-2.5 px-3">53 - 62 kg</td>
                      <td className="py-2.5 px-3">Thoải mái</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-blue-600">L</td>
                      <td className="py-2.5 px-3">1m68 - 1m78</td>
                      <td className="py-2.5 px-3">63 - 72 kg</td>
                      <td className="py-2.5 px-3">Form chuẩn đẹp</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-blue-600">XL / XXL</td>
                      <td className="py-2.5 px-3">1m75 - 1m88</td>
                      <td className="py-2.5 px-3">73 - 88 kg</td>
                      <td className="py-2.5 px-3">Rộng rãi phóng khoáng</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Chi Tiết Chất Liệu & Xuất Xứ</h3>
                  <p className="text-xs text-slate-500">Tiêu chuẩn kiểm định dệt may an toàn cho làn da</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                      <tr
                        key={specKey}
                        className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                      >
                        <td className="py-2.5 px-4 font-semibold text-slate-700 w-1/3 border-b border-slate-200/60">
                          {specKey}
                        </td>
                        <td className="py-2.5 px-4 text-slate-900 border-b border-slate-200/60">
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

    </div>
  );
};
