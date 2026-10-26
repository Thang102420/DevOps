import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Wrench, 
  Sparkles, 
  HeartHandshake 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE6] text-[#71553E] border border-[#E0D2C0] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#A3704C]" />
            <span>Thương Hiệu Thời Trang Việt Tiên Phong</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D2117] tracking-tight">
            Câu Chuyện Thương Hiệu VietThang Fashion
          </h2>
          <p className="text-sm sm:text-base text-[#71553E] leading-relaxed">
            Khởi nguồn từ tình yêu với chất liệu sợi tự nhiên và mong muốn mang lại những trang phục vừa vặn, thanh lịch với mức giá hợp lý nhất cho mọi vóc dáng người Việt.
          </p>
        </div>

        {/* Hero Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FDFCF9] rounded-3xl p-6 sm:p-10 border border-[#EBE3D5] shadow-sm">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl font-bold text-[#2D2117]">
              Kiến Tạo Phong Cách • Tự Tin Trong Từng Bước Chân
            </h3>
            <p className="text-sm text-[#71553E] leading-relaxed">
              Tại <strong>VietThang Fashion</strong>, chúng tôi tin rằng trang phục bạn khoác lên người không chỉ để mặc đẹp mà còn là ngôn ngữ thể hiện cá tính, sự chỉn chu và phong thái tự tin trước mọi ánh nhìn.
            </p>
            <p className="text-sm text-[#71553E] leading-relaxed">
              Từ những chiếc áo thun Cotton Compact 250GSM basic mặc hàng ngày, áo sơ mi chống nhăn công sở, cho đến những chiếc đầm dạ hội lụa quyến rũ — mọi sản phẩm đều được kiểm định độ co giãn, độ bền màu và đường kim mũi chỉ theo tiêu chuẩn may đo xuất khẩu.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5]">
                <p className="text-2xl font-black text-[#A3704C]">45.000+</p>
                <p className="text-xs text-[#71553E] font-medium">Khách hàng tin yêu</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5]">
                <p className="text-2xl font-black text-[#587346]">99.6%</p>
                <p className="text-xs text-[#71553E] font-medium">Hài lòng về chất vải</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5]">
                <p className="text-2xl font-black text-[#71553E]">100%</p>
                <p className="text-xs text-[#71553E] font-medium">Sợi vải an toàn tự nhiên</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5]">
                <p className="text-2xl font-black text-[#C4976E]">30 Ngày</p>
                <p className="text-xs text-[#71553E] font-medium">Đổi size miễn phí</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-[#EBE3D5]">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop"
                alt="VietThang Fashion Design Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241C16]/80 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <p className="font-bold text-base text-[#FAF8F5]">Xưởng thiết kế & may đo hiện đại</p>
                  <p className="text-xs text-[#DDD1BF]">Đội ngũ thợ may hơn 15 năm kinh nghiệm làng nghề may mặc</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2D2117]">
              4 Cam Kết Chất Lượng Hàng Đầu
            </h3>
            <p className="text-xs sm:text-sm text-[#71553E] mt-1">
              Trải nghiệm mua sắm an tâm tuyệt đối tại VietThang Fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#FDFCF9] p-6 rounded-3xl border border-[#EBE3D5] shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#A3704C] flex items-center justify-center border border-[#E8DFD1]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#2D2117]">100% Vải Tuyển Chọn</h4>
              <p className="text-xs text-[#71553E] leading-relaxed">
                Nói không với vải nilon bí nóng hay bai nhão. Cam kết chất vải mềm mịn, thấm hút mồ hôi và an toàn tuyệt đối cho làn da.
              </p>
            </div>

            <div className="bg-[#FDFCF9] p-6 rounded-3xl border border-[#EBE3D5] shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF0EE] text-[#9A4638] flex items-center justify-center border border-[#EED4CE]">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#2D2117]">Đổi Size Trong 30 Ngày</h4>
              <p className="text-xs text-[#71553E] leading-relaxed">
                Mặc thử tại nhà nếu rộng hay chật size, shipper sẽ mang size mới đến tận nhà đổi cho bạn mà không mất thêm phí phát sinh.
              </p>
            </div>

            <div className="bg-[#FDFCF9] p-6 rounded-3xl border border-[#EBE3D5] shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8EB] text-[#C4976E] flex items-center justify-center border border-[#EEDCBA]">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#2D2117]">Bảo Hành Đường May 1 Năm</h4>
              <p className="text-xs text-[#71553E] leading-relaxed">
                Bảo hành đường may, cúc áo và khóa kéo miễn phí trong suốt 12 tháng tại hệ thống cửa hàng VietThang Fashion.
              </p>
            </div>

            <div className="bg-[#FDFCF9] p-6 rounded-3xl border border-[#EBE3D5] shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EFF5EB] text-[#587346] flex items-center justify-center border border-[#D5E3CC]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#2D2117]">Kiểm Tra Trước Khi Nhận</h4>
              <p className="text-xs text-[#71553E] leading-relaxed">
                Khách hàng luôn được quyền mở gói hàng kiểm tra chất vải, đường may trước khi thanh toán cho nhân viên giao hàng.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
