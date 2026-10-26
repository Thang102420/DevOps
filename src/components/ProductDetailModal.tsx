import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  X, 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Check, 
  Plus, 
  Minus, 
  Ruler, 
  Heart,
  ThumbsUp
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductForDetail, 
    setSelectedProductForDetail, 
    addToCart, 
    setIsCheckoutOpen,
    toggleWishlist,
    isWishlisted
  } = useCart();

  const { currentUser, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'reviews'>('info');

  useEffect(() => {
    if (selectedProductForDetail) {
      setSelectedSize(selectedProductForDetail.sizes[0] || 'M');
      setSelectedColor(selectedProductForDetail.colors[0] || 'Tiêu chuẩn');
      setActiveImage(selectedProductForDetail.image);
      setQuantity(1);
      setActiveTab('info');
    }
  }, [selectedProductForDetail]);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const wishlisted = isWishlisted(product.id);
  const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
  const formattedOriginalPrice = product.originalPrice.toLocaleString('vi-VN') + '₫';

  // List of images for gallery
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setSelectedProductForDetail(null);
    if (!currentUser) {
      showToast('Vui lòng đăng nhập tài khoản để tiến hành đặt mua hàng!', 'warning');
      openAuthModal('login');
    } else {
      setIsCheckoutOpen(true);
    }
  };

  // Sample Customer Reviews
  const sampleReviews = [
    {
      author: 'Nguyễn Thu Trang',
      verified: true,
      rating: 5,
      date: '2 ngày trước',
      comment: 'Vải mềm mịn, mát tay và mặc tôn dáng dã man luôn ạ! Đường may sắc sảo xịn xò như đồ thiết kế đắt tiền, đóng hộp cẩn thận. Rất ưng ý!',
      sizePurchased: selectedSize || 'M',
    },
    {
      author: 'Trần Minh Hoàng',
      verified: true,
      rating: 5,
      date: '1 tuần trước',
      comment: 'Mình cao 1m73 nặng 68kg chọn size L mặc vừa in như may đo. Form đứng áo, giặt máy không bị nhăn hay xù lông gì cả.',
      sizePurchased: 'L',
    },
    {
      author: 'Lê Thùy Dung',
      verified: true,
      rating: 5,
      date: '2 tuần trước',
      comment: 'Được thử đồ và kiểm tra chất vải thoải mái trước khi thanh toán shipper. Shop hỗ trợ nhiệt tình, 5 sao!',
      sizePurchased: 'S',
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <span>Chi tiết thời trang</span>
            <span>•</span>
            <span className="font-extrabold">{product.categoryName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-full border transition-all ${
                wishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-rose-500'
              }`}
              title={wishlisted ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => setSelectedProductForDetail(null)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
              aria-label="Đóng chi tiết"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
            
            {/* Image Gallery Column */}
            <div className="md:col-span-5 space-y-3">
              {/* Main Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === imgUrl ? 'border-blue-600 scale-95 shadow-md' : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="thumbnail" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>100% Vải chính phẩm</span>
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
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {product.name}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount} đánh giá)</span>
                  </div>
                  <span>•</span>
                  <span className={`font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {product.inStock ? `Còn ${product.stockCount} sản phẩm trong kho` : 'Tạm hết hàng'}
                  </span>
                </div>
              </div>

              {/* Price Tag */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-100 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-blue-600">
                  {formattedPrice}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md ml-auto">
                    Tiết kiệm {(product.originalPrice - product.price).toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Choose Color */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Chọn Màu Sắc:</span>
                  <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedColor === color
                          ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50'
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
                  <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50/70'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Đặc tính nổi bật:</h4>
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
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Thêm vào túi</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Navigation Tabs for Details, Size Chart & Reviews */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2 mb-4">
              <button
                onClick={() => setActiveTab('info')}
                className={`pb-2 px-1 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'info'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Bảng Size & Xuất Xứ
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 px-1 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'specs'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Thông Số Kỹ Thuật
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 px-1 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Đánh Giá Khách Hàng</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full">
                  {product.reviewsCount}
                </span>
              </button>
            </div>

            {/* Tab 1: Size Consultation */}
            {activeTab === 'info' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Bảng Tư Vấn Chọn Size Chuẩn Người Việt</h3>
                    <p className="text-xs text-slate-500">Đổi size miễn phí trong 30 ngày nếu không vừa</p>
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
                        <td className="py-2 px-3 font-bold text-blue-600">S</td>
                        <td className="py-2 px-3">1m50 - 1m62</td>
                        <td className="py-2 px-3">42 - 52 kg</td>
                        <td className="py-2 px-3">Gọn gàng vừa vặn</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold text-blue-600">M</td>
                        <td className="py-2 px-3">1m60 - 1m70</td>
                        <td className="py-2 px-3">53 - 62 kg</td>
                        <td className="py-2 px-3">Thoải mái chuẩn đẹp</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold text-blue-600">L</td>
                        <td className="py-2 px-3">1m68 - 1m78</td>
                        <td className="py-2 px-3">63 - 72 kg</td>
                        <td className="py-2 px-3">Tôn vóc dáng</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold text-blue-600">XL / XXL</td>
                        <td className="py-2 px-3">1m75 - 1m88</td>
                        <td className="py-2 px-3">73 - 88 kg</td>
                        <td className="py-2 px-3">Rộng rãi phóng khoáng</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Specs */}
            {activeTab === 'specs' && (
              <div className="space-y-4 animate-fade-in">
                <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                        <tr
                          key={specKey}
                          className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                        >
                          <td className="py-2.5 px-4 font-bold text-slate-700 w-1/3 border-b border-slate-200/60">
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
            )}

            {/* Tab 3: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-slate-900">{product.rating.toFixed(1)}</span>
                    <div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Dựa trên {product.reviewsCount} lượt mua hàng xác thực</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>99% Khách hài lòng</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {sampleReviews.map((rev, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{rev.author}</span>
                          {rev.verified && (
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                              Đã mua hàng
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400 text-[11px]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
