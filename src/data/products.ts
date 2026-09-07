import { Product } from '../types';

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'phone', name: 'Điện thoại' },
  { id: 'laptop', name: 'Laptop' },
  { id: 'accessory', name: 'Phụ kiện' },
  { id: 'audio', name: 'Âm thanh' },
  { id: 'smarthome', name: 'Smart Home' },
] as const;

export const PRODUCTS: Product[] = [
  // 1. Điện thoại
  {
    id: 'phone-1',
    name: 'iPhone 16 Pro Max 256GB - Titan Tự Nhiên',
    category: 'phone',
    categoryName: 'Điện thoại',
    price: 33490000,
    originalPrice: 34990000,
    discount: 4,
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    description: 'iPhone 16 Pro Max trang bị vi xử lý Apple A18 Pro mạnh mẽ, nút Điều Khiển Camera hoàn toàn mới, khung viền titan siêu nhẹ và màn hình Super Retina XDR 6.9 inch viền mỏng nhất lịch sử Apple.',
    highlights: [
      'Chip Apple A18 Pro tiến trình 3nm thế hệ mới',
      'Camera chính 48MP Fusion & ống kính telephoto 5x zoom quang',
      'Nút Điều Khiển Camera (Camera Control) cảm ứng lực',
      'Thời lượng pin xem video lên đến 33 giờ liên tục'
    ],
    specs: {
      'Màn hình': '6.9 inch OLED Super Retina XDR, 120Hz ProMotion',
      'Vi xử lý (CPU)': 'Apple A18 Pro (6 nhân CPU, 6 nhân GPU, 16 nhân NPU)',
      'RAM': '8 GB',
      'Bộ nhớ trong': '256 GB',
      'Camera sau': '48MP chính + 48MP góc siêu rộng + 12MP Tele 5x',
      'Camera trước': '12MP TrueDepth AutoFocus',
      'Pin & Sạc': 'Hỗ trợ sạc nhanh 25W MagSafe, USB-C 3.0',
      'Kháng nước': 'IP68 (sâu 6m trong 30 phút)'
    }
  },
  {
    id: 'phone-2',
    name: 'Samsung Galaxy S25 Ultra 5G 12GB/256GB',
    category: 'phone',
    categoryName: 'Điện thoại',
    price: 29990000,
    originalPrice: 33990000,
    discount: 12,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    description: 'Galaxy S25 Ultra đỉnh cao công nghệ AI Galaxy thế hệ mới với thiết kế cạnh vát titan hiện đại, bút S-Pen tích hợp và cảm biến camera 200MP siêu sắc nét vượt trội.',
    highlights: [
      'Chip Snapdragon 8 Elite for Galaxy đỉnh cao hiệu năng',
      'Camera chính 200MP bắt trọn chi tiết dù trong điều kiện thiếu sáng',
      'Màn hình Dynamic AMOLED 2X phẳng phủ kính chống chói Gorilla Armor',
      'Hệ thống Galaxy AI hỗ trợ dịch trực tiếp cuộc gọi và tóm tắt văn bản'
    ],
    specs: {
      'Màn hình': '6.8 inch Dynamic AMOLED 2X, 120Hz, 2600 nits',
      'Vi xử lý (CPU)': 'Snapdragon 8 Elite for Galaxy (3nm)',
      'RAM': '12 GB',
      'Bộ nhớ trong': '256 GB',
      'Camera sau': '200MP + 50MP Ultra-wide + 50MP Tele 5x + 10MP Tele 3x',
      'Pin & Sạc': '5.000 mAh, Sạc nhanh 45W có dây',
      'Bút cảm ứng': 'S-Pen tích hợp độ trễ 2.8ms',
      'Hệ điều hành': 'One UI 7 (Android 15)'
    }
  },
  {
    id: 'phone-3',
    name: 'Xiaomi 15 Pro Leica Optical 16GB/512GB',
    category: 'phone',
    categoryName: 'Điện thoại',
    price: 21490000,
    originalPrice: 24990000,
    discount: 14,
    rating: 4.7,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    description: 'Xiaomi 15 Pro là kiệt tác nhiếp ảnh hợp tác cùng Leica với ống kính Summilux quang học, viên pin khủng 6100mAh cực mỏng và hệ điều hành Xiaomi HyperOS 2.0 mượt mà.',
    highlights: [
      'Hệ thống 3 camera 50MP cảm biến lớn Leica Optics',
      'Viên pin dung lượng lớn 6100mAh Silicon-Carbon',
      'Sạc nhanh có dây 90W HyperCharge, sạc không dây 50W',
      'Màn hình 2K LTPO OLED 3200 nits sắc nét'
    ],
    specs: {
      'Màn hình': '6.73 inch 2K AMOLED LTPO 120Hz, 3200 nits',
      'Vi xử lý (CPU)': 'Snapdragon 8 Elite (3nm)',
      'RAM': '16 GB LPDDR5X',
      'Bộ nhớ trong': '512 GB UFS 4.0',
      'Camera': '3 x 50MP Leica Summilux lens',
      'Pin': '6100 mAh, sạc nhanh 90W',
      'Vật liệu': 'Khung nhôm hàng không, kính Dragon Crystal'
    }
  },

  // 2. Laptop
  {
    id: 'laptop-1',
    name: 'MacBook Pro 14 M4 Pro (24GB RAM / 512GB SSD)',
    category: 'laptop',
    categoryName: 'Laptop',
    price: 48990000,
    originalPrice: 52990000,
    discount: 8,
    rating: 5.0,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    description: 'MacBook Pro 14 M4 Pro đem lại sức mạnh vô song cho dân thiết kế đồ họa, lập trình viên và dựng phim chuyên nghiệp với kiến trúc GPU tiên tiến, màn hình Liquid Retina XDR độ sáng 1600 nits.',
    highlights: [
      'Chip Apple M4 Pro 12-core CPU, 16-core GPU thế hệ mới nhất',
      'Màn hình Liquid Retina XDR màu sắc chuẩn xác P3, ProMotion 120Hz',
      '3 cổng Thunderbolt 5 băng thông lên tới 120Gbps',
      'Thời lượng pin sử dụng lên đến 22 tiếng bền bỉ'
    ],
    specs: {
      'Màn hình': '14.2 inch Liquid Retina XDR (3024 x 1964), 120Hz',
      'Vi xử lý': 'Apple M4 Pro (12 CPU, 16 GPU)',
      'RAM': '24 GB Unified Memory',
      'Ổ cứng': '512 GB SSD PCIe tốc độ cao',
      'Cổng kết nối': '3 x Thunderbolt 5, HDMI, SDXC, MagSafe 3',
      'Trọng lượng': '1.6 kg',
      'Hệ điều hành': 'macOS Sequoia'
    }
  },
  {
    id: 'laptop-2',
    name: 'Laptop ASUS ROG Zephyrus G16 OLED (RTX 4070)',
    category: 'laptop',
    categoryName: 'Laptop',
    price: 46990000,
    originalPrice: 51990000,
    discount: 10,
    rating: 4.8,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    description: 'ASUS ROG Zephyrus G16 mỏng nhẹ đỉnh cao với thân máy nhôm CNC nguyên khối, màn hình ROG Nebula OLED 2.5K 240Hz và đồ họa NVIDIA RTX 4070 mạnh mẽ cho mọi tựa game AAA.',
    highlights: [
      'Card đồ họa NVIDIA GeForce RTX 4070 8GB GDDR6',
      'Màn hình ROG Nebula Display OLED 2.5K 240Hz / 0.2ms',
      'Đèn Slash Lighting LED mặt lưng độc đáo ấn tượng',
      'Hệ thống tản nhiệt buồng hơi ROG Intelligent Cooling'
    ],
    specs: {
      'Màn hình': '16 inch 2.5K (2560 x 1600) OLED 240Hz, DCI-P3 100%',
      'CPU': 'Intel Core Ultra 9 185H (16 nhân, 22 luồng, NPU AI)',
      'Card đồ họa': 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      'RAM': '32 GB LPDDR5X 7467MHz',
      'Ổ cứng': '1 TB SSD M.2 NVMe PCIe 4.0',
      'Trọng lượng': '1.85 kg, độ dày chỉ 1.49 cm'
    }
  },
  {
    id: 'laptop-3',
    name: 'Laptop Dell XPS 13 9340 Intel Core Ultra 7',
    category: 'laptop',
    categoryName: 'Laptop',
    price: 35990000,
    originalPrice: 38990000,
    discount: 7,
    rating: 4.6,
    reviewsCount: 43,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 11,
    isFeatured: false,
    description: 'Dell XPS 13 tái định nghĩa chuẩn mực ultrabook doanh nhân với bàn di chuột vô hình kính liền mạch, hàng phím chức năng cảm ứng điện dung và thời lượng pin xuất sắc.',
    highlights: [
      'Thiết kế tương lai với Touchpad vô cực tàng hình',
      'Màn hình viền siêu mỏng InfinityEdge FHD+ 120Hz',
      'Trọng lượng siêu nhẹ chỉ 1.19kg dễ dàng mang theo di chuyển',
      'Bộ vi xử lý tích hợp Intel AI Boost'
    ],
    specs: {
      'Màn hình': '13.4 inch FHD+ (1920x1200) IPS 120Hz, 500 nits',
      'CPU': 'Intel Core Ultra 7 155H',
      'RAM': '16 GB LPDDR5x',
      'SSD': '512 GB PCIe 4.0 NVMe',
      'Pin': '55Wh sạc nhanh 60W Type-C',
      'Trọng lượng': '1.19 kg'
    }
  },

  // 3. Phụ kiện
  {
    id: 'acc-1',
    name: 'Củ sạc nhanh Anker Prime GaN 100W (3 Cổng USB-C/A)',
    category: 'accessory',
    categoryName: 'Phụ kiện',
    price: 1390000,
    originalPrice: 1790000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    description: 'Củ sạc công nghệ GaN thế hệ mới từ Anker nhỏ hơn 43% so với sạc thông thường, trang bị PowerIQ 4.0 tự động điều phối công suất tối ưu cho Laptop, iPad và iPhone cùng lúc.',
    highlights: [
      'Tổng công suất 100W, sạc nhanh MacBook Pro 14 đạt 50% trong 30 phút',
      '2 cổng USB-C + 1 cổng USB-A tiện lợi',
      'Công nghệ tản nhiệt ActiveShield 2.0 kiểm soát nhiệt độ an toàn',
      'Kích thước nhỏ gọn bỏ túi du lịch thuận tiện'
    ],
    specs: {
      'Công suất tối đa': '100W Max',
      'Cổng đầu ra': '2x USB-C, 1x USB-A',
      'Công nghệ': 'GaN III, PowerIQ 4.0, ActiveShield 2.0',
      'Trọng lượng': '183 g',
      'Bảo hành': '24 tháng 1 đổi 1'
    }
  },
  {
    id: 'acc-2',
    name: 'Chuột không dây công thái học Logitech MX Master 3S',
    category: 'accessory',
    categoryName: 'Phụ kiện',
    price: 2190000,
    originalPrice: 2690000,
    discount: 18,
    rating: 4.9,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    description: 'Chuột văn phòng đỉnh cao thế giới với click siêu êm Quiet Clicks giảm 90% tiếng ồn, con lăn điện từ MagSpeed cuộn 1.000 dòng mỗi giây và cảm biến quang học 8.000 DPI dùng trên mọi bề mặt.',
    highlights: [
      'Công nghệ click tĩnh âm Quiet Clicks êm ái',
      'Con lăn điện từ siêu nhanh MagSpeed SmartShift',
      'Cảm biến quang học 8000 DPI chạy tốt trên cả mặt kính',
      'Kết nối cùng lúc 3 thiết bị qua Bluetooth & Logi Bolt'
    ],
    specs: {
      'Cảm biến': 'Darkfield high precision 8000 DPI',
      'Pin': 'Sạc lại 500mAh, dùng đến 70 ngày cho 1 lần sạc',
      'Kết nối': 'Bluetooth Low Energy & Đầu thu Logi Bolt USB',
      'Số nút bấm': '7 nút tùy biến theo từng ứng dụng'
    }
  },
  {
    id: 'acc-3',
    name: 'Bàn phím cơ không dây Keychron Q1 Pro QMK/VIA (Gateron Red)',
    category: 'accessory',
    categoryName: 'Phụ kiện',
    price: 4390000,
    originalPrice: 4890000,
    discount: 10,
    rating: 4.8,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 8,
    isFeatured: false,
    description: 'Bàn phím cơ kim loại nguyên khối CNC Custom chuẩn layout 75%, kết nối Bluetooth 5.1 và có dây Type-C, cấu trúc đệm Double-Gasket êm tai tuyệt hảo cho dân gõ phím chuyên sâu.',
    highlights: [
      'Vỏ nhôm Anodized 6063 CNC đầm chắc tinh tế',
      'Cấu trúc Double Gasket Mount tiêu âm cao cấp',
      'Hỗ trợ custom map phím toàn diện qua QMK/VIA',
      'Hotswap 5-pin thay switch nhanh không cần hàn chì'
    ],
    specs: {
      'Layout': '75% (81 phím + Núm xoay Knob)',
      'Switch': 'Keychron K Pro Red (Linear) lube sẵn',
      'Pin': '4000 mAh dùng đến 300 giờ tắt led',
      'Keycap': 'KSA Profile Double-Shot PBT cao cấp',
      'Trọng lượng': '1.73 kg'
    }
  },

  // 4. Âm thanh
  {
    id: 'audio-1',
    name: 'Tai nghe Bluetooth chống ồn Sony WH-1000XM5 (Bạc/Đen)',
    category: 'audio',
    categoryName: 'Âm thanh',
    price: 6890000,
    originalPrice: 7990000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 16,
    isFeatured: true,
    description: 'Tai nghe chụp tai hàng đầu với 2 bộ xử lý và 8 micro chuyên dụng khử ồn tối ưu Auto NC Optimizer, hỗ trợ âm thanh độ phân giải cao Hi-Res Audio Wireless và LDAC.',
    highlights: [
      'Chống ồn đỉnh cao Auto NC Optimizer tự điều chỉnh theo môi trường',
      'Chất âm Hi-Res Audio qua củ loa carbon 30mm tinh chỉnh',
      'Đàm thoại rõ nét với 4 micro beamforming AI khử tạp âm',
      'Thời lượng pin lên đến 30 giờ, sạc 3 phút dùng 3 giờ'
    ],
    specs: {
      'Driver': '30 mm màng loa sợi carbon tổng hợp',
      'Bluetooth': 'v5.2 codec LDAC, AAC, SBC',
      'Pin': '30 giờ (bật ANC), 40 giờ (tắt ANC)',
      'Trọng lượng': '250 g siêu nhẹ êm tai',
      'Tính năng': 'Speak-to-Chat, chạm cảm ứng tai phải'
    }
  },
  {
    id: 'audio-2',
    name: 'Tai nghe Apple AirPods Pro 2 (USB-C & MagSafe Case)',
    category: 'audio',
    categoryName: 'Âm thanh',
    price: 5290000,
    originalPrice: 6190000,
    discount: 15,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    description: 'AirPods Pro 2 trang bị chip Apple H2 mang đến khả năng Chủ Động Khử Tiếng Ồn tốt hơn gấp đôi, Âm Thanh Thích Ứng tự động điều chỉnh âm lượng theo tiếng ồn môi trường và hộp sạc USB-C chống bụi IP54.',
    highlights: [
      'Chip H2 xử lý âm thanh không gian cá nhân hóa Spatial Audio',
      'Chống ồn ANC nâng cấp gấp 2 lần thế hệ trước',
      'Tính năng Âm Thanh Thích Ứng (Adaptive Audio) thông minh',
      'Hộp sạc tích hợp loa tìm kiếm Find My Precision'
    ],
    specs: {
      'Vi xử lý': 'Apple H2 trong tai nghe, Apple U1 trong case',
      'Cổng sạc': 'USB-C, hỗ trợ sạc MagSafe & sạc Apple Watch',
      'Pin': '6 giờ trên tai nghe, 30 giờ kèm hộp sạc',
      'Kháng nước': 'IP54 cho cả tai nghe và hộp sạc'
    }
  },
  {
    id: 'audio-3',
    name: 'Loa Bluetooth Cổ Điển Marshall Stanmore III (80W)',
    category: 'audio',
    categoryName: 'Âm thanh',
    price: 8990000,
    originalPrice: 9990000,
    discount: 10,
    rating: 4.8,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 7,
    isFeatured: false,
    description: 'Loa để bàn huyền thoại mang phong cách Rock & Roll cổ điển với âm trường stereo rộng mở bao trùm khắp căn phòng, hỗ trợ kết nối Bluetooth 5.2 và jack AUX 3.5mm/RCA.',
    highlights: [
      'Công suất 80W uy lực với âm trầm sâu chắc đặc trưng Marshall',
      'Thiết kế vintage da bọc sang trọng, núm xoay kim loại đồng',
      'Tính năng Dynamic Loudness cân bằng dải âm ở mọi mức volume',
      'Kết nối đa dạng Bluetooth 5.2, AUX 3.5mm, cổng RCA'
    ],
    specs: {
      'Công suất': '80W Class D (1 loa trầm 50W + 2 loa tweeter 15W)',
      'Dải tần': '45 - 20,000 Hz',
      'Kết nối': 'Bluetooth 5.2 LE Audio, RCA, 3.5mm',
      'Nguồn điện': 'Cắm điện trực tiếp 100-240V',
      'Trọng lượng': '4.25 kg'
    }
  },

  // 5. Smart Home
  {
    id: 'smarthome-1',
    name: 'Robot hút bụi lau nhà thông minh Roborock S8 Pro Ultra',
    category: 'smarthome',
    categoryName: 'Smart Home',
    price: 23990000,
    originalPrice: 28990000,
    discount: 17,
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    description: 'Trạm sạc đa năng RockDock Ultra tự động giặt giẻ lau bằng nước nóng, sấy khô bằng khí nóng, tự hút rác và bơm nước sạch. Lực hút cực đại 6000Pa cùng công nghệ lau rung kép VibraRise 2.0.',
    highlights: [
      'Trạm sạc toàn năng tự động: gom rác, giặt giẻ, sấy khô, bơm nước',
      'Lực hút 6000Pa HyperForce đánh bay mọi vết bẩn cứng đầu',
      'Hệ thống tránh chướng ngại vật 3D Reactive AI thông minh',
      'Chổi lăn kép DuoRoller chống rối tóc tuyệt đối'
    ],
    specs: {
      'Lực hút': '6.000 Pa',
      'Trạm sạc': 'Tự động giặt giẻ, sấy nhiệt, hút bụi 7 tuần',
      'Dung lượng pin': '5.200 mAh (hoạt động 180 phút)',
      'Điều hướng': 'LiDAR PreciSense + 3D Structured Light',
      'Điều khiển': 'Ứng dụng Roborock / Mi Home tiếng Việt'
    }
  },
  {
    id: 'smarthome-2',
    name: 'Camera an ninh AI xoay 360 Aqara Hub Camera G3 (Apple HomeKit)',
    category: 'smarthome',
    categoryName: 'Smart Home',
    price: 2490000,
    originalPrice: 2990000,
    discount: 16,
    rating: 4.7,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 19,
    isFeatured: false,
    description: 'Camera nhận diện khuôn mặt và cử chỉ bằng AI đầu tiên trên thế giới tích hợp trung tâm điều khiển nhà thông minh Zigbee 3.0, hỗ trợ Apple HomeKit Secure Video 2K siêu nét.',
    highlights: [
      'Độ phân giải 2K 2304x1296 sắc nét cả ngày lẫn đêm',
      'Nhận diện khuôn mặt, thú cưng và cử chỉ tay thông minh AI',
      'Tích hợp Hub Zigbee 3.0 liên kết hơn 128 thiết bị con',
      'Chế độ ngủ bảo vệ quyền riêng tư tự động cụp ống kính'
    ],
    specs: {
      'Độ phân giải': '2K (2304 x 1296p)',
      'Góc quay': '360° ngang, 45° dọc',
      'Hỗ trợ hệ sinh thái': 'Apple HomeKit, Google Home, Alexa, IFTTT',
      'Lưu trữ': 'Thẻ nhớ MicroSD tối đa 128GB, iCloud Cloud Storage',
      'Kết nối': 'Wi-Fi 2.4GHz / 5GHz, Zigbee 3.0'
    }
  }
];

export const VOUCHERS = [
  {
    code: 'VIETTHANG10',
    description: 'Giảm ngay 10% trên tổng giá trị đơn hàng',
    discountPercent: 10,
    minSpend: 0,
  },
  {
    code: 'FREESHIP',
    description: 'Miễn phí vận chuyển toàn quốc cho đơn từ 1.000.000đ',
    freeShip: true,
    minSpend: 1000000,
  },
  {
    code: 'TECH500',
    description: 'Giảm ngay 500.000đ cho đơn hàng trên 10 triệu',
    fixedDiscount: 500000,
    minSpend: 10000000,
  }
];
