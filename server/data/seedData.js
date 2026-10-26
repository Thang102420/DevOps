export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm', icon: 'Sparkles' },
  { id: 'men', name: 'Thời trang Nam', icon: 'Shirt' },
  { id: 'women', name: 'Thời trang Nữ', icon: 'Sparkles' },
  { id: 'pants', name: 'Quần & Chân Váy', icon: 'Scissors' },
  { id: 'sport', name: 'Đồ Thể Thao', icon: 'Activity' },
  { id: 'outerwear', name: 'Áo Khoác & Giữ Nhiệt', icon: 'Layers' },
  { id: 'accessories', name: 'Phụ kiện & Giày', icon: 'SlidersHorizontal' },
];

export const PRODUCTS = [
  // ==========================================
  // 1. THỜI TRANG NAM (6 MẪU)
  // ==========================================
  {
    id: 'men-1',
    name: 'Áo Polo Nam Vải Pima Cotton Cao Cấp Kháng Khuẩn Dáng Slim',
    category: 'men',
    categoryName: 'Thời trang Nam',
    price: 389000,
    originalPrice: 499000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 238,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 54,
    isFeatured: true,
    isNewArrival: true,
    material: '95% Pima Cotton Supima + 5% Spandex co giãn',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Xanh Navy', 'Trắng Sữa', 'Đen Tuyển', 'Xanh Rêu'],
    description: 'Áo thun Polo dệt từ sợi bông Pima quý hiếm với chiều dài sợi vượt trội, mang đến cảm giác mát rượi, mềm mại mịn màng và giữ độ đứng phom cổ suốt ngày.',
    highlights: [
      'Sợi bông Pima cao cấp cho bề mặt bóng mượt và độ bền gấp 2 lần',
      'Cổ áo dệt Jacquard nguyên khối chống quăn gãy mép',
      'Công nghệ dệt nano khử mùi mồ hôi tối ưu',
      'Bo tay áo ôm nhẹ tôn bắp tay nam tính'
    ],
    specs: {
      'Chất liệu': '95% Pima Cotton + 5% Spandex',
      'Form dáng': 'Slim-fit ôm tôn dáng hiện đại',
      'Độ co giãn': 'Co giãn 4 chiều mềm mát',
      'Xuất xứ': 'Sản xuất tại Việt Nam',
      'Bảo quản': 'Giặt máy chế độ nhẹ, không ngâm thuốc tẩy'
    }
  },
  {
    id: 'men-2',
    name: 'Áo Sơ Mi Nam Dài Tay Oxford Chống Nhăn Kháng Khuẩn',
    category: 'men',
    categoryName: 'Thời trang Nam',
    price: 429000,
    originalPrice: 550000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    isNewArrival: false,
    material: '70% Cotton Oxford + 30% Nano Poly chống nhăn',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Trắng Oxford', 'Xanh Nhạt Pastel', 'Kẻ Sọc Xanh'],
    description: 'Áo sơ mi Oxford phom dáng hiện đại dành cho quý ông công sở. Chất vải dệt đan rọ thoáng khí, dễ ủi và hạn chế nếp gấp suốt ngày làm việc.',
    highlights: [
      'Vải dệt Oxford cao cấp tạo vân vải sang trọng',
      'Công nghệ hoàn tất Easy-Care ít nhăn, dễ ủi',
      'Khuy áo xà cừ khắc laser sắc nét bền bỉ',
      'Cổ áo đệm lót giữ đứng phom chuẩn thanh lịch'
    ],
    specs: {
      'Chất liệu': 'Cotton Oxford dệt hạt tổ ong thoáng mát',
      'Form dáng': 'Slim fit ôm vừa vặn thanh lịch',
      'Đặc tính': 'Kháng khuẩn khử mùi, chống tĩnh điện',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Ủi ở nhiệt độ trung bình dưới 150°C'
    }
  },
  {
    id: 'men-3',
    name: 'Áo Thun Nam Oversize Cổ Tròn Graphic Typography Minimalist',
    category: 'men',
    categoryName: 'Thời trang Nam',
    price: 249000,
    originalPrice: 320000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 88,
    isFeatured: false,
    isNewArrival: true,
    material: '100% Cotton Compact 260GSM dày dặn đứng form',
    sizes: ['M', 'L', 'XL'],
    colors: ['Đen Phantom', 'Trắng Tinh Khôi', 'Xám Tiêu'],
    description: 'Áo phông dáng rộng phóng khoáng chuẩn phong cách Streetwear Nhật Bản. Vải cotton compact dệt sợi chải kỹ không xù lông và thấm hút mồ hôi siêu tốt.',
    highlights: [
      'Định lượng 260GSM dày dặn không lộ cơ thể',
      'Họa tiết in lụa cao cấp chống nứt gãy',
      'Cổ áo bo gân 2.5cm chống bai dão trọn đời'
    ],
    specs: {
      'Chất liệu': '100% Cotton Compact 260GSM',
      'Form dáng': 'Oversize rộng rãi thoải mái',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'men-4',
    name: 'Áo Blazer Nam Công Sở 1 Lớp Thoáng Mát Phom Casual Hàn Quốc',
    category: 'men',
    categoryName: 'Thời trang Nam',
    price: 689000,
    originalPrice: 890000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    isNewArrival: false,
    material: 'Vải Kaki Tuyết Mưa pha Spandex co giãn',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Xanh Đen Sang Trọng', 'Xám Tro', 'Nâu Be'],
    description: 'Blazer thiết kế 1 lớp nhẹ tênh thích hợp khí hậu Việt Nam, dễ phối cùng quần âu, jeans hay áo phông basic.',
    highlights: [
      'Thiết kế không đệm vai cứng nhắc, tạo nét trẻ trung thanh lịch',
      'Đường may viền bọc cuốn cao cấp chuẩn xưởng may đo',
      'Chống nhăn nhàu khi ngồi xe hoặc làm việc máy tính'
    ],
    specs: {
      'Chất liệu': 'Vải tuyết mưa Hàn Quốc cao cấp',
      'Kiểu ve áo': 'Notch lapel cổ điển thanh lịch',
      'Xuất xứ': 'VietThang Studio'
    }
  },
  {
    id: 'men-5',
    name: 'Áo Sơ Mi Nam Đũi Linen Cổ Tàu Dáng Suông Mát Mùa Hè',
    category: 'men',
    categoryName: 'Thời trang Nam',
    price: 359000,
    originalPrice: 460000,
    discount: 22,
    rating: 4.7,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    isNewArrival: false,
    material: '80% Linen tự nhiên + 20% Cotton mềm',
    sizes: ['M', 'L', 'XL'],
    colors: ['Trắng Linen', 'Xanh Biển Pastel', 'Be Cát'],
    description: 'Chiếc sơ mi cổ trụ mang hơi thở biển cả và phong cách tối giản Nhật Bản, cực kỳ thoáng mát và thấm hút mồ hôi.',
    highlights: [
      'Vải đũi linen tự nhiên dệt thưa thoáng khí',
      'Cổ trụ tinh tế phong cách mộc mạc thư thái',
      'Form rộng thoải mái không ôm sát'
    ],
    specs: {
      'Chất liệu': 'Linen tự nhiên dệt tay',
      'Form dáng': 'Relaxed Fit',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'men-6',
    name: 'Áo Len Dệt Kim Nam Cổ Tròn Dệt Vân Vặn Thừng Thu Đông',
    category: 'men',
    categoryName: 'Thời trang Nam',
    price: 449000,
    originalPrice: 580000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 35,
    isFeatured: false,
    isNewArrival: true,
    material: 'Len Acrylic pha lông cừu mềm không ngứa',
    sizes: ['M', 'L', 'XL'],
    colors: ['Kem Sữa', 'Nâu Đất', 'Xanh Than'],
    description: 'Áo len dệt kim cổ tròn ấm áp với họa tiết vặn thừng cổ điển, giữ ấm tốt và tôn nét nam tính lịch lãm.',
    highlights: [
      'Sợi len mềm mại không gây dặm ngứa da',
      'Giữ ấm hiệu quả trong tiết trời từ 12-22 độ C',
      'Cổ và gấu áo dệt rib đàn hồi giữ phom bền bỉ'
    ],
    specs: {
      'Chất liệu': 'Len nhân tạo pha lông cừu mềm',
      'Độ dày': 'Dày dặn giữ nhiệt',
      'Xuất xứ': 'Việt Nam'
    }
  },

  // ==========================================
  // 2. THỜI TRANG NỮ (6 MẪU)
  // ==========================================
  {
    id: 'women-1',
    name: 'Đầm Dự Tiệc Cổ Chữ V Dáng Xòe Lụa Mango Cao Cấp',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 499000,
    originalPrice: 680000,
    discount: 26,
    rating: 4.9,
    reviewsCount: 260,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    isNewArrival: false,
    material: 'Lụa Mango mềm mại rủ sóng tự nhiên',
    sizes: ['S', 'M', 'L'],
    colors: ['Đỏ Ruby', 'Đen Quyến Rũ', 'Trắng Kem'],
    description: 'Mẫu đầm liền thân thiết kế tôn dáng với đường chiết eo tinh tế, tùng váy xòe bồng bềnh nữ tính cùng chất liệu lụa Mango óng ả.',
    highlights: [
      'Chất liệu lụa Mango rủ nhẹ bay bổng, không nhăn xù',
      'Thiết kế cổ chữ V khoe khéo xương quai xanh quyến rũ',
      'Đường chiết eo tạo hiệu ứng thon gọn vòng 2',
      'Phù hợp diện đi tiệc, đám cưới, hẹn hò lãng mạn'
    ],
    specs: {
      'Chất liệu': 'Lụa Mango loại 1 mềm mịn mát tay',
      'Chiều dài': 'Dáng midi ngang bắp chân',
      'Lót trong': 'Có lớp lót lụa habutai kín đáo',
      'Xuất xứ': 'Thiết kế độc quyền VietThang'
    }
  },
  {
    id: 'women-2',
    name: 'Áo Blazer Nữ Tay Dài Phom Rộng 2 Hàng Khuy Chuẩn Hàn',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 549000,
    originalPrice: 720000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 24,
    isFeatured: true,
    isNewArrival: true,
    material: 'Tuyết mưa Hàn Quốc đanh sợi chống nhăn',
    sizes: ['S', 'M', 'L'],
    colors: ['Be Nude', 'Đen Tuyền', 'Xám Khói'],
    description: 'Áo khoác blazer nữ dáng suông phóng khoáng mang lại vẻ đẹp thanh lịch hiện đại cho quý cô văn phòng.',
    highlights: [
      'Vải tuyết mưa loại 1 đứng form áo sang xịn',
      'Độn vai mỏng nhẹ tạo dáng vai thẳng quyền lực',
      '2 hàng khuy giả sừng phong cách châu Âu',
      'Túi mổ 2 bên tiện lợi đính nắp gập thời trang'
    ],
    specs: {
      'Chất liệu': 'Vải tuyết mưa cao cấp 2 lớp',
      'Kiểu dáng': 'Oversized dáng suông hiện đại',
      'Cầu vai': 'Đệm mút sinh học êm nhẹ',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'women-3',
    name: 'Áo Croptop Nữ Tay Ngắn Dệt Kim Gân Cổ Tròn Năng Động',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 189000,
    originalPrice: 260000,
    discount: 27,
    rating: 4.7,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 60,
    isFeatured: false,
    isNewArrival: false,
    material: 'Len dệt kim Cotton mềm mát co giãn tốt',
    sizes: ['Freesize (40-58kg)', 'S', 'M'],
    colors: ['Trắng', 'Hồng Pastel', 'Đen', 'Xanh Bơ'],
    description: 'Áo croptop dệt kim trẻ trung khoe eo thon, chất vải mềm mịn co giãn ôm nhẹ tôn đường cong cơ thể.',
    highlights: [
      'Dệt kim sọc tăm co giãn đàn hồi cực tốt',
      'Độ dài vừa phải ngang rốn dễ phối đồ',
      'Thấm hút mồ hôi, thoáng khí không bí'
    ],
    specs: {
      'Chất liệu': 'Cotton Viscose dệt kim gân',
      'Độ co giãn': 'Co giãn 4 chiều đa hướng',
      'Chiều dài': '40 cm',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'women-4',
    name: 'Set Áo Dạ Tweed Tiểu Thư Sang Chảnh Kèm Chân Váy A',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 799000,
    originalPrice: 1100000,
    discount: 27,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 20,
    isFeatured: true,
    isNewArrival: true,
    material: 'Dạ Tweed cao cấp dệt sợi kim tuyến lấp lánh',
    sizes: ['S', 'M', 'L'],
    colors: ['Trắng Ánh Kim', 'Hồng Pastel', 'Đen Đính Đá'],
    description: 'Bộ set dạ Tweed phong cách quý cô Pháp thượng lưu, phối viền đính cườm thủ công sang trọng, cực hợp mặc tiệc hoặc đi làm mùa thu đông.',
    highlights: [
      'Sợi dạ Tweed dệt dày dặn lót lụa satin mượt mà',
      'Khuy cài mạ vàng đính đá lấp lánh',
      'Chân váy dáng chữ A che khuyết điểm hông hoàn hảo'
    ],
    specs: {
      'Chất liệu': 'Vải dạ Tweed dệt sợi metallic',
      'Bộ sản phẩm': '1 áo khoác lửng + 1 chân váy chữ A',
      'Xuất xứ': 'VietThang Luxury Line'
    }
  },
  {
    id: 'women-5',
    name: 'Áo Sơ Mi Nữ Lụa Tơ Tằm Cổ Thắt Nơ Dáng Công Sở',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 369000,
    originalPrice: 480000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 40,
    isFeatured: false,
    isNewArrival: false,
    material: 'Lụa Satin tơ tằm mềm rủ óng ả',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Trắng Ngọc Trai', 'Xanh Mint', 'Vàng Champagne'],
    description: 'Chiếc áo sơ mi lụa mềm mại với nơ cổ nữ tính, mang lại phong thái trang nhã, sang trọng cho các nàng chốn văn phòng.',
    highlights: [
      'Bề mặt lụa bóng nhẹ chống nhăn',
      'Dải nơ cổ có thể biến tấu nhiều kiểu thắt duyên dáng',
      'Măng sét tay áo tinh tế'
    ],
    specs: {
      'Chất liệu': 'Lụa Satin dệt mềm mại',
      'Form dáng': 'Regular nhẹ nhàng',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'women-6',
    name: 'Đầm Maxi Đi Biển Hoa Nhí Vintage Cổ Vuông Tay Bồng Xinh Xắn',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 429000,
    originalPrice: 560000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 38,
    isFeatured: false,
    isNewArrival: true,
    material: 'Voan tơ mềm mát họa tiết hoa nhí độc quyền',
    sizes: ['S', 'M', 'L'],
    colors: ['Hoa Vàng Nắng', 'Hoa Xanh Pastel', 'Hoa Đỏ Vintage'],
    description: 'Thiết kế maxi hoa nhí bồng bềnh, cổ vuông khoe xương quai xanh gợi cảm, thích hợp cho chuyến du lịch, nghỉ dưỡng và dạo phố cuối tuần.',
    highlights: [
      'Chất voan tơ 2 lớp bay bổng, có lót trong kín đáo',
      'Tay bồng nhẹ che khuyết điểm bắp tay',
      'Lưng bo chun co giãn ôm khít vòng eo'
    ],
    specs: {
      'Chất liệu': 'Voan tơ in hoa nhí sắc nét',
      'Chiều dài': 'Dáng dài maxi 115cm',
      'Xuất xứ': 'Việt Nam'
    }
  },

  // ==========================================
  // 3. QUẦN & CHÂN VÁY (6 MẪU)
  // ==========================================
  {
    id: 'pants-1',
    name: 'Quần Jeans Nam Dáng Suông Ống Đứng Denim Raw Vintage',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 459000,
    originalPrice: 590000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 50,
    isFeatured: true,
    isNewArrival: false,
    material: 'Denim Cotton 12.5 Oz không phai màu',
    sizes: ['29', '30', '31', '32', '34'],
    colors: ['Xanh Đậm Indigo', 'Xanh Nhạt Rách Nhẹ', 'Đen Khói'],
    description: 'Quần jeans nam ống đứng Regular Straight kinh điển với chất vải denim dệt thoi 12.5 Oz đứng dáng, màu nhuộm wash sinh học bền màu theo năm tháng.',
    highlights: [
      'Vải denim 100% cotton dày dặn giữ form ống đứng',
      'Kỹ thuật wash enzyme tạo độ sờn vintage tự nhiên',
      'Đinh tán đồng và khóa kéo kim loại bền bỉ',
      'Dễ dàng kết hợp cùng sneaker và áo thun'
    ],
    specs: {
      'Độ dày vải': '12.5 Oz Denim chuẩn quốc tế',
      'Form dáng': 'Straight Leg (Ống đứng suông 19-21cm)',
      'Khóa kéo': 'Khóa kéo kim loại chốt tự động',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'pants-2',
    name: 'Quần Tây Nam Co Giãn 4 Chiều Công Sở Dáng Trẻ Trung',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 399000,
    originalPrice: 520000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    isNewArrival: false,
    material: 'Vải Kaki Spandex co giãn đàn hồi',
    sizes: ['29', '30', '31', '32', '34'],
    colors: ['Đen', 'Xám Tro', 'Xanh Đen', 'Be'],
    description: 'Quần âu nam hiện đại với cạp chun ẩn bên trong tăng giảm co giãn thoải mái khi ngồi làm việc hay lái xe, ống suông nhẹ không nhăn không xù.',
    highlights: [
      'Lưng quần thông minh có dải thun ẩn co giãn đến 4cm',
      'Chất vải không nhăn gãy nếp dù giặt máy',
      'Túi xẻ sâu để vừa điện thoại màn hình lớn an toàn'
    ],
    specs: {
      'Chất liệu': 'Cotton Poly Spandex cao cấp',
      'Form dáng': 'Slim-Straight gọn gàng hiện đại',
      'Đặc tính': 'Chống nhăn, co giãn 4 chiều'
    }
  },
  {
    id: 'pants-3',
    name: 'Chân Váy Xếp Ly Dáng Chữ A Cạp Cao Kèm Quần Bảo Hộ',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 269000,
    originalPrice: 350000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 188,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 38,
    isFeatured: false,
    isNewArrival: true,
    material: 'Vải tuyết mưa ép ly nhiệt công nghệ cao',
    sizes: ['S', 'M', 'L'],
    colors: ['Đen', 'Xám Ghi', 'Trắng Kem'],
    description: 'Chân váy ngắn xếp ly tennis năng động dáng chữ A che khuyết điểm đùi to, cạp cao tôn dáng chân dài, bên trong may liền quần bảo hộ an toàn tuyệt đối.',
    highlights: [
      'Xếp ly dập nhiệt công nghệ cao không bị mất nếp sau giặt',
      'Tích hợp quần bảo hộ cùng màu co giãn kín đáo bên trong',
      'Cạp cao giấu bụng, kéo dài đôi chân thon thả'
    ],
    specs: {
      'Chất liệu': 'Vải tuyết mưa đanh lì',
      'Chiều dài': '39 - 41 cm',
      'Bên trong': 'Có quần lót bảo hộ thun cotton co giãn'
    }
  },
  {
    id: 'pants-4',
    name: 'Quần Ống Rộng Nữ Suông Cạp Cao Hack Dáng Vải Tencel',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 359000,
    originalPrice: 470000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 245,
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 40,
    isFeatured: true,
    isNewArrival: true,
    material: 'Sợi Tencel sinh học mát rượi chống nhăn',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Kem Sữa', 'Đen Tuyền', 'Nâu Mocha', 'Xanh Xám'],
    description: 'Item "must-have" của các cô nàng sành điệu. Cạp cao ôm eo, ống suông rủ tự nhiên tạo cảm giác chân dài miên man và bước đi uyển chuyển.',
    highlights: [
      'Chất vải Tencel mát rượi, thoáng khí gấp đôi cotton',
      'Khóa kim loại giọt lệ cao cấp mượt mà',
      'Túi 2 bên tiện lợi sâu rộng'
    ],
    specs: {
      'Chất liệu': 'Vải Tencel pha Rayon rủ sóng',
      'Chiều dài': '100 - 104 cm',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'pants-5',
    name: 'Quần Kaki Nam Dáng Slimfit Trẻ Trung Phong Cách Chinos',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 369000,
    originalPrice: 480000,
    discount: 23,
    rating: 4.7,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 48,
    isFeatured: false,
    isNewArrival: false,
    material: 'Kaki Cotton Twill 100% chải kỹ',
    sizes: ['29', '30', '31', '32', '34'],
    colors: ['Vàng Khaki', 'Xanh Rêu Đậm', 'Đen', 'Ghi Xám'],
    description: 'Quần Chinos kaki nam phom dáng thon gọn, đường may 2 kim bền chắc, thích hợp cho cả môi trường công sở lẫn các buổi cafe dạo phố.',
    highlights: [
      'Sợi bông tự nhiên thoáng mát, không xù lông',
      'Túi sau may đắp viền tinh tế',
      'Dễ phối cùng áo thun, polo hoặc sơ mi'
    ],
    specs: {
      'Chất liệu': 'Cotton Kaki dệt chéo',
      'Form dáng': 'Slim-fit hiện đại',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'pants-6',
    name: 'Quần Jeans Ống Loe Nữ Vintage Cạp Siêu Cao Tôn Vòng 3',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 469000,
    originalPrice: 599000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 172,
    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 32,
    isFeatured: false,
    isNewArrival: true,
    material: 'Denim co giãn cao cấp đàn hồi tốt',
    sizes: ['26', '27', '28', '29', '30'],
    colors: ['Xanh Khói Retro', 'Xanh Đậm', 'Đen Wash'],
    description: 'Thiết kế ống loe thời thượng phong cách thập niên 90s, cạp cao ôm trọn vòng eo và nâng đỡ vòng 3 quyến rũ.',
    highlights: [
      'Vải jean co giãn êm ái khi đứng ngồi',
      'Đường chỉ may vàng cam vintage nổi bật',
      'Phần loe nhẹ 22cm cân đối dáng người'
    ],
    specs: {
      'Chất liệu': 'Denim Cotton 98% + Spandex 2%',
      'Form dáng': 'Bootcut Flare Loè nhẹ',
      'Xuất xứ': 'Việt Nam'
    }
  },

  // ==========================================
  // 4. ĐỒ THỂ THAO (6 MẪU)
  // ==========================================
  {
    id: 'sport-1',
    name: 'Bộ Đồ Thể Thao Nam Thun Lạnh Pro-Dry Thoáng Khí',
    category: 'sport',
    categoryName: 'Đồ Thể Thao',
    price: 389000,
    originalPrice: 499000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    isNewArrival: false,
    material: 'Thun lạnh hạt mè dệt công nghệ Pro-Dry',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Xanh Dương Đậm', 'Xám Ghi', 'Đen Carbon'],
    description: 'Set đồ tập gym, chạy bộ, đá bóng gồm áo thun thể thao và quần short có túi khóa kéo. Chất vải siêu nhẹ, thoát ẩm Pro-Dry giúp cơ thể luôn khô ráo.',
    highlights: [
      'Vải thun lạnh siêu nhẹ chỉ 120g/bộ, bay hơi mồ hôi siêu tốc',
      'Quần short có 2 túi khóa kéo để điện thoại và chìa khóa an toàn',
      'Logo phản quang nổi bật khi chạy bộ ban đêm',
      'Kháng khuẩn nano ngăn mùi mồ hôi khó chịu'
    ],
    specs: {
      'Chất liệu': '90% Polyester Pro-Dry + 10% Spandex',
      'Độ co giãn': 'Co giãn 4 chiều đàn hồi cao',
      'Bộ sản phẩm': 'Gồm 1 áo cộc tay + 1 quần short có khóa'
    }
  },
  {
    id: 'sport-2',
    name: 'Áo Bra Thể Thao Nữ Nâng Đỡ Tối Đa Chống Rung Khi Vận Động',
    category: 'sport',
    categoryName: 'Đồ Thể Thao',
    price: 289000,
    originalPrice: 380000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 40,
    isFeatured: false,
    isNewArrival: false,
    material: 'Nylon Spandex đan chéo trợ lực lưng',
    sizes: ['S', 'M', 'L'],
    colors: ['Đen', 'Hồng Đỗ', 'Xanh Bơ'],
    description: 'Áo ngực thể thao chuyên dụng cho yoga, gym, chạy bộ với thiết kế lưng đan dây trợ lực thông minh, đệm mút liền định hình nâng đỡ vòng 1 hoàn hảo.',
    highlights: [
      'Thiết kế đan dây sau lưng giảm áp lực lên vai và gáy',
      'Đệm ngực có lỗ thở thoáng khí, nâng đỡ chống xô lệch',
      'Vải mềm mại như làn da thứ hai không gây cấn đau'
    ],
    specs: {
      'Chất liệu': '75% Nylon + 25% Spandex cao cấp',
      'Mức nâng đỡ': 'High Support (Chạy bộ, HIIT, Gym nặng)',
      'Đệm ngực': 'Đệm mút liền thông hơi thoáng khí'
    }
  },
  {
    id: 'sport-3',
    name: 'Quần Legging Nữ Cạp Cao Nâng Mông Định Hình Vòng 3',
    category: 'sport',
    categoryName: 'Đồ Thể Thao',
    price: 329000,
    originalPrice: 450000,
    discount: 27,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 52,
    isFeatured: false,
    isNewArrival: true,
    material: 'Nylon dệt vi sợi liền mạch Seamless không viền',
    sizes: ['S', 'M', 'L'],
    colors: ['Xám Khói', 'Đen', 'Tím Pastel', 'Xanh Rêu'],
    description: 'Quần tập yoga gym cạp cao siết eo, công nghệ dệt viền cong ôm trọn nâng mông đào tự nhiên, chất vải không lộ đồ lót khi squat.',
    highlights: [
      'Công nghệ dệt không đường may (Seamless) không cọ xát',
      'Cạp cao bản rộng 10cm gen bụng phẳng lì',
      'Chất vải dày dặn 100% Squat-proof'
    ],
    specs: {
      'Chất liệu': '80% Polyamide + 20% Elastane',
      'Đặc tính': 'Thấm hút mồ hôi, co giãn 4 chiều',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'sport-4',
    name: 'Áo Khoác Gió Thể Thao Siêu Nhẹ Chống Nước & Tia UV',
    category: 'sport',
    categoryName: 'Đồ Thể Thao',
    price: 399000,
    originalPrice: 550000,
    discount: 27,
    rating: 4.9,
    reviewsCount: 135,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 44,
    isFeatured: true,
    isNewArrival: true,
    material: 'Vải dù Polyester tráng bạc chống thấm nước trượt nước',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Xanh Ngọc', 'Xám Bạc', 'Đen Bóng', 'Cam Năng Động'],
    description: 'Chiếc áo khoác gió thể thao siêu nhẹ chỉ 110g, gấp gọn trong lòng bàn tay, bảo vệ bạn khỏi mưa rào bất chợt và cản 99% tia UV độc hại.',
    highlights: [
      'Công nghệ phủ hạt sen trượt nước tức thì',
      'Chỉ số chống nắng UPF 50+ bảo vệ làn da',
      'Gấp gọn thành túi nhỏ có quai xách tiện lợi'
    ],
    specs: {
      'Chất liệu': 'Micro Polyester kháng nước',
      'Trọng lượng': '110 gram siêu nhẹ',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'sport-5',
    name: 'Quần Short Chạy Bộ Nam 2 Lớp Tích Hợp Túi Đựng Điện Thoại',
    category: 'sport',
    categoryName: 'Đồ Thể Thao',
    price: 269000,
    originalPrice: 360000,
    discount: 25,
    rating: 4.8,
    reviewsCount: 176,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 60,
    isFeatured: false,
    isNewArrival: false,
    material: 'Lớp ngoài dù mè xẻ tà + Lớp trong thun ôm trợ lực',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Đen Phối Đỏ', 'Xanh Than', 'Xám Nhạt'],
    description: 'Quần short tập thể thao thiết kế 2 lớp chuyên sâu cho dân chạy marathon và gym: lớp trong ôm đùi chống ma sát rát da, tích hợp túi điện thoại chống rung.',
    highlights: [
      'Túi lớp lót trong ôm sát điện thoại không bị lắc khi chạy',
      'Lỗ laser thoáng khí hai bên hông tản nhiệt nhanh',
      'Dây treo khăn tập tiện dụng phía sau lưng'
    ],
    specs: {
      'Chất liệu': '92% Polyester + 8% Spandex',
      'Chiều dài': 'Dáng short 5 inch chuẩn chạy bộ',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'sport-6',
    name: 'Áo Ba Lỗ Thể Thao Nam Khoét Nách Tập Gym Chuyên Nghiệp',
    category: 'sport',
    categoryName: 'Đồ Thể Thao',
    price: 179000,
    originalPrice: 240000,
    discount: 25,
    rating: 4.7,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 70,
    isFeatured: false,
    isNewArrival: false,
    material: 'Thun Cotton Spandex 4 chiều thoáng mát',
    sizes: ['M', 'L', 'XL'],
    colors: ['Trắng', 'Đen', 'Đỏ Đô', 'Xanh Rêu'],
    description: 'Áo tank top khoét nách rộng tôn trọn vẹn khối cơ ngực và xô lưng khi tập luyện, chất vải mềm mát hút ẩm tức thì.',
    highlights: [
      'Đường khoét nách chuẩn form gym bodybuilding',
      'Vạt áo bo cong vát nhẹ hiện đại',
      'Co giãn tối đa không gò bó động tác'
    ],
    specs: {
      'Chất liệu': 'Cotton Spandex cao cấp',
      'Form dáng': 'Gym Stringer Tank Top',
      'Xuất xứ': 'Việt Nam'
    }
  },

  // ==========================================
  // 5. ÁO KHOÁC & GIỮ NHIỆT (6 MẪU)
  // ==========================================
  {
    id: 'outer-1',
    name: 'Áo Măng Tô Dạ Nữ Dáng Dài Ép Lông Cừu Phong Cách Châu Âu',
    category: 'outerwear',
    categoryName: 'Áo Khoác & Giữ Nhiệt',
    price: 1190000,
    originalPrice: 1650000,
    discount: 28,
    rating: 4.9,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    isNewArrival: true,
    material: 'Dạ ép lông cừu 2 mặt cao cấp dập nhiệt',
    sizes: ['S', 'M', 'L'],
    colors: ['Nâu Camel Sang Trọng', 'Đen Tuyền', 'Be Yến Mạch'],
    description: 'Kiệt tác áo khoác mùa đông với chất dạ lông cừu ép thủ công 2 mặt mềm mịn như nhung, giữ ấm vượt trội trong những ngày giá rét.',
    highlights: [
      'Dạ lông cừu tự nhiên ép phẳng 2 mặt không lộ đường may xơ ráp',
      'Đai thắt eo tôn dáng đồng hồ cát thon gọn',
      'Chiều dài qua gối sang trọng bảo vệ toàn thân'
    ],
    specs: {
      'Chất liệu': '70% Lông cừu nguyên chất + 30% Polyester cao cấp',
      'Chiều dài': '110 cm chuẩn phom Âu',
      'Xuất xứ': 'VietThang Luxury Studio'
    }
  },
  {
    id: 'outer-2',
    name: 'Áo Phao Lông Vũ Nam Siêu Nhẹ Kháng Nước Dáng Gọn',
    category: 'outerwear',
    categoryName: 'Áo Khoác & Giữ Nhiệt',
    price: 890000,
    originalPrice: 1200000,
    discount: 26,
    rating: 4.9,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 36,
    isFeatured: false,
    isNewArrival: true,
    material: 'Ruột 90% Lông vũ tự nhiên + Vỏ dù cản gió mật độ cao',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Xanh Đen', 'Đen Nhám', 'Xám Bạc'],
    description: 'Áo phao lông vũ siêu nhẹ chỉ 250g nhưng giữ nhiệt cực tốt ở nhiệt độ dưới 10 độ C. Vỏ ngoài phủ lớp nano cản mưa bụi và gió rét.',
    highlights: [
      'Lông vũ trắng tinh khiết 90/10 độ phồng cao 700+ Fill Power',
      'Vỏ ngoài vải dù mật độ 400T chống lông vũ đâm ra ngoài',
      'Tặng kèm túi rút nén phao nhỏ gọn bỏ balo'
    ],
    specs: {
      'Ruột lông': '90% Lông tơ + 10% Lông cọng tự nhiên',
      'Trọng lượng': '250 gram siêu nhẹ',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'outer-3',
    name: 'Áo Cardigan Nữ Dệt Kim Len Lông Thỏ Dáng Rộng Vintage',
    category: 'outerwear',
    categoryName: 'Áo Khoác & Giữ Nhiệt',
    price: 439000,
    originalPrice: 590000,
    discount: 26,
    rating: 4.8,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    isNewArrival: false,
    material: 'Len pha lông mềm mại bồng bềnh',
    sizes: ['Freesize (42-65kg)', 'S', 'M'],
    colors: ['Xanh Bơ Pastel', 'Kem Sữa', 'Nâu Cafe'],
    description: 'Mẫu áo khoác len cardigan dáng rộng mềm mại như bông, hàng khuy gỗ mộc mạc phong cách vintage Hàn Quốc ấm áp.',
    highlights: [
      'Sợi len chải lông tơ êm nhẹ như mây',
      'Dáng lửng vừa vặn dễ mix cùng váy hay quần cạp cao',
      'Khuy gỗ tự nhiên tạo điểm nhấn cổ điển'
    ],
    specs: {
      'Chất liệu': 'Cotton Viscose pha sợi len mềm',
      'Độ dày': 'Dày dặn mềm rủ',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'outer-4',
    name: 'Áo Khoác Da Biker Nam Cổ Bẻ Khóa Chéo Phong Trần',
    category: 'outerwear',
    categoryName: 'Áo Khoác & Giữ Nhiệt',
    price: 980000,
    originalPrice: 1350000,
    discount: 27,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 25,
    isFeatured: true,
    isNewArrival: false,
    material: 'Da PU nhân tạo cao cấp phủ sáp chống nổ bong tróc',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Đen Cổ Điển', 'Nâu Vintage'],
    description: 'Biểu tượng của sự phong trần và cá tính. Thiết kế cổ bẻ đính đinh tán kim loại, khóa kéo bất đối xứng chuẩn phong cách Biker Jacket.',
    highlights: [
      'Da PU mềm dai không nổ, bề mặt bóng mờ sang trọng',
      'Phụ kiện khóa kim loại YKK chốt đồng sáng bóng',
      'Lót dù lụa bên trong mặc êm ái thoáng khí'
    ],
    specs: {
      'Chất liệu': 'Da nhân tạo phủ Nano PU chống thấm',
      'Bảo hành da': '12 tháng lỗi bong nổ 1 đổi 1',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'outer-5',
    name: 'Áo Hoodie Nỉ Bông Unisex Phom Rộng Dày Dặn 380GSM',
    category: 'outerwear',
    categoryName: 'Áo Khoác & Giữ Nhiệt',
    price: 389000,
    originalPrice: 499000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 75,
    isFeatured: false,
    isNewArrival: true,
    material: 'Nỉ bông Cotton chải mặt trong ấm mịn',
    sizes: ['M', 'L', 'XL'],
    colors: ['Xám Tiêu', 'Đen', 'Xanh Rêu Đậm', 'Trắng Sữa'],
    description: 'Áo hoodie nỉ bông cao cấp định lượng 380GSM siêu dày, mũ 2 lớp đứng dáng, giữ ấm hoàn hảo cho những ngày đông lạnh giá.',
    highlights: [
      'Nỉ bông dày 380GSM không rụng lông ra áo trong',
      'Túi kangaroo phía trước rộng rãi giữ ấm bàn tay',
      'Mũ 2 lớp dày trùm kín đầu'
    ],
    specs: {
      'Chất liệu': '85% Cotton + 15% Polyester chống co rút',
      'Định lượng': '380 GSM dày nặng tay',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'outer-6',
    name: 'Áo Khoác Măng Tô Nữ Dáng Dài Kèm Đai Thắt Eo Trench Coat',
    category: 'outerwear',
    categoryName: 'Áo Khoác & Giữ Nhiệt',
    price: 749000,
    originalPrice: 990000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 28,
    isFeatured: false,
    isNewArrival: false,
    material: 'Kaki chéo trượt nước cản gió cao cấp',
    sizes: ['S', 'M', 'L'],
    colors: ['Màu Be Cát', 'Xanh Rêu Nhạt', 'Đen'],
    description: 'Chiếc áo khoác Trench Coat kinh điển chuẩn quý cô công sở Anh Quốc, thanh lịch bất chấp mưa phùn hay gió bấc.',
    highlights: [
      'Vải kaki trượt nước nhẹ nhàng giữ người luôn khô ráo',
      'Chi tiết cầu vai và đai thắt lưng phong cách quân đội lịch lãm',
      'Tà áo xếp li xòe nhẹ khi di chuyển'
    ],
    specs: {
      'Chất liệu': 'Kaki Twill mật độ cao',
      'Chiều dài': '105 cm',
      'Xuất xứ': 'Việt Nam'
    }
  },

  // ==========================================
  // 6. PHỤ KIỆN & GIÀY (6 MẪU)
  // ==========================================
  {
    id: 'acc-1',
    name: 'Thắt Lưng Nam Da Bò Thật 100% Khóa Tự Động Hợp Kim',
    category: 'accessories',
    categoryName: 'Phụ kiện & Giày',
    price: 299000,
    originalPrice: 450000,
    discount: 33,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 75,
    isFeatured: false,
    isNewArrival: false,
    material: 'Da bò nguyên tấm lớp 1 (Top Grain Leather)',
    sizes: ['Bản rộng 3.5cm - Dài 120cm'],
    colors: ['Đen Nam Tính', 'Nâu Cafe'],
    description: 'Dây nịt nam da bò thật nhập khẩu dẻo dai nguyên tấm, mặt khóa tự động trượt mượt mà không cần đục lỗ, hộp đựng sang trọng thích hợp làm quà tặng.',
    highlights: [
      'Da bò nguyên miếng càng dùng càng bóng đẹp mềm mại',
      'Đầu khóa hợp kim phủ titan chống trầy xước và hoen gỉ',
      'Cơ chế ray trượt tự động tinh chỉnh kích thước chuẩn xác',
      'Tặng kèm hộp quà và túi giấy sang trọng'
    ],
    specs: {
      'Chất liệu dây': '100% Da bò thật tự nhiên nhập khẩu',
      'Chất liệu khóa': 'Hợp kim nguyên khối mạ điện phân',
      'Bản rộng': '3.5 cm chuẩn công sở',
      'Bảo hành': '12 tháng lỗi nổ da 1 đổi 1'
    }
  },
  {
    id: 'acc-2',
    name: 'Kính Mát Unisex Phi Công Polarized Chống Chói & Tia UV400',
    category: 'accessories',
    categoryName: 'Phụ kiện & Giày',
    price: 349000,
    originalPrice: 490000,
    discount: 29,
    rating: 4.8,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 60,
    isFeatured: true,
    isNewArrival: true,
    material: 'Tròng kính Polarized TAC 9 lớp + Gọng hợp kim Titan',
    sizes: ['Tiêu chuẩn Unisex'],
    colors: ['Mắt Đen Gọng Bạc', 'Mắt Trà Gọng Vàng', 'Mắt Xanh Rêu'],
    description: 'Kính râm dáng phi công kinh điển gọng thanh mảnh, tròng phân cực chống chói khi lái xe và chặn 100% tia cực tím có hại.',
    highlights: [
      'Tròng phân cực Polarized chống lóa sáng chói mắt',
      'Chống tia UV400 chuẩn Châu Âu bảo vệ mắt tối đa',
      'Gọng kính titan siêu nhẹ chỉ 22g không tì sống mũi'
    ],
    specs: {
      'Tròng kính': 'Polarized TAC 9 lớp quang học',
      'Gọng': 'Hợp kim Titan đàn hồi',
      'Phụ kiện': 'Bao da sang trọng + Khăn lau nano'
    }
  },
  {
    id: 'acc-3',
    name: 'Túi Xách Nữ Da Mềm Dáng Kẹp Nách Hobo Bag Thanh Lịch',
    category: 'accessories',
    categoryName: 'Phụ kiện & Giày',
    price: 459000,
    originalPrice: 650000,
    discount: 29,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    isNewArrival: false,
    material: 'Da nhân tạo hạt mịn cao cấp chống trầy',
    sizes: ['Kích thước: 24 x 16 x 7 cm'],
    colors: ['Trắng Kem', 'Đen Huyền Bí', 'Nâu Bò Vintage'],
    description: 'Chiếc túi kẹp nách nữ thiết kế vát cong mềm mại, tôn nét thời thượng cho outfit từ áo thun đến đầm dạ tiệc.',
    highlights: [
      'Dây đeo tùy chỉnh linh hoạt vừa kẹp nách vừa đeo chéo',
      'Khóa kim loại mạ vàng không bay màu',
      'Ngăn chứa rộng rãi để vừa điện thoại Pro Max, ví tiền và son phấn'
    ],
    specs: {
      'Chất liệu': 'Da nhân tạo phủ Nano chống bám bẩn',
      'Kích thước': '24 x 16 x 7 cm',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'acc-4',
    name: 'Mũ Lưỡi Trai Nón Kết Thêu Logo Phong Cách Minimalist',
    category: 'accessories',
    categoryName: 'Phụ kiện & Giày',
    price: 159000,
    originalPrice: 220000,
    discount: 28,
    rating: 4.8,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 80,
    isFeatured: false,
    isNewArrival: false,
    material: '100% Vải Kaki Cotton dệt đan thoáng khí',
    sizes: ['Freesize có khóa tăng giảm phía sau'],
    colors: ['Đen', 'Trắng Ngà', 'Xanh Navy', 'Be Nhạt'],
    description: 'Mũ lưỡi trai phom cứng cáp ôm đầu chuẩn đẹp, khóa cài kim loại cao cấp phía sau giúp tùy chỉnh vừa vặn mọi cỡ đầu.',
    highlights: [
      'Vải kaki cotton thoáng mát có lỗ thông gió',
      'Đường thêu nổi 3D tinh xảo sắc nét',
      'Vành lưỡi trai uốn cong tự nhiên chống nắng hiệu quả'
    ],
    specs: {
      'Chất liệu': 'Cotton Twill 100%',
      'Chu vi vòng đầu': '54 - 60 cm',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'acc-5',
    name: 'Khăn Quàng Cổ Lụa Satin Vuông 70x70cm Họa Tiết Hoàng Gia',
    category: 'accessories',
    categoryName: 'Phụ kiện & Giày',
    price: 189000,
    originalPrice: 260000,
    discount: 27,
    rating: 4.9,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 50,
    isFeatured: false,
    isNewArrival: true,
    material: 'Lụa Satin dệt óng ả mềm mịn như tơ',
    sizes: ['70 x 70 cm'],
    colors: ['Xanh Hoàng Gia', 'Cam Quý Phái', 'Đen Trắng Cổ Điển'],
    description: 'Khăn lụa vuông đa năng có thể biến tấu thắt nơ cổ áo sơ mi, buộc tóc xinh xắn hay quấn trang trí quai túi xách sang trọng.',
    highlights: [
      'Bề mặt lụa satin mượt mà thân thiện với làn da',
      'Họa tiết in nhiệt sắc nét không phai màu khi giặt',
      'Viền khăn cuốn tay tỉ mỉ tinh tế'
    ],
    specs: {
      'Chất liệu': 'Lụa Satin dệt mềm mịn',
      'Kích thước': '70 x 70 cm',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'acc-6',
    name: 'Túi Tote Vải Canvas Mộc Quai Dày In Chữ Typography',
    category: 'accessories',
    categoryName: 'Phụ kiện & Giày',
    price: 149000,
    originalPrice: 200000,
    discount: 26,
    rating: 4.8,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 90,
    isFeatured: false,
    isNewArrival: false,
    material: 'Vải Canvas mộc sợi bông tự nhiên 12 Oz dày dặn',
    sizes: ['Kích thước: 38 x 35 x 8 cm (Để vừa laptop 15.6 inch)'],
    colors: ['Màu Mộc Tự Nhiên', 'Đen Tuyển'],
    description: 'Chiếc túi tote canvas mộc mạc và thân thiện với môi trường, có khóa kéo miệng túi và ngăn phụ bí mật bên trong đựng chìa khóa hay thẻ xe.',
    highlights: [
      'Vải canvas dày dặn chịu lực tới 15kg',
      'Miệng túi có khóa kéo bảo vệ đồ đạc an toàn',
      'Để vừa tài liệu A4, laptop 15.6 inch và bình nước'
    ],
    specs: {
      'Chất liệu': '100% Canvas mộc cao cấp',
      'Khóa kéo': 'Khóa kéo kim loại trơn tru',
      'Xuất xứ': 'Việt Nam'
    }
  }
];

export const VOUCHERS = [
  {
    code: 'VIETTHANG10',
    description: 'Giảm ngay 10% trên tổng giá trị đơn hàng',
    discountPercent: 10,
    minSpend: 0,
    fixedDiscount: 0,
    freeShip: false,
    isActive: true,
  },
  {
    code: 'FREESHIP',
    description: 'Miễn phí vận chuyển toàn quốc cho đơn từ 500.000đ',
    freeShip: true,
    minSpend: 500000,
    discountPercent: 0,
    fixedDiscount: 0,
    isActive: true,
  },
  {
    code: 'FASHION50',
    description: 'Giảm 50.000đ cho đơn hàng thời trang từ 600.000đ',
    fixedDiscount: 50000,
    discountPercent: 0,
    freeShip: false,
    minSpend: 600000,
    isActive: true,
  },
  {
    code: 'WELCOME50',
    description: 'Ưu đãi thành viên mới: Giảm 50.000đ cho đơn từ 400.000đ',
    fixedDiscount: 50000,
    discountPercent: 0,
    freeShip: false,
    minSpend: 400000,
    isActive: true,
  }
];

export const USERS = [
  {
    name: 'Quản Trị Viên (Admin)',
    email: 'admin@vietthangstore.vn',
    password: 'admin123',
    role: 'admin',
    phone: '0988888888',
    address: 'Trụ sở VietThang Fashion, Hà Nội'
  },
  {
    name: 'Nguyễn Văn Thắng (Demo)',
    email: 'demo@vietthangstore.vn',
    password: 'demo',
    role: 'customer',
    phone: '0912345678',
    address: '123 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội'
  }
];
