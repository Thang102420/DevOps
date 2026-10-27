import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order } from '../types';
import { useToast } from './ToastContext';
import { apiService } from '../services/api';

export interface RegisteredAccount extends User {
  password?: string;
  createdAt?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  registeredAccounts: RegisteredAccount[];
  login: (usernameOrEmail: string, pass: string) => Promise<boolean>;
  loginDemo: () => void;
  loginAdmin: (usernameOrEmail: string, pass: string) => Promise<boolean>;
  loginAdminDemo: () => void;
  register: (name: string, email: string, pass: string, phone?: string, address?: string, role?: 'customer' | 'admin') => Promise<boolean>;
  addNewAccount: (userData: { name: string; email: string; password: string; phone?: string; address?: string; role?: 'customer' | 'admin' }) => Promise<{ success: boolean; message: string }>;
  updateAccount: (idOrEmail: string, updates: { name: string; email: string; password?: string; phone?: string; address?: string; role?: 'customer' | 'admin' }) => Promise<{ success: boolean; message: string }>;
  deleteAccount: (idOrEmail: string) => Promise<boolean>;
  refreshAccounts: () => Promise<void>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  generateDemoOrder: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (defaultTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalTab: 'login' | 'register';
  isHistoryModalOpen: boolean;
  openHistoryModal: () => void;
  closeHistoryModal: () => void;
}

const STORAGE_KEY_USER = 'vietthang_auth_user_v2';
const STORAGE_KEY_ORDERS = 'vietthang_user_orders_v2';
const STORAGE_KEY_ACCOUNTS = 'vietthang_registered_accounts_v2';

// Danh sách tài khoản mặc định
const INITIAL_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'usr_admin',
    name: 'Quản Trị Viên (Admin)',
    email: 'admin@vietthangstore.vn',
    password: 'admin123',
    phone: '0988 888 999',
    address: 'Trụ sở VietThang Fashion, Hà Nội',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'usr_demo',
    name: 'Nguyễn Văn Thắng (Demo)',
    email: 'demo@vietthangstore.vn',
    password: 'demo',
    phone: '0912 345 678',
    address: 'Tòa nhà Landmark 81, TP. Hồ Chí Minh',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'usr_c1',
    name: 'Hoàng Minh Đức',
    email: 'hoangduc.hn@gmail.com',
    password: '123456',
    phone: '0983 241 889',
    address: 'Số 28 Tràng Thi, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-02-10T08:30:00.000Z',
  },
  {
    id: 'usr_c2',
    name: 'Trần Thị Mai Linh',
    email: 'mailinh.tran89@gmail.com',
    password: '123456',
    phone: '0912 876 543',
    address: 'Chung cư Masteri Thảo Điền, Tháp T2, Phường Thảo Điền, TP. Thủ Đức, TP. HCM',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-02-14T10:15:00.000Z',
  },
  {
    id: 'usr_c3',
    name: 'Lê Quang Huy',
    email: 'quanghuy.le@outlook.com',
    password: '123456',
    phone: '0977 452 319',
    address: '142 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. Hồ Chí Minh',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-02-18T14:20:00.000Z',
  },
  {
    id: 'usr_c4',
    name: 'Phạm Thu Hương',
    email: 'thuhuong.pham@gmail.com',
    password: '123456',
    phone: '0904 883 216',
    address: 'KĐT Ciputra, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-02-22T09:45:00.000Z',
  },
  {
    id: 'usr_c5',
    name: 'Vũ Hoàng Long',
    email: 'longvu.designer@gmail.com',
    password: '123456',
    phone: '0936 128 905',
    address: '75 Bạch Đằng, Phường Thạch Thang, Quận Hải Châu, TP. Đà Nẵng',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-02-25T11:00:00.000Z',
  },
  {
    id: 'usr_c6',
    name: 'Đặng Hải Yến',
    email: 'haiyen.dang@gmail.com',
    password: '123456',
    phone: '0989 654 321',
    address: '88 Lê Hồng Phong, Phường Đông Khê, Quận Ngô Quyền, TP. Hải Phòng',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-03-01T16:30:00.000Z',
  },
  {
    id: 'usr_c7',
    name: 'Bùi Tuấn Anh',
    email: 'tuananh.bui95@gmail.com',
    password: '123456',
    phone: '0962 334 556',
    address: '215 Đại Lộ Hòa Bình, Phường An Cư, Quận Ninh Kiều, TP. Cần Thơ',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-03-05T13:10:00.000Z',
  },
  {
    id: 'usr_c8',
    name: 'Ngô Phương Thảo',
    email: 'phuongthao.ngo@gmail.com',
    password: '123456',
    phone: '0945 782 190',
    address: 'Vinhomes Ocean Park, Tòa S2.05, Gia Lâm, Hà Nội',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-03-10T10:00:00.000Z',
  },
  {
    id: 'usr_c9',
    name: 'Đỗ Gia Bảo',
    email: 'giabao.do@gmail.com',
    password: '123456',
    phone: '0918 992 341',
    address: '45 Trần Phú, Phường Lộc Thọ, TP. Nha Trang, Khánh Hòa',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-03-12T15:40:00.000Z',
  },
  {
    id: 'usr_c10',
    name: 'Nguyễn Khánh Linh',
    email: 'khanhlinh.ng@gmail.com',
    password: '123456',
    phone: '0908 615 284',
    address: '12 Lê Lợi, Phường Vĩnh Ninh, TP. Huế, Thừa Thiên Huế',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-03-15T09:15:00.000Z',
  },
];

// Danh sách đơn hàng mẫu thực tế
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1',
    orderCode: 'VT-892145',
    createdAt: '2026-03-20 09:15:30',
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
  },
  {
    id: 'ord_2',
    orderCode: 'VT-635102',
    createdAt: '2026-03-21 14:22:10',
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
  },
  {
    id: 'ord_3',
    orderCode: 'VT-471289',
    createdAt: '2026-03-22 11:05:00',
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
  },
  {
    id: 'ord_4',
    orderCode: 'VT-902341',
    createdAt: '2026-03-23 16:40:20',
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
  },
  {
    id: 'ord_5',
    orderCode: 'VT-551982',
    createdAt: '2026-03-24 10:12:45',
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
  },
  {
    id: 'ord_6',
    orderCode: 'VT-318490',
    createdAt: '2026-03-25 08:50:15',
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
  },
  {
    id: 'ord_7',
    orderCode: 'VT-762145',
    createdAt: '2026-03-25 15:30:00',
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
  },
  {
    id: 'ord_8',
    orderCode: 'VT-420917',
    createdAt: '2026-03-26 12:10:00',
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
  },
  {
    id: 'ord_9',
    orderCode: 'VT-184562',
    createdAt: '2026-03-26 14:45:00',
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
  },
  {
    id: 'ord_10',
    orderCode: 'VT-953218',
    createdAt: '2026-03-26 16:20:00',
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
  },
];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  // Danh sách tài khoản đã đăng ký (lưu trữ cục bộ + đồng bộ MongoDB)
  const [registeredAccounts, setRegisteredAccounts] = useState<RegisteredAccount[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map<string, RegisteredAccount>();
          INITIAL_ACCOUNTS.forEach((acc) => map.set(acc.email.toLowerCase().trim(), acc));
          parsed.forEach((acc: RegisteredAccount) => {
            map.set(acc.email.toLowerCase().trim(), acc);
          });
          return Array.from(map.values()).map((acc: RegisteredAccount) => {
            if (acc.role === 'admin' || acc.email === 'admin@vietthangstore.vn') {
              return { ...acc, password: 'admin123' };
            }
            if (acc.password === 'password123') {
              return { ...acc, password: '123456' };
            }
            return acc;
          });
        }
      } catch (err) {
        console.error('Lỗi khi đọc tài khoản đăng ký:', err);
      }
    }
    return INITIAL_ACCOUNTS;
  });

  // Người dùng hiện tại đang đăng nhập
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Danh sách đơn hàng (lưu trữ cục bộ + đồng bộ MongoDB)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map<string, Order>();
          INITIAL_ORDERS.forEach((ord) => map.set(ord.orderCode, ord));
          parsed.forEach((ord: Order) => map.set(ord.orderCode, ord));
          return Array.from(map.values());
        }
      } catch {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(registeredAccounts));
  }, [registeredAccounts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  // Đồng bộ danh sách tài khoản 2 chiều với cơ sở dữ liệu MongoDB khi khởi chạy
  useEffect(() => {
    const syncUsersFromMongoDB = async () => {
      try {
        const mongoUsers = await apiService.getUsers();
        if (Array.isArray(mongoUsers) && mongoUsers.length > 0) {
          // 1. Đồng bộ từ MongoDB về Local
          setRegisteredAccounts((prev) => {
            const map = new Map<string, RegisteredAccount>();
            prev.forEach((acc) => map.set(acc.email.toLowerCase().trim(), acc));
            mongoUsers.forEach((u: any) => {
              const emailKey = u.email.toLowerCase().trim();
              if (!map.has(emailKey)) {
                map.set(emailKey, {
                  id: u.id || u._id,
                  name: u.name,
                  email: u.email,
                  phone: u.phone || '0988 123 456',
                  address: u.address || 'Việt Nam',
                  role: u.role || 'customer',
                  avatar: u.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(u.name)}`,
                  password: '******',
                });
              }
            });
            return Array.from(map.values());
          });

          // 2. Nếu trong máy người dùng có tài khoản đã đăng ký trước đó mà MongoDB chưa có, tự động đẩy lên MongoDB
          const mongoEmails = new Set(mongoUsers.map((u: any) => u.email.toLowerCase().trim()));
          for (const localAcc of registeredAccounts) {
            const key = localAcc.email.toLowerCase().trim();
            if (key && !mongoEmails.has(key) && localAcc.password && localAcc.password !== '******') {
              console.log('🔄 Đang đồng bộ tài khoản từ trình duyệt lên MongoDB:', localAcc.email);
              await apiService.register(localAcc.name, localAcc.email, localAcc.password, localAcc.phone, localAcc.address);
            }
          }
        }
      } catch (err) {
        console.warn('Chưa thể đồng bộ người dùng từ MongoDB:', err);
      }
    };

    const syncOrdersFromMongoDB = async () => {
      try {
        const mongoOrders = await apiService.getOrders();
        if (Array.isArray(mongoOrders) && mongoOrders.length > 0) {
          setOrders((prev) => {
            const map = new Map<string, Order>();
            prev.forEach((o) => map.set(o.orderCode, o));
            mongoOrders.forEach((o) => map.set(o.orderCode, o));
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn('Chưa thể đồng bộ đơn hàng từ MongoDB:', err);
      }
    };

    syncUsersFromMongoDB();
    syncOrdersFromMongoDB();
  }, []);

  const isAdmin = !!currentUser && currentUser.role === 'admin';

  /**
   * ĐĂNG KÝ TÀI KHOẢN MỚI
   * Phải đăng ký tài khoản với email, tên và mật khẩu hợp lệ mới được lưu trữ vào hệ thống.
   */
  const register = async (
    name: string,
    email: string,
    pass: string,
    phone?: string,
    address?: string,
    role?: 'customer' | 'admin'
  ): Promise<boolean> => {
    if (!name.trim() || !email.trim() || !pass.trim()) {
      showToast('Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu!', 'error');
      return false;
    }

    if (pass.length < 4) {
      showToast('Mật khẩu phải có tối thiểu 4 ký tự!', 'error');
      return false;
    }

    const trimmedEmail = email.toLowerCase().trim();

    // 1. Kiểm tra tài khoản đã tồn tại trong danh sách đã đăng ký hay chưa
    const existing = registeredAccounts.find(
      (acc) => acc.email.toLowerCase().trim() === trimmedEmail
    );

    if (existing) {
      showToast(
        `Email "${trimmedEmail}" đã được đăng ký tài khoản trước đó! Vui lòng chuyển sang tab Đăng nhập.`,
        'warning'
      );
      setAuthModalTab('login');
      return false;
    }

    // 2. Gửi lưu lên MongoDB Backend qua REST API
    const assignedRole = role || 'customer';
    const apiRes = await apiService.register(name.trim(), trimmedEmail, pass, phone, address, assignedRole);
    if (!apiRes.success && apiRes.message.includes('đã được sử dụng')) {
      showToast(apiRes.message, 'warning');
      setAuthModalTab('login');
      return false;
    }

    // 3. Lưu vào cơ sở dữ liệu tài khoản
    const newAccount: RegisteredAccount = {
      id: apiRes.user?.id || 'usr_' + Date.now(),
      name: name.trim(),
      email: trimmedEmail,
      password: pass,
      phone: phone?.trim() || '0988 123 456',
      address: address?.trim() || 'Hà Nội, Việt Nam',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`,
      role: assignedRole,
      createdAt: new Date().toISOString(),
    };

    setRegisteredAccounts((prev) => [newAccount, ...prev]);

    // Tự động đăng nhập người dùng vừa đăng ký
    const { password: _, ...userSafe } = newAccount;
    setCurrentUser(userSafe);
    setIsAuthModalOpen(false);
    
    if (apiRes.success) {
      showToast(
        `🎉 Đăng ký thành công! Tài khoản "${newAccount.name}" đã được lưu trên Database MongoDB!`,
        'success'
      );
    } else {
      showToast(
        `Đăng ký thành công! Hãy chạy "npm run server" để đồng bộ lên MongoDB.`,
        'success'
      );
    }
    return true;
  };

  /**
   * ĐĂNG NHẬP TÀI KHOẢN
   * BẮT BUỘC TÀI KHOẢN PHẢI TỒN TẠI VÀ ĐÚNG MẬT KHẨU MỚI CHO PHÉP ĐĂNG NHẬP!
   */
  const login = async (usernameOrEmail: string, pass: string): Promise<boolean> => {
    if (!usernameOrEmail.trim() || !pass) {
      showToast('Vui lòng nhập Email/Tài khoản và Mật khẩu!', 'error');
      return false;
    }

    const trimmed = usernameOrEmail.toLowerCase().trim();

    // 1. Thử xác thực với Backend API MongoDB trước (nếu backend đang chạy)
    const apiRes = await apiService.login(usernameOrEmail, pass);
    if (apiRes.success && apiRes.user) {
      setCurrentUser(apiRes.user);
      setIsAuthModalOpen(false);
      showToast(`Đăng nhập thành công! Chào mừng ${apiRes.user.name}`, 'success');
      return true;
    }

    // 2. Nếu API không phản hồi hoặc trả về không tìm thấy, kiểm tra trong kho tài khoản đã đăng ký (registeredAccounts)
    const foundUser = registeredAccounts.find((acc) => {
      const emailMatch = acc.email.toLowerCase().trim() === trimmed;
      const nameMatch = acc.name.toLowerCase().trim() === trimmed;
      const adminMatch = trimmed === 'admin' && acc.role === 'admin';
      return emailMatch || nameMatch || adminMatch;
    });

    // NẾU TÀI KHOẢN CHƯA ĐƯỢC ĐĂNG KÝ -> TỪ CHỐI ĐĂNG NHẬP VÀ BÁO LỖI RÕ RÀNG!
    if (!foundUser) {
      showToast(
        'Tài khoản không tồn tại! Vui lòng bấm "Đăng ký" tài khoản trước khi đăng nhập.',
        'error'
      );
      return false;
    }

    // KIỂM TRA MẬT KHẨU
    const validPasswords = [foundUser.password];
    // Cho phép thêm mật khẩu phụ cho tài khoản admin/demo
    if (foundUser.role === 'admin') {
      validPasswords.push('admin', 'admin123', '123456');
    }
    if (foundUser.email === 'demo@vietthangstore.vn') {
      validPasswords.push('demo', '123456');
    }

    if (!validPasswords.includes(pass)) {
      showToast('Mật khẩu không chính xác! Vui lòng thử lại.', 'error');
      return false;
    }

    // Đăng nhập thành công
    const { password: _, ...userSafe } = foundUser;
    setCurrentUser(userSafe);
    setIsAuthModalOpen(false);
    showToast(`Đăng nhập thành công! Chào mừng ${foundUser.name}`, 'success');
    return true;
  };

  /**
   * ĐĂNG NHẬP DÀNH CHO ADMIN
   */
  const loginAdmin = async (usernameOrEmail: string, pass: string): Promise<boolean> => {
    if (!usernameOrEmail.trim() || !pass) {
      showToast('Vui lòng nhập tài khoản và mật khẩu quản trị', 'error');
      return false;
    }

    const trimmed = usernameOrEmail.toLowerCase().trim();
    const adminUser = registeredAccounts.find((acc) => {
      const isRoleAdmin = acc.role === 'admin';
      const isMatch =
        acc.email.toLowerCase().trim() === trimmed ||
        trimmed === 'admin' ||
        trimmed === 'quantri';
      return isRoleAdmin && isMatch;
    });

    if (!adminUser) {
      showToast('Tài khoản quản trị không tồn tại!', 'error');
      return false;
    }

    const validPasswords = [adminUser.password, 'admin', 'admin123', '123456'];
    if (!validPasswords.includes(pass)) {
      showToast('Mật khẩu quản trị không chính xác!', 'error');
      return false;
    }

    const { password: _, ...safeAdmin } = adminUser;
    setCurrentUser(safeAdmin);
    setIsAuthModalOpen(false);
    showToast('Xác thực quyền Quản trị viên thành công!', 'success');
    return true;
  };

  const loginAdminDemo = () => {
    loginAdmin('admin', 'admin123');
  };

  const loginDemo = () => {
    login('demo@vietthangstore.vn', 'demo');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất khỏi tài khoản', 'info');
  };

  // Làm mới danh sách tài khoản từ MongoDB / Cục bộ
  const refreshAccounts = async () => {
    try {
      const mongoUsers = await apiService.getUsers();
      if (Array.isArray(mongoUsers) && mongoUsers.length > 0) {
        setRegisteredAccounts((prev) => {
          const map = new Map<string, RegisteredAccount>();
          prev.forEach((acc) => map.set(acc.email.toLowerCase().trim(), acc));
          mongoUsers.forEach((u: any) => {
            const emailKey = u.email.toLowerCase().trim();
            const existing = map.get(emailKey);
            map.set(emailKey, {
              id: u.id || u._id || existing?.id || 'usr_' + Date.now(),
              name: u.name,
              email: u.email,
              phone: u.phone || existing?.phone || '',
              address: u.address || existing?.address || '',
              role: u.role || existing?.role || 'customer',
              avatar: u.avatar || existing?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(u.name)}`,
              password: existing?.password || (u.role === 'admin' ? 'admin123' : '******'),
              createdAt: u.createdAt || existing?.createdAt || new Date().toISOString(),
            });
          });
          return Array.from(map.values());
        });
        showToast('Đã đồng bộ danh sách người dùng từ MongoDB!', 'success');
      } else {
        showToast('Đã tải lại danh sách tài khoản!', 'info');
      }
    } catch {
      showToast('Không thể kết nối máy chủ MongoDB', 'warning');
    }
  };

  // Thêm tài khoản mới từ Admin Dashboard
  const addNewAccount = async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role?: 'customer' | 'admin';
  }): Promise<{ success: boolean; message: string }> => {
    const trimmedEmail = userData.email.toLowerCase().trim();
    if (!userData.name.trim() || !trimmedEmail || !userData.password.trim()) {
      return { success: false, message: 'Vui lòng nhập đầy đủ họ tên, email và mật khẩu!' };
    }

    const existing = registeredAccounts.find(
      (acc) => acc.email.toLowerCase().trim() === trimmedEmail
    );
    if (existing) {
      return { success: false, message: `Email "${trimmedEmail}" đã tồn tại trong hệ thống!` };
    }

    const assignedRole = userData.role || 'customer';
    const apiRes = await apiService.register(
      userData.name.trim(),
      trimmedEmail,
      userData.password,
      userData.phone,
      userData.address,
      assignedRole
    );

    const newAcc: RegisteredAccount = {
      id: apiRes.user?.id || 'usr_' + Date.now(),
      name: userData.name.trim(),
      email: trimmedEmail,
      password: userData.password,
      phone: userData.phone?.trim() || '',
      address: userData.address?.trim() || '',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.name.trim())}`,
      role: assignedRole,
      createdAt: new Date().toISOString(),
    };

    setRegisteredAccounts((prev) => [newAcc, ...prev]);
    showToast(`Đã thêm thành công tài khoản "${newAcc.name}" (${assignedRole === 'admin' ? 'Quản trị viên' : 'Khách hàng'})!`, 'success');
    return { success: true, message: 'Thêm tài khoản thành công!' };
  };

  // Cập nhật thông tin tài khoản (đồng bộ MongoDB + LocalStorage)
  const updateAccount = async (
    idOrEmail: string,
    updates: {
      name: string;
      email: string;
      password?: string;
      phone?: string;
      address?: string;
      role?: 'customer' | 'admin';
    }
  ): Promise<{ success: boolean; message: string }> => {
    const trimmedEmail = updates.email.toLowerCase().trim();
    if (!updates.name.trim() || !trimmedEmail) {
      return { success: false, message: 'Vui lòng nhập đầy đủ họ tên và email!' };
    }

    // Kiểm tra trùng email với tài khoản khác
    const duplicate = registeredAccounts.find(
      (acc) =>
        acc.email.toLowerCase().trim() === trimmedEmail &&
        acc.id !== idOrEmail &&
        acc.email.toLowerCase().trim() !== idOrEmail.toLowerCase().trim()
    );
    if (duplicate) {
      return { success: false, message: `Email "${trimmedEmail}" đã được sử dụng bởi người dùng khác!` };
    }

    // 1. Gửi cập nhật lên backend API MongoDB
    try {
      await apiService.updateUser(idOrEmail, updates);
    } catch (err) {
      console.warn('Lỗi khi gọi API cập nhật người dùng:', err);
    }

    // 2. Cập nhật state registeredAccounts cục bộ
    setRegisteredAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === idOrEmail || acc.email.toLowerCase().trim() === idOrEmail.toLowerCase().trim()) {
          return {
            ...acc,
            name: updates.name.trim(),
            email: trimmedEmail,
            phone: updates.phone !== undefined ? updates.phone.trim() : acc.phone,
            address: updates.address !== undefined ? updates.address.trim() : acc.address,
            role: updates.role || acc.role,
            ...(updates.password && updates.password.trim() ? { password: updates.password.trim() } : {}),
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(updates.name.trim())}`,
          };
        }
        return acc;
      })
    );

    // 3. Nếu là người dùng đang đăng nhập, cập nhật lại currentUser
    if (
      currentUser &&
      (currentUser.id === idOrEmail || currentUser.email.toLowerCase().trim() === idOrEmail.toLowerCase().trim())
    ) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              name: updates.name.trim(),
              email: trimmedEmail,
              phone: updates.phone !== undefined ? updates.phone.trim() : prev.phone,
              address: updates.address !== undefined ? updates.address.trim() : prev.address,
              role: updates.role || prev.role,
              avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(updates.name.trim())}`,
            }
          : null
      );
    }

    showToast(`Đã lưu thay đổi cho người dùng "${updates.name}" thành công!`, 'success');
    return { success: true, message: 'Cập nhật thông tin thành công!' };
  };

  // Xóa tài khoản
  const deleteAccount = async (idOrEmail: string): Promise<boolean> => {
    const target = registeredAccounts.find(
      (acc) => acc.id === idOrEmail || acc.email.toLowerCase().trim() === idOrEmail.toLowerCase().trim()
    );

    if (target && currentUser && target.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim()) {
      showToast('Không thể xóa tài khoản Quản trị viên đang đăng nhập!', 'error');
      return false;
    }

    try {
      await apiService.deleteUser(target?.id || idOrEmail);
    } catch (err) {
      console.warn('Lỗi khi xóa qua API:', err);
    }

    setRegisteredAccounts((prev) =>
      prev.filter(
        (acc) => acc.id !== idOrEmail && acc.email.toLowerCase().trim() !== idOrEmail.toLowerCase().trim()
      )
    );

    showToast(`Đã xóa tài khoản "${target?.name || idOrEmail}" khỏi hệ thống!`, 'info');
    return true;
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId || order.orderCode === orderId) {
          return { ...order, status };
        }
        return order;
      })
    );
    apiService.updateOrderStatus(orderId, status).catch(() => {});
    showToast(`Đã cập nhật trạng thái đơn hàng #${orderId.slice(-6)}`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId && order.orderCode !== orderId));
    apiService.deleteOrder(orderId).catch(() => {});
    showToast(`Đã xóa đơn hàng #${orderId.slice(-6)}`, 'info');
  };

  const generateDemoOrder = () => {
    const demoId = 'ord_' + Date.now();
    const demoCode = 'VT-' + Math.floor(100000 + Math.random() * 900000);
    const demoOrder: Order = {
      id: demoId,
      orderCode: demoCode,
      createdAt: new Date().toLocaleString('vi-VN'),
      customer: {
        fullName: 'Nguyễn Văn Thắng',
        phone: '0912 345 678',
        address: 'Tòa nhà Landmark 81, TP. Hồ Chí Minh',
        note: 'Giao hàng giờ hành chính',
      },
      items: [
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
      subtotal: 389000,
      discountAmount: 0,
      shippingFee: 30000,
      total: 419000,
      paymentMethod: 'cod',
      status: 'pending',
    };
    setOrders((prev) => [demoOrder, ...prev]);
    showToast(`Đã tạo đơn hàng thử nghiệm ${demoCode}!`, 'success');
  };

  const openAuthModal = (defaultTab: 'login' | 'register' = 'login') => {
    setAuthModalTab(defaultTab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin,
        registeredAccounts,
        login,
        loginDemo,
        loginAdmin,
        loginAdminDemo,
        register,
        addNewAccount,
        updateAccount,
        deleteAccount,
        refreshAccounts,
        logout,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        generateDemoOrder,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalTab,
        isHistoryModalOpen,
        openHistoryModal,
        closeHistoryModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
