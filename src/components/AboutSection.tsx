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
    <section id="about-section" className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thương Hiệu Bán Lẻ Công Nghệ Hàng Đầu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Câu Chuyện Thương Hiệu VietThang Store
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Được thành lập với khát vọng mang những sản phẩm công nghệ tinh hoa nhất trên thế giới đến tay người dùng Việt Nam với mức giá hợp lý nhất cùng trải nghiệm dịch vụ chuẩn 5 sao.
          </p>
        </div>

        {/* Hero Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Sứ Mệnh Tiên Phong Trong Kỷ Nguyên Số
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tại <strong>VietThang Store</strong>, chúng tôi hiểu rằng mỗi thiết bị công nghệ không chỉ đơn thuần là một cỗ máy mà còn là công cụ đắc lực hỗ trợ công việc, sáng tạo và nâng tầm chất lượng cuộc sống của bạn.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Từ điện thoại thông minh, laptop hiệu năng cao cho đến hệ thống âm thanh Hi-Res và thiết bị smarthome, mọi sản phẩm tại VietThang Store đều trải qua quy trình kiểm tra chất lượng 12 bước nghiêm ngặt trước khi đến tay khách hàng.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-2xl font-black text-blue-600">50.000+</p>
                <p className="text-xs text-slate-500 font-medium">Khách hàng tin chọn</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-2xl font-black text-emerald-600">99.8%</p>
                <p className="text-xs text-slate-500 font-medium">Đánh giá hài lòng</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-2xl font-black text-indigo-600">15+</p>
                <p className="text-xs text-slate-500 font-medium">Showroom toàn quốc</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-2xl font-black text-amber-500">100%</p>
                <p className="text-xs text-slate-500 font-medium">Cam kết chính hãng</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                alt="VietThang Store Team & Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <p className="font-bold text-base">Đội ngũ kỹ thuật viên tận tâm</p>
                  <p className="text-xs text-slate-300">Được chứng nhận chuyên môn bởi Apple & Samsung</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars of VietThang Store */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              4 Cam Kết Vàng Tạo Nên Uy Tín
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Quyền lợi cao nhất của khách hàng luôn là ưu tiên số 1
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">100% Hàng Chính Hãng</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đầy đủ hóa đơn VAT, chứng từ nhập khẩu CO/CQ từ Apple, Samsung, ASUS, Sony. Hoàn tiền 200% nếu phát hiện hàng giả, hàng dựng.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Đổi Mới Trong 30 Ngày</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chính sách 1 đổi 1 ngay lập tức trong 30 ngày đầu tiên nếu máy có bất kỳ lỗi phần cứng nào từ nhà sản xuất, không giam máy.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Bảo Hành Lên Đến 24 Tháng</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gói bảo hành vàng toàn diện cả nguồn và màn hình. Hỗ trợ máy dùng tạm trong suốt thời gian bảo dưỡng, sửa chữa.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Hỗ Trợ Kỹ Thuật Trọn Đời</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cài đặt phần mềm, vệ sinh máy và kiểm tra sức khỏe thiết bị hoàn toàn miễn phí trọn đời sản phẩm tại tất cả showroom.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
