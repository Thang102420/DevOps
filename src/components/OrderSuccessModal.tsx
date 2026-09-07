import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, PackageCheck, ShoppingBag, ArrowRight } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder } = useCart();
  const { openHistoryModal } = useAuth();

  if (!lastPlacedOrder) return null;

  const handleClose = () => {
    setLastPlacedOrder(null);
  };

  const handleViewHistory = () => {
    setLastPlacedOrder(null);
    openHistoryModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-5 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Checkmark */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
            Đặt hàng thành công
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            Cảm Ơn Bạn Đã Mua Hàng!
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Đơn hàng của bạn đã được ghi nhận và chuyển cho đội ngũ kỹ thuật đóng gói.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2.5 text-xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Mã đơn hàng:</span>
            <span className="font-mono font-bold text-blue-600 text-sm">
              {lastPlacedOrder.orderCode}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500">Người nhận:</span>
            <span className="font-semibold text-slate-800">{lastPlacedOrder.customer.fullName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500">Số điện thoại:</span>
            <span className="font-semibold text-slate-800">{lastPlacedOrder.customer.phone}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500">Phương thức:</span>
            <span className="font-semibold text-slate-800 uppercase">
              {lastPlacedOrder.paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : 'COD (Tiền mặt)'}
            </span>
          </div>

          <div className="flex justify-between items-center border-t border-slate-200 pt-2">
            <span className="text-slate-900 font-bold">Tổng thanh toán:</span>
            <span className="font-black text-blue-600 text-base">
              {lastPlacedOrder.total.toLocaleString('vi-VN')}₫
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleClose}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tiếp tục mua sắm</span>
          </button>

          <button
            onClick={handleViewHistory}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <PackageCheck className="w-4 h-4 text-blue-600" />
            <span>Xem trong lịch sử đơn hàng</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
