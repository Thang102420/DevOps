import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, CheckCircle2, Truck } from 'lucide-react';
import { VOUCHERS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShipThreshold = 500000;
  const isFreeShip = subtotal >= freeShipThreshold;
  const freeShipProgress = Math.min(100, Math.round((subtotal / freeShipThreshold) * 100));
  const remainingForFreeShip = freeShipThreshold - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Túi Đồ Thời Trang
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} món
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cartItems.length > 0 && (
            <div className="bg-blue-50/80 border-b border-blue-100 px-5 py-3">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-blue-900">
                  <Truck className="w-4 h-4 text-blue-600" />
                  {isFreeShip ? (
                    <span className="text-emerald-700">🎉 Đã đủ điều kiện FREESHIP toàn quốc!</span>
                  ) : (
                    <span>
                      Mua thêm <strong className="text-blue-700 font-extrabold">{remainingForFreeShip.toLocaleString('vi-VN')}₫</strong> để nhận Freeship
                    </span>
                  )}
                </span>
                <span className="text-blue-600 text-[11px]">{freeShipProgress}%</span>
              </div>
              <div className="w-full bg-blue-200/60 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isFreeShip ? 'bg-emerald-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${freeShipProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Content */}
          {cartItems.length > 0 ? (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-slate-100">
                {cartItems.map((item, idx) => {
                  const product = item.product;
                  return (
                    <div key={`${product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`} className="pt-4 first:pt-0 flex gap-3.5">
                      {/* Product Thumbnail */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-24 rounded-2xl object-cover object-top bg-slate-100 border border-slate-200 shrink-0 shadow-sm"
                      />

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                              {product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(product.id, item.selectedSize, item.selectedColor)}
                              className="text-slate-400 hover:text-rose-500 p-1 rounded-md transition-colors shrink-0"
                              title="Xóa món này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          {/* Size & Color chip */}
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              Size: {item.selectedSize || 'M'}
                            </span>
                            <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {item.selectedColor || 'Tiêu chuẩn'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1">
                          <span className="text-xs sm:text-sm font-black text-blue-600">
                            {(product.price * item.quantity).toLocaleString('vi-VN')}₫
                          </span>

                          {/* Quantity Controller */}
                          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                            <button
                              onClick={() => updateQuantity(product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo code & Summary Section */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 space-y-3.5">
                
                {/* Promo Code Input & Quick Chips */}
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Mã voucher (VIETTHANG10)"
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono uppercase text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                    >
                      Áp dụng
                    </button>
                  </form>

                  {/* Quick voucher suggestion buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-slate-400 font-semibold">Gợi ý:</span>
                    {VOUCHERS.map((v) => (
                      <button
                        key={v.code}
                        type="button"
                        onClick={() => applyCoupon(v.code)}
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border transition-all ${
                          appliedCoupon === v.code
                            ? 'bg-amber-400 text-slate-950 border-amber-500 font-extrabold'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                        }`}
                        title={v.description}
                      >
                        {v.code}
                      </button>
                    ))}
                  </div>

                  {/* Applied Coupon Chip */}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl mt-2 text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mã đã dùng: {appliedCoupon}</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-700 hover:text-emerald-900 text-[11px] underline font-medium"
                      >
                        Gỡ bỏ
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div className="flex justify-between">
                    <span>Tạm tính tiền đồ:</span>
                    <span className="font-semibold text-slate-800">
                      {subtotal.toLocaleString('vi-VN')}₫
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Giảm giá ({appliedCoupon}):</span>
                      <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Phí giao hàng:</span>
                    <span className="font-semibold text-slate-800">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-bold">Miễn phí toàn quốc</span>
                      ) : (
                        `${shippingFee.toLocaleString('vi-VN')}₫`
                      )}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Tổng thanh toán:</span>
                    <span className="text-xl font-black text-blue-600">
                      {totalAmount.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Tiến hành đặt hàng</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </>
          ) : (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4 text-rose-500">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                Túi đồ của bạn đang trống
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Chưa có trang phục nào trong túi. Hãy chọn cho mình những bộ đồ ưng ý nhất nhé!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-md shadow-blue-500/20"
              >
                Khám phá bộ sưu tập 36 món
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
