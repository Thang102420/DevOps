import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'products' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-base">
                VT
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                VietThang<span className="text-blue-500">.Store</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Hệ thống bán lẻ thiết bị công nghệ cao cấp chính hãng hàng đầu Việt Nam. Tận tâm phục vụ, cam kết 100% chính hãng, bảo hành chuẩn quốc tế.
            </p>

            <div className="space-y-1.5 text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Showroom: Landmark 81, TP. HCM & Keangnam 72, Hà Nội</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Hotline: 1900 8888 (08:00 - 22:00)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Email: contact@vietthangstore.vn</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Menu Điều Hướng</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Tất cả sản phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Về VietThang Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Liên hệ hỗ trợ
                </button>
              </li>
              <li>
                <span className="text-slate-500">Tuyển dụng nhân tài</span>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Chính Sách Bán Hàng</h4>
            <ul className="space-y-2">
              <li>Chính sách bảo hành 24 tháng</li>
              <li>Chính sách 1 đổi 1 trong 30 ngày</li>
              <li>Chính sách giao hàng hỏa tốc 2h</li>
              <li>Chính sách bảo mật thông tin</li>
              <li>Hướng dẫn thanh toán & trả góp</li>
            </ul>
          </div>

          {/* Payment Badges & Certifications */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Phương Thức Thanh Toán</h4>
            <div className="grid grid-cols-3 gap-2">
              <span className="bg-slate-800 text-center py-1.5 rounded-lg font-bold text-[10px] text-white">VietQR</span>
              <span className="bg-slate-800 text-center py-1.5 rounded-lg font-bold text-[10px] text-white">COD</span>
              <span className="bg-slate-800 text-center py-1.5 rounded-lg font-bold text-[10px] text-white">VISA</span>
              <span className="bg-slate-800 text-center py-1.5 rounded-lg font-bold text-[10px] text-white">Master</span>
              <span className="bg-slate-800 text-center py-1.5 rounded-lg font-bold text-[10px] text-white">MoMo</span>
              <span className="bg-slate-800 text-center py-1.5 rounded-lg font-bold text-[10px] text-white">ZaloPay</span>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Đã thông báo Bộ Công Thương</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 VietThang Store. Bản quyền thuộc về Công ty TNHH Công Nghệ VietThang.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế & Vận hành với</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>chuẩn DevOps CI/CD hiện đại</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
