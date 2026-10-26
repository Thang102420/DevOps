import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

export const WishlistModal: React.FC = () => {
  const { wishlistIds, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, setSelectedProductForDetail } = useCart();
  const { products } = useProducts();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Mục Yêu Thích</h3>
                <p className="text-xs text-slate-500">{wishlistedProducts.length} sản phẩm đã lưu</p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length > 0 ? (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 transition-all shadow-sm group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 rounded-xl object-cover object-top shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProductForDetail(product);
                      setIsWishlistOpen(false);
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase">
                        {product.categoryName}
                      </span>
                      <h4
                        onClick={() => {
                          setSelectedProductForDetail(product);
                          setIsWishlistOpen(false);
                        }}
                        className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs font-extrabold text-blue-600 mt-1">
                        {product.price.toLocaleString('vi-VN')}₫
                        {product.originalPrice > product.price && (
                          <span className="ml-2 text-[11px] text-slate-400 line-through font-normal">
                            {product.originalPrice.toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        disabled={!product.inStock}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Thêm vào giỏ</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Xóa khỏi yêu thích"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Chưa có sản phẩm yêu thích</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">
                  Bấm vào biểu tượng trái tim trên các sản phẩm bạn ưng ý để lưu lại xem sau nhé!
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Khám phá thời trang
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => {
                    if (p.inStock) addToCart(p, 1);
                  });
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Thêm tất cả vào túi đồ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
