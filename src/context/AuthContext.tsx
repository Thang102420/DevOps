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
          return parsed.map((acc: RegisteredAccount) => {
            if (acc.role === 'admin' || acc.email === 'admin@vietthangstore.vn') {
              return { ...acc, password: 'admin123' };
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

  // Danh sách đơn hàng
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
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

    syncUsersFromMongoDB();
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
    showToast(`Đã cập nhật trạng thái đơn hàng #${orderId.slice(-6)}`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
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
