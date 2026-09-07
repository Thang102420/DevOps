import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight, Tag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BannerProps {
  onExploreProducts: () => void;
}

export const Banner: React.FC<BannerProps> = ({ onExploreProducts }) => {
  const { applyCoupon } = useCart();

  return (
    <div className="relative overflow-hidden pt-4 pb-8">
      {/* Hero Big Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-2xl border border-slate-800">
          
          {/* Decorative glowing gradient orbs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Siêu Ưu Đãi Công Nghệ 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Khám Phá Công Nghệ Đỉnh Cao Tại{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  VietThang Store
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Hệ thống chuyên phân phối chính hãng các sản phẩm iPhone, Samsung, MacBook, thiết bị âm thanh cao cấp & Smart Home. Bảo hành chính hãng 24 tháng, hỗ trợ trả góp 0%.
              </p>

              {/* Coupon voucher pill */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-xl text-xs sm:text-sm">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span>Voucher giảm 10%:</span>
                  <button
                    onClick={() => applyCoupon('VIETTHANG10')}
                    className="font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md hover:bg-amber-300 transition-colors uppercase tracking-wider"
                    title="Bấm để sao chép & áp dụng"
                  >
                    VIETTHANG10
                  </button>
                </div>
                <span className="text-xs text-slate-400">Bấm mã để nhận voucher ngay</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onExploreProducts}
                  className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/40 hover:shadow-blue-600/60 transition-all flex items-center gap-2 group"
                >
                  <span>Xem ngay sản phẩm</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400 pl-2">
                  <div className="flex -space-x-2">
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="avatar" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="avatar" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop" alt="avatar" />
                  </div>
                  <span>+50.000 khách hàng tin tưởng</span>
                </div>
              </div>
            </div>

            {/* Right Hero Product Card Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl p-4 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
                    alt="VietThang Tech Devices"
                    className="w-full h-full object-cover transform hover:scale-105 transition-duration-500 transition-transform"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wide shadow-md">
                    HOT DEAL
                  </div>
                </div>

                <div className="mt-4 p-2 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-base text-white">iPhone 16 Pro Max</h4>
                      <p className="text-xs text-slate-300">Titan Tự Nhiên - A18 Pro 3nm</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-amber-400">33.490.000₫</span>
                      <p className="text-[10px] text-slate-400 line-through">34.990.000₫</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Guarantees Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">100% Chính Hãng</h4>
              <p className="text-[11px] text-slate-500">Bảo hành 24 tháng</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Đổi Trả 30 Ngày</h4>
              <p className="text-[11px] text-slate-500">1 đổi 1 nếu lỗi kỹ thuật</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Giao Nhanh 2 Giờ</h4>
              <p className="text-[11px] text-slate-500">Nội thành Hà Nội & HCM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Tư Vấn 24/7</h4>
              <p className="text-[11px] text-slate-500">Hotline: 1900 8888</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
