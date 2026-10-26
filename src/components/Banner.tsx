import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  Flame, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BannerProps {
  onExploreProducts: () => void;
}

const HERO_SLIDES = [
  {
    badge: 'New Collection 2026 • Xu Hướng Mới',
    titlePrefix: 'Định Hình Phong Cách Cùng',
    titleHighlight: 'VietThang Fashion',
    description: 'Từng đường kim mũi chỉ được chăm chút tỉ mỉ từ sợi bông Pima Supima, lụa Mango cao cấp và denim 12.5 Oz tuyển chọn. Tôn dáng, thanh lịch và êm ái cả ngày.',
    voucher: 'VIETTHANG10',
    voucherDesc: 'Giảm 10% đơn hàng',
    ctaText: 'Khám phá 36 mẫu thiết kế',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    featuredProduct: 'Áo Blazer Hàn Quốc 2 Khuy',
    price: '549.000₫',
    originalPrice: '720.000₫',
    tag: 'BEST SELLER',
  },
  {
    badge: 'Flash Sale Cuối Tuần • Giảm Đến 50%',
    titlePrefix: 'Săn Deal Thời Trang Đỉnh Cao',
    titleHighlight: 'Ưu Đãi Đặc Biệt',
    description: 'Hàng loạt mẫu Polo Pima, đầm dạ hội, chân váy tennis và áo măng tô dạ dáng dài đang áp dụng voucher giảm 50.000đ và miễn phí vận chuyển tận nhà.',
    voucher: 'FASHION50',
    voucherDesc: 'Giảm 50k cho đơn từ 600k',
    ctaText: 'Xem sản phẩm Flash Sale',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    featuredProduct: 'Set Dạ Tweed Quý Cô Pháp',
    price: '799.000₫',
    originalPrice: '1.100.000₫',
    tag: 'HOT PROMO',
  },
  {
    badge: 'Phong Cách Sống Tối Giản • Clean & Chic',
    titlePrefix: 'Tự Do Thể Hiện Bản Sắc',
    titleHighlight: 'Minimalist & Casual',
    description: 'Bộ sưu tập trang phục thiết yếu cho tủ đồ hiện đại. Dễ phối, bền bỉ cùng thời gian với chất vải tự nhiên thân thiện làn da và môi trường.',
    voucher: 'FREESHIP',
    voucherDesc: 'Miễn phí giao hàng từ 500k',
    ctaText: 'Xem phong cách tối giản',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    featuredProduct: 'Măng Tô Dạ Lông Cừu Cao Cấp',
    price: '1.190.000₫',
    originalPrice: '1.650.000₫',
    tag: 'NEW ARRIVAL',
  },
];

export const Banner: React.FC<BannerProps> = ({ onExploreProducts }) => {
  const { applyCoupon } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative overflow-hidden pt-3 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card Carousel - Luxury Warm Espresso & Cognac */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#241B14] via-[#382619] to-[#4F3624] text-[#FAF8F5] shadow-2xl border border-[#64452E]/60">
          
          {/* Subtle glowing ambient spots */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#A3704C]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#E0C09B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Carousel Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100"
            aria-label="Slide trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100"
            aria-label="Slide tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left Texts */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3704C]/30 border border-[#A3704C]/50 text-[#F5E2D0] text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 text-[#C4976E] fill-[#C4976E]" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white min-h-[70px] sm:min-h-[110px]">
                {slide.titlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#EBD5BC] to-[#C4976E]">
                  {slide.titleHighlight}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-[#DDD1BF] leading-relaxed max-w-xl min-h-[50px]">
                {slide.description}
              </p>

              {/* Voucher Tag Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-[#8C6242]/40 px-3 py-1.5 rounded-xl text-xs">
                  <Tag className="w-3.5 h-3.5 text-[#C4976E]" />
                  <span className="text-[#DDD1BF]">Mã voucher:</span>
                  <button
                    onClick={() => applyCoupon(slide.voucher)}
                    className="font-mono font-bold bg-[#C4976E] text-[#241B14] px-2 py-0.5 rounded text-xs hover:bg-[#D4A981] transition-colors uppercase tracking-wider"
                    title="Bấm để nhận ngay"
                  >
                    {slide.voucher}
                  </button>
                  <span className="text-[11px] text-[#C2B29F] hidden sm:inline">({slide.voucherDesc})</span>
                </div>

                <button
                  onClick={() => applyCoupon('FREESHIP')}
                  className="px-2.5 py-1.5 rounded-xl bg-[#587346]/40 border border-[#587346]/50 text-[#D4E8C8] text-xs font-bold hover:bg-[#587346]/60 transition-colors"
                >
                  FREESHIP
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={onExploreProducts}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#A3704C] to-[#8E5E36] hover:from-[#B58058] hover:to-[#7A4B29] text-[#FAF8F5] font-bold text-xs sm:text-sm shadow-lg shadow-[#7A4B29]/30 transition-all flex items-center gap-2 group active:scale-95"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Slide Indicators */}
                <div className="flex items-center gap-2 pl-2">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === idx ? 'w-6 bg-[#C4976E]' : 'w-2 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Fashion Model Lookbook Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/15 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#2D2117]">
                  <img
                    src={slide.image}
                    alt={slide.featuredProduct}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#A3704C] text-[#FAF8F5] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {slide.tag}
                  </div>
                </div>

                <div className="mt-3 p-1.5 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#FAF8F5]">{slide.featuredProduct}</h4>
                      <p className="text-[11px] text-[#DDD1BF]">Bộ sưu tập thời trang thiết kế VietThang</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-extrabold text-[#E0C09B]">{slide.price}</span>
                      <p className="text-[10px] text-[#A9937E] line-through">{slide.originalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Brand Commitments - Warm Beige Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FDFCF9] border border-[#EBE3D5] shadow-sm hover:border-[#C4976E]/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#A3704C] flex items-center justify-center shrink-0 border border-[#E8DFD1]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#2D2117]">100% Vải Tuyển Chọn</h4>
              <p className="text-[11px] text-[#71553E]">Cotton Pima & Lụa cao cấp</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FDFCF9] border border-[#EBE3D5] shadow-sm hover:border-[#C4976E]/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#FBF0EE] text-[#9A4638] flex items-center justify-center shrink-0 border border-[#EED4CE]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#2D2117]">Đổi Size 30 Ngày</h4>
              <p className="text-[11px] text-[#71553E]">Hỗ trợ đổi tận nhà miễn phí</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FDFCF9] border border-[#EBE3D5] shadow-sm hover:border-[#C4976E]/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EFF5EB] text-[#587346] flex items-center justify-center shrink-0 border border-[#D5E3CC]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#2D2117]">Freeship Toàn Quốc</h4>
              <p className="text-[11px] text-[#71553E]">Cho đơn hàng từ 500.000đ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FDFCF9] border border-[#EBE3D5] shadow-sm hover:border-[#C4976E]/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] text-[#C4976E] flex items-center justify-center shrink-0 border border-[#EEDCBA]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#2D2117]">Kiểm Tra Khi Nhận</h4>
              <p className="text-[11px] text-[#71553E]">Được xem thử trước khi trả</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
