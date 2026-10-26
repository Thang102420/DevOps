import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Order } from '../types';
import { 
  X, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Building, 
  CheckCircle2, 
  Lock, 
  UserCheck, 
  UserPlus, 
  BookmarkCheck
} from 'lucide-react';
import { apiService } from '../services/api';
import { AddressSelector } from './AddressSelector';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    clearCart,
    setLastPlacedOrder,
  } = useCart();

  const { currentUser, addOrder, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveProfile, setSaveProfile] = useState(true);

  // Điền tự động thông tin từ tài khoản đã đăng nhập
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || '');
      setPhone(currentUser.phone || '');
      setAddress(currentUser.address || '');
    }
  }, [currentUser, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  // NẾU NGƯỜI DÙNG CHƯA ĐĂNG NHẬP -> HIỂN THỊ YÊU CẦU ĐĂNG NHẬP
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
        <div 
          className="relative bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-5 animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Badge */}
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              Bắt buộc đăng nhập
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Vui Lòng Đăng Nhập Để Mua Hàng
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Để bảo vệ quyền lợi thành viên, theo dõi tiến trình đơn hàng và nhận bảo hành / đổi size 30 ngày, quý khách vui lòng đăng nhập hoặc đăng ký tài khoản trước khi đặt hàng.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCheckoutOpen(false);
                openAuthModal('login');
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Đăng nhập tài khoản ngay</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsCheckoutOpen(false);
                openAuthModal('register');
              }}
              className="w-full py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-blue-600" />
              <span>Chưa có tài khoản? Đăng ký tại đây</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 pt-1 block mx-auto font-medium"
            >
              Quay lại xem tiếp sản phẩm
            </button>
          </div>
        </div>
      </div>
    );
  }

  const generatedOrderCode = 'VT-' + Math.floor(100000 + Math.random() * 900000);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      showToast('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!', 'error');
      return;
    }

    if (cartItems.length === 0) {
      showToast('Túi đồ của bạn đang trống!', 'error');
      return;
    }

    setIsSubmitting(true);

    const newOrder: Order = {
      id: 'ord_' + Date.now(),
      orderCode: generatedOrderCode,
      createdAt: new Date().toLocaleString('vi-VN'),
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        email: currentUser.email,
        note: note.trim(),
      },
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })),
      subtotal,
      discountAmount,
      shippingFee,
      total: totalAmount,
      paymentMethod,
      status: 'pending',
    };

    // Lưu vào cơ sở dữ liệu MongoDB
    apiService.createOrder(newOrder).catch((err) => {
      console.warn('Lỗi khi lưu đơn hàng lên MongoDB:', err);
    });

    addOrder(newOrder);
    setLastPlacedOrder(newOrder);
    clearCart();
    setIsSubmitting(false);
    setIsCheckoutOpen(false);
    showToast(`Đặt hàng thành công! Mã đơn hàng: ${newOrder.orderCode}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Xác Nhận Đặt Hàng Thời Trang</h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-emerald-600" />
                {currentUser.name}
              </span>
            </div>
            <p className="text-xs text-slate-500">VietThang Fashion - Cam kết chất vải cao cấp, đổi size 30 ngày</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
              
              {/* Left Column: Customer Details */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>1. Thông tin giao đồ</span>
                </h3>

                <div className="space-y-3.5">
                  {/* Họ tên */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên người nhận <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn Thắng"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Số điện thoại & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số điện thoại <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ví dụ: 0988 123 456"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email tài khoản
                      </label>
                      <input
                        type="email"
                        disabled
                        value={currentUser.email}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* BỘ CHỌN VÀ GỢI Ý ĐỊA CHỈ THÔNG MINH NHƯ CÁC WEB ONLINE */}
                  <div className="pt-1">
                    <AddressSelector
                      value={address}
                      onChange={setAddress}
                      required={true}
                    />
                  </div>

                  {/* Ghi chú thêm */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ghi chú thêm (chiều cao, cân nặng để shop check size hoặc dặn shipper)
                    </label>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ví dụ: Cao 1m72 nặng 65kg lấy size L, giao giờ hành chính..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* Checkbox lưu thông tin vào tài khoản */}
                  <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      id="saveProfile"
                      checked={saveProfile}
                      onChange={(e) => setSaveProfile(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="saveProfile" className="cursor-pointer flex items-center gap-1">
                      <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Lưu thông tin và địa chỉ này làm mặc định cho các lần mua sau</span>
                    </label>
                  </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="pt-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>2. Phương thức thanh toán</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        paymentMethod === 'cod'
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900">COD (Kiểm tra đồ rồi thanh toán)</span>
                        {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Được kiểm tra chất vải, mặc thử đồ trước khi thanh toán tiền mặt cho shipper
                      </p>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('vietqr')}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        paymentMethod === 'vietqr'
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900">Chuyển khoản VietQR</span>
                        {paymentMethod === 'vietqr' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Quét mã QR tự động điền số tiền và nội dung qua ứng dụng Ngân hàng
                      </p>
                    </div>
                  </div>

                  {/* VietQR Bank Info Box if selected */}
                  {paymentMethod === 'vietqr' && (
                    <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-bold">Vietcombank - Chi nhánh Hà Nội</span>
                        </div>
                        <span className="text-[10px] bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded font-mono">
                          VietQR 24/7
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-slate-400 text-[10px]">Số tài khoản:</p>
                          <p className="font-mono font-bold text-amber-400">1029 888 999</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px]">Chủ tài khoản:</p>
                          <p className="font-bold text-white uppercase">VIETTHANG FASHION</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px]">Số tiền:</p>
                          <p className="font-bold text-emerald-400">{totalAmount.toLocaleString('vi-VN')}₫</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px]">Nội dung CK:</p>
                          <p className="font-mono font-bold text-blue-300">{generatedOrderCode}</p>
                        </div>
                      </div>

                      <div className="pt-2 text-center bg-white p-3 rounded-xl">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                            `2|99|0988123456|VIETTHANG FASHION|info@vietthangstore.vn|0|0|${totalAmount}|${generatedOrderCode}|transfer_myqr`
                          )}`}
                          alt="VietQR Code"
                          className="w-36 h-36 mx-auto rounded-lg"
                        />
                        <p className="text-[10px] text-slate-600 mt-1 font-medium">
                          Mở app Ngân hàng để quét mã thanh toán tự động
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                    Túi đồ ({cartItems.length} mẫu)
                  </h3>

                  {/* Items mini list */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-12 rounded-lg object-cover object-top bg-white border border-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                          <p className="text-slate-500 text-[10px]">
                            Size: <span className="font-semibold text-slate-700">{item.selectedSize}</span> | Màu: <span className="font-semibold text-slate-700">{item.selectedColor}</span>
                          </p>
                          <p className="text-slate-400 text-[10px]">SL: x{item.quantity}</p>
                        </div>
                        <span className="font-bold text-slate-700 shrink-0">
                          {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600 mt-4">
                    <div className="flex justify-between">
                      <span>Tạm tính tiền đồ:</span>
                      <span className="font-semibold text-slate-800">
                        {subtotal.toLocaleString('vi-VN')}₫
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Giảm giá voucher:</span>
                        <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Phí giao hàng:</span>
                      <span className="font-semibold text-slate-800">
                        {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-slate-900">Tổng thanh toán:</span>
                      <span className="text-lg font-black text-blue-600">
                        {totalAmount.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Đang đóng gói đơn hàng...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Hoàn tất đặt hàng</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    Đổi size miễn phí trong 30 ngày nếu mặc không vừa vặn
                  </p>
                </div>

              </div>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
