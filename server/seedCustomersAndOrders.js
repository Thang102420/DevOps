import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vietthang_fashion';

export const REAL_CUSTOMERS = [
  {
    name: 'Hoàng Minh Đức',
    email: 'hoangduc.hn@gmail.com',
    password: '123456',
    phone: '0983 241 889',
    address: 'Số 28 Tràng Thi, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Trần Thị Mai Linh',
    email: 'mailinh.tran89@gmail.com',
    password: '123456',
    phone: '0912 876 543',
    address: 'Chung cư Masteri Thảo Điền, Tháp T2, Phường Thảo Điền, TP. Thủ Đức, TP. HCM',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Lê Quang Huy',
    email: 'quanghuy.le@outlook.com',
    password: '123456',
    phone: '0977 452 319',
    address: '142 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. Hồ Chí Minh',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Phạm Thu Hương',
    email: 'thuhuong.pham@gmail.com',
    password: '123456',
    phone: '0904 883 216',
    address: 'KĐT Ciputra, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Vũ Hoàng Long',
    email: 'longvu.designer@gmail.com',
    password: '123456',
    phone: '0936 128 905',
    address: '75 Bạch Đằng, Phường Thạch Thang, Quận Hải Châu, TP. Đà Nẵng',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Đặng Hải Yến',
    email: 'haiyen.dang@gmail.com',
    password: '123456',
    phone: '0989 654 321',
    address: '88 Lê Hồng Phong, Phường Đông Khê, Quận Ngô Quyền, TP. Hải Phòng',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Bùi Tuấn Anh',
    email: 'tuananh.bui95@gmail.com',
    password: '123456',
    phone: '0962 334 556',
    address: '215 Đại Lộ Hòa Bình, Phường An Cư, Quận Ninh Kiều, TP. Cần Thơ',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Ngô Phương Thảo',
    email: 'phuongthao.ngo@gmail.com',
    password: '123456',
    phone: '0945 782 190',
    address: 'Vinhomes Ocean Park, Tòa S2.05, Gia Lâm, Hà Nội',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Đỗ Gia Bảo',
    email: 'giabao.do@gmail.com',
    password: '123456',
    phone: '0918 992 341',
    address: '45 Trần Phú, Phường Lộc Thọ, TP. Nha Trang, Khánh Hòa',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Nguyễn Khánh Linh',
    email: 'khanhlinh.ng@gmail.com',
    password: '123456',
    phone: '0908 615 284',
    address: '12 Lê Lợi, Phường Vĩnh Ninh, TP. Huế, Thừa Thiên Huế',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=300&auto=format&fit=crop',
  },
];

export const REAL_ORDERS = [
  {
    orderCode: 'VT-892145',
    customer: {
      fullName: 'Hoàng Minh Đức',
      phone: '0983 241 889',
      address: 'Số 28 Tràng Thi, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội',
      email: 'hoangduc.hn@gmail.com',
      note: 'Giao giờ hành chính, gọi trước 15 phút',
    },
    items: [
      {
        productId: 'men-2',
        productName: 'Áo Sơ Mi Nam Dài Tay Oxford Chống Nhăn Kháng Khuẩn',
        price: 429000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'L',
        selectedColor: 'Trắng',
      },
      {
        productId: 'men-1',
        productName: 'Áo Polo Nam Vải Pima Cotton Cao Cấp Kháng Khuẩn Dáng Slim',
        price: 389000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'L',
        selectedColor: 'Xanh Navy',
      },
    ],
    subtotal: 818000,
    discountAmount: 0,
    shippingFee: 0,
    total: 818000,
    paymentMethod: 'vietqr',
    status: 'delivered',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    orderCode: 'VT-635102',
    customer: {
      fullName: 'Trần Thị Mai Linh',
      phone: '0912 876 543',
      address: 'Chung cư Masteri Thảo Điền, Tháp T2, Phường Thảo Điền, TP. Thủ Đức, TP. HCM',
      email: 'mailinh.tran89@gmail.com',
      note: 'Gửi quầy lễ tân tòa T2 giúp mình',
    },
    items: [
      {
        productId: 'women-4',
        productName: 'Set Áo Dạ Tweed Tiểu Thư Sang Chảnh Kèm Chân Váy A',
        price: 799000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'M',
        selectedColor: 'Kem Be',
      },
      {
        productId: 'women-3',
        productName: 'Áo Croptop Nữ Tay Ngắn Dệt Kim Gân Cổ Tròn Năng Động',
        price: 189000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'M',
        selectedColor: 'Trắng Kem',
      },
    ],
    subtotal: 988000,
    discountAmount: 50000,
    shippingFee: 0,
    total: 938000,
    paymentMethod: 'vietqr',
    status: 'delivered',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    orderCode: 'VT-471289',
    customer: {
      fullName: 'Lê Quang Huy',
      phone: '0977 452 319',
      address: '142 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. Hồ Chí Minh',
      email: 'quanghuy.le@outlook.com',
      note: 'Giao trước thứ 6 giúp mình',
    },
    items: [
      {
        productId: 'men-4',
        productName: 'Áo Blazer Nam Công Sở 1 Lớp Thoáng Mát Phom Casual Hàn Quốc',
        price: 689000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'XL',
        selectedColor: 'Đen',
      },
      {
        productId: 'men-2',
        productName: 'Áo Sơ Mi Nam Dài Tay Oxford Chống Nhăn Kháng Khuẩn',
        price: 429000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'XL',
        selectedColor: 'Xanh Nhạt',
      },
    ],
    subtotal: 1118000,
    discountAmount: 0,
    shippingFee: 0,
    total: 1118000,
    paymentMethod: 'cod',
    status: 'shipping',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    orderCode: 'VT-902341',
    customer: {
      fullName: 'Phạm Thu Hương',
      phone: '0904 883 216',
      address: 'KĐT Ciputra, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội',
      email: 'thuhuong.pham@gmail.com',
      note: 'Gọi điện trước khi giao',
    },
    items: [
      {
        productId: 'women-1',
        productName: 'Đầm Dự Tiệc Cổ Chữ V Dáng Xòe Lụa Mango Cao Cấp',
        price: 499000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'S',
        selectedColor: 'Đỏ Rượu',
      },
    ],
    subtotal: 499000,
    discountAmount: 0,
    shippingFee: 30000,
    total: 529000,
    paymentMethod: 'cod',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    orderCode: 'VT-551982',
    customer: {
      fullName: 'Vũ Hoàng Long',
      phone: '0936 128 905',
      address: '75 Bạch Đằng, Phường Thạch Thang, Quận Hải Châu, TP. Đà Nẵng',
      email: 'longvu.designer@gmail.com',
      note: 'Hàng thời trang thiết kế, đóng gói hộp cẩn thận',
    },
    items: [
      {
        productId: 'men-3',
        productName: 'Áo Thun Nam Oversize Cổ Tròn Graphic Typography Minimalist',
        price: 249000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'L',
        selectedColor: 'Trắng',
      },
      {
        productId: 'men-5',
        productName: 'Áo Sơ Mi Nam Đũi Linen Cổ Tàu Dáng Suông Mát Mùa Hè',
        price: 359000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'L',
        selectedColor: 'Xanh Rêu',
      },
    ],
    subtotal: 857000,
    discountAmount: 0,
    shippingFee: 0,
    total: 857000,
    paymentMethod: 'vietqr',
    status: 'delivered',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000),
  },
  {
    orderCode: 'VT-318490',
    customer: {
      fullName: 'Đặng Hải Yến',
      phone: '0989 654 321',
      address: '88 Lê Hồng Phong, Phường Đông Khê, Quận Ngô Quyền, TP. Hải Phòng',
      email: 'haiyen.dang@gmail.com',
      note: 'Giao giờ tan tầm sau 17h',
    },
    items: [
      {
        productId: 'women-2',
        productName: 'Áo Blazer Nữ Tay Dài Phom Rộng 2 Hàng Khuy Chuẩn Hàn',
        price: 549000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'M',
        selectedColor: 'Nâu Be',
      },
      {
        productId: 'women-3',
        productName: 'Áo Croptop Nữ Tay Ngắn Dệt Kim Gân Cổ Tròn Năng Động',
        price: 189000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'M',
        selectedColor: 'Đen',
      },
    ],
    subtotal: 738000,
    discountAmount: 0,
    shippingFee: 0,
    total: 738000,
    paymentMethod: 'cod',
    status: 'shipping',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    orderCode: 'VT-762145',
    customer: {
      fullName: 'Bùi Tuấn Anh',
      phone: '0962 334 556',
      address: '215 Đại Lộ Hòa Bình, Phường An Cư, Quận Ninh Kiều, TP. Cần Thơ',
      email: 'tuananh.bui95@gmail.com',
      note: 'Cho kiểm tra hàng trước khi thanh toán',
    },
    items: [
      {
        productId: 'men-5',
        productName: 'Áo Sơ Mi Nam Đũi Linen Cổ Tàu Dáng Suông Mát Mùa Hè',
        price: 359000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'L',
        selectedColor: 'Trắng',
      },
      {
        productId: 'men-1',
        productName: 'Áo Polo Nam Vải Pima Cotton Cao Cấp Kháng Khuẩn Dáng Slim',
        price: 389000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'L',
        selectedColor: 'Đen',
      },
    ],
    subtotal: 748000,
    discountAmount: 0,
    shippingFee: 0,
    total: 748000,
    paymentMethod: 'cod',
    status: 'pending',
    createdAt: new Date(Date.now() - 18 * 3600 * 1000),
  },
  {
    orderCode: 'VT-420917',
    customer: {
      fullName: 'Ngô Phương Thảo',
      phone: '0945 782 190',
      address: 'Vinhomes Ocean Park, Tòa S2.05, Gia Lâm, Hà Nội',
      email: 'phuongthao.ngo@gmail.com',
      note: 'Giao cuối tuần hoặc gửi bảo vệ sảnh',
    },
    items: [
      {
        productId: 'women-1',
        productName: 'Đầm Dự Tiệc Cổ Chữ V Dáng Xòe Lụa Mango Cao Cấp',
        price: 499000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'M',
        selectedColor: 'Xanh Rêu',
      },
      {
        productId: 'women-2',
        productName: 'Áo Blazer Nữ Tay Dài Phom Rộng 2 Hàng Khuy Chuẩn Hàn',
        price: 549000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'M',
        selectedColor: 'Đen',
      },
    ],
    subtotal: 1048000,
    discountAmount: 0,
    shippingFee: 0,
    total: 1048000,
    paymentMethod: 'vietqr',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 12 * 3600 * 1000),
  },
  {
    orderCode: 'VT-184562',
    customer: {
      fullName: 'Đỗ Gia Bảo',
      phone: '0918 992 341',
      address: '45 Trần Phú, Phường Lộc Thọ, TP. Nha Trang, Khánh Hòa',
      email: 'giabao.do@gmail.com',
      note: 'Giao giờ hành chính',
    },
    items: [
      {
        productId: 'men-6',
        productName: 'Áo Len Dệt Kim Nam Cổ Tròn Dệt Vân Vặn Thừng Thu Đông',
        price: 449000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'XL',
        selectedColor: 'Nâu Cafe',
      },
      {
        productId: 'men-2',
        productName: 'Áo Sơ Mi Nam Dài Tay Oxford Chống Nhăn Kháng Khuẩn',
        price: 429000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'XL',
        selectedColor: 'Xanh Dương',
      },
    ],
    subtotal: 878000,
    discountAmount: 0,
    shippingFee: 0,
    total: 878000,
    paymentMethod: 'cod',
    status: 'pending',
    createdAt: new Date(Date.now() - 6 * 3600 * 1000),
  },
  {
    orderCode: 'VT-953218',
    customer: {
      fullName: 'Nguyễn Khánh Linh',
      phone: '0908 615 284',
      address: '12 Lê Lợi, Phường Vĩnh Ninh, TP. Huế, Thừa Thiên Huế',
      email: 'khanhlinh.ng@gmail.com',
      note: 'Giao buổi sáng trước 11h',
    },
    items: [
      {
        productId: 'women-4',
        productName: 'Set Áo Dạ Tweed Tiểu Thư Sang Chảnh Kèm Chân Váy A',
        price: 799000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'S',
        selectedColor: 'Trắng Đen',
      },
    ],
    subtotal: 799000,
    discountAmount: 0,
    shippingFee: 0,
    total: 799000,
    paymentMethod: 'vietqr',
    status: 'delivered',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000),
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // 1. Upsert users
    let usersCreated = 0;
    for (const cust of REAL_CUSTOMERS) {
      const existing = await User.findOne({ email: cust.email.toLowerCase().trim() });
      if (!existing) {
        await User.create(cust);
        usersCreated++;
        console.log(` Created customer: ${cust.name} (${cust.email})`);
      } else {
        console.log(` Customer already exists: ${cust.name} (${cust.email})`);
      }
    }

    // 2. Upsert orders
    let ordersCreated = 0;
    for (const ord of REAL_ORDERS) {
      const existing = await Order.findOne({ orderCode: ord.orderCode });
      if (!existing) {
        await Order.create(ord);
        ordersCreated++;
        console.log(` Created order: #${ord.orderCode} - ${ord.customer.fullName} - ${ord.total.toLocaleString()}đ`);
      } else {
        console.log(` Order already exists: #${ord.orderCode}`);
      }
    }

    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    console.log('\n=======================================');
    console.log(`Seed completed successfully!`);
    console.log(`Users created: ${usersCreated} (Total in DB: ${totalUsers})`);
    console.log(`Orders created: ${ordersCreated} (Total in DB: ${totalOrders})`);
    console.log('=======================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
