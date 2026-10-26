import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Tư vấn sản phẩm & Mua hàng',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Vui lòng nhập đầy đủ Tên, Số điện thoại và Nội dung tin nhắn', 'error');
      return;
    }

    setIsSent(true);
    showToast('Cảm ơn bạn! Yêu cầu tư vấn đã được gửi thành công.', 'success');

    // Reset form after short delay
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        topic: 'Tư vấn sản phẩm & Mua hàng',
        message: '',
      });
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#71553E] uppercase tracking-wider bg-[#F5EFE6] border border-[#E0D2C0] px-3 py-1 rounded-full">
            Kết Nối Với Chúng Tôi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D2117] tracking-tight">
            Liên Hệ & Hỗ Trợ Khách Hàng
          </h2>
          <p className="text-xs sm:text-sm text-[#71553E]">
            Đội ngũ tư vấn viên chuyên nghiệp của VietThang Fashion luôn sẵn sàng phản hồi trong vòng 5 phút
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#241B14] via-[#382619] to-[#4F3624] text-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#64452E]/60 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#FAF8F5] mb-2">VietThang Fashion Head Office</h3>
              <p className="text-xs text-[#DDD1BF] leading-relaxed">
                Hệ thống showroom trải rộng trên các thành phố lớn sẵn sàng đón tiếp quý khách trải nghiệm trực tiếp trang phục và thử size tận nơi.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#C4976E]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#DDD1BF]">Hotline tư vấn mua hàng:</p>
                  <p className="font-bold text-sm text-[#FAF8F5]">1900 8888 (Phím 1)</p>
                  <p className="text-[#DDD1BF] mt-1">Hỗ trợ đổi trả size tận nhà:</p>
                  <p className="font-bold text-sm text-[#FAF8F5]">0988 123 456 (24/7)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#E0C09B]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#DDD1BF]">Email chăm sóc khách hàng:</p>
                  <p className="font-bold text-[#FAF8F5]">hotro@vietthangstore.vn</p>
                  <p className="text-[#DDD1BF]">Email hợp tác kinh doanh & phân phối:</p>
                  <p className="font-bold text-[#FAF8F5]">b2b@vietthangstore.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#C4976E]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#DDD1BF]">Showroom Hà Nội:</p>
                  <p className="font-medium text-[#FAF8F5]">Vincom Center Bà Triệu & Vincom Center Cầu Giấy, Hà Nội</p>
                  <p className="text-[#DDD1BF] mt-1">Showroom TP. Hồ Chí Minh:</p>
                  <p className="font-medium text-[#FAF8F5]">Saigon Centre Q.1 & Landmark 81, TP. HCM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#E0C09B]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#DDD1BF]">Giờ hoạt động:</p>
                  <p className="font-bold text-[#FAF8F5]">08:00 - 22:00 (Tất cả các ngày, kể cả Lễ & Tết)</p>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-[11px] text-[#C2B29F]">
                Được vận hành và bảo chứng kỹ thuật bởi đội ngũ chuyên viên VietThang Fashion
              </p>
            </div>
          </div>

          {/* Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-[#FDFCF9] rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#2D2117] font-bold text-lg">
              <MessageSquare className="w-5 h-5 text-[#A3704C]" />
              <h3>Gửi Thắc Mắc & Yêu Cầu Tư Vấn Nhanh</h3>
            </div>

            {isSent ? (
              <div className="p-8 rounded-2xl bg-[#EFF5EB] border border-[#D5E3CC] text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#587346] mx-auto" />
                <h4 className="font-bold text-base text-[#2D2117]">
                  Gửi yêu cầu thành công!
                </h4>
                <p className="text-xs text-[#587346] max-w-sm mx-auto">
                  Cảm ơn bạn đã liên hệ với VietThang Fashion. Chuyên viên tư vấn sẽ liên hệ lại với bạn trong vòng 10 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#523C2A] mb-1">
                      Họ và tên <span className="text-[#9A4638]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] text-xs focus:outline-none focus:ring-2 focus:ring-[#A3704C]/30 focus:border-[#A3704C] bg-white text-[#2D2117]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#523C2A] mb-1">
                      Số điện thoại <span className="text-[#9A4638]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912 345 678"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] text-xs focus:outline-none focus:ring-2 focus:ring-[#A3704C]/30 focus:border-[#A3704C] bg-white text-[#2D2117]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#523C2A] mb-1">
                      Địa chỉ Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] text-xs focus:outline-none focus:ring-2 focus:ring-[#A3704C]/30 focus:border-[#A3704C] bg-white text-[#2D2117]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#523C2A] mb-1">
                      Nhu cầu cần hỗ trợ
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] text-xs focus:outline-none focus:ring-2 focus:ring-[#A3704C]/30 focus:border-[#A3704C] bg-white text-[#2D2117]"
                    >
                      <option>Tư vấn chọn size & Mua hàng</option>
                      <option>Hỗ trợ đổi trả size tận nhà</option>
                      <option>Yêu cầu thiết kế đồng phục doanh nghiệp</option>
                      <option>Góp ý chất lượng sản phẩm</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#523C2A] mb-1">
                    Nội dung chi tiết <span className="text-[#9A4638]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mô tả mẫu trang phục bạn đang quan tâm hoặc câu hỏi thắc mắc cần giải đáp..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] text-xs focus:outline-none focus:ring-2 focus:ring-[#A3704C]/30 focus:border-[#A3704C] bg-white text-[#2D2117] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#A3704C] hover:bg-[#8E5E36] text-white font-bold text-xs shadow-md shadow-[#A3704C]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Yêu Cầu Ngay</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
