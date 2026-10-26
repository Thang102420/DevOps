import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'products' | 'about' | 'contact' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#241C16] text-[#B8A796] text-xs border-t border-[#3D2C20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#241C16] via-[#71553E] to-[#A3704C] text-[#FAF8F5] font-black flex items-center justify-center text-base border border-[#64452E]/50">
                VT
              </div>
              <span className="font-extrabold text-xl text-[#FAF8F5] tracking-tight">
                VietThang<span className="text-[#C4976E]">.Fashion</span>
              </span>
            </div>

            <p className="text-xs text-[#C2B29F] leading-relaxed max-w-sm">
              Thương hiệu thời trang thiết kế nam nữ & phong cách giới trẻ hàng đầu Việt Nam. Tinh tế trong từng đường may mũi chỉ, chất vải sợi tự nhiên thoáng mát, đổi size miễn phí tận nhà.
            </p>

            <div className="space-y-1.5 text-[#C2B29F]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A3704C] shrink-0" />
                <span>Hà Nội: Vincom Center Bà Triệu & Cầu Giấy</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C4976E] shrink-0" />
                <span>TP. HCM: Saigon Centre Q.1 & Landmark 81</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#587346] shrink-0" />
                <span>Hotline: 1900 8888 (Tư vấn chọn size 08:00 - 22:00)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E0C09B] shrink-0" />
                <span>Email: fashion@vietthangstore.vn</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#FAF8F5] uppercase tracking-wider text-xs">Menu Mua Sắm</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Tất cả bộ sưu tập
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Về VietThang Fashion
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Hỗ trợ đổi trả size
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#C4976E] hover:text-[#E0C09B] transition-colors font-semibold flex items-center gap-1.5"
                >
                  <span>Trang quản trị (Admin CRUD)</span>
                </button>
              </li>
              <li>
                <span className="text-[#8E7968]">Chính sách nhượng quyền</span>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#FAF8F5] uppercase tracking-wider text-xs">Chính Sách Khách Hàng</h4>
            <ul className="space-y-2">
              <li>Chính sách đổi size 30 ngày</li>
              <li>Bảo hành đường may 12 tháng</li>
              <li>Bảng hướng dẫn chọn size chuẩn</li>
              <li>Miễn phí vận chuyển từ 500k</li>
              <li>Chính sách bảo mật thông tin</li>
            </ul>
          </div>

          {/* Payment Badges & Certifications */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#FAF8F5] uppercase tracking-wider text-xs">Hình Thức Thanh Toán</h4>
            <div className="grid grid-cols-3 gap-2">
              <span className="bg-[#332419] border border-[#4A3525] text-center py-1.5 rounded-lg font-bold text-[10px] text-[#FAF8F5]">VietQR</span>
              <span className="bg-[#332419] border border-[#4A3525] text-center py-1.5 rounded-lg font-bold text-[10px] text-[#FAF8F5]">COD</span>
              <span className="bg-[#332419] border border-[#4A3525] text-center py-1.5 rounded-lg font-bold text-[10px] text-[#FAF8F5]">VISA</span>
              <span className="bg-[#332419] border border-[#4A3525] text-center py-1.5 rounded-lg font-bold text-[10px] text-[#FAF8F5]">Master</span>
              <span className="bg-[#332419] border border-[#4A3525] text-center py-1.5 rounded-lg font-bold text-[10px] text-[#FAF8F5]">MoMo</span>
              <span className="bg-[#332419] border border-[#4A3525] text-center py-1.5 rounded-lg font-bold text-[10px] text-[#FAF8F5]">ZaloPay</span>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#332419] border border-[#4A3525] text-[#D4E8C8] text-[10px] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#587346]" />
                <span>Đã thông báo Bộ Công Thương</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#3D2C20] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E7968]">
          <p>© 2026 VietThang Fashion. Bản quyền thuộc về Công ty TNHH Thời Trang & May Mặc VietThang.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế thời trang & Vận hành với</span>
            <Heart className="w-3 h-3 text-[#9A4638] fill-[#9A4638]" />
            <span>DevOps CI/CD hiện đại</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
