import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  UserCheck,
  ShieldAlert,
  Search,
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminUserList: React.FC = () => {
  const { registeredAccounts, currentUser, deleteAccount, addNewAccount, updateAccount, refreshAccounts } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'admin'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Add Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'customer' as 'customer' | 'admin',
  });
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Edit Form state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'customer' as 'customer' | 'admin',
  });
  const [editFormError, setEditFormError] = useState('');
  const [editFormSubmitting, setEditFormSubmitting] = useState(false);

  // Statistics
  const totalUsers = registeredAccounts.length;
  const totalCustomers = registeredAccounts.filter((u) => u.role !== 'admin').length;
  const totalAdmins = registeredAccounts.filter((u) => u.role === 'admin').length;

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return registeredAccounts.filter((user) => {
      // Role filter
      if (roleFilter === 'customer' && user.role === 'admin') return false;
      if (roleFilter === 'admin' && user.role !== 'admin') return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = user.name.toLowerCase().includes(query);
        const matchEmail = user.email.toLowerCase().includes(query);
        const matchPhone = user.phone ? user.phone.toLowerCase().includes(query) : false;
        const matchAddress = user.address ? user.address.toLowerCase().includes(query) : false;
        return matchName || matchEmail || matchPhone || matchAddress;
      }

      return true;
    });
  }, [registeredAccounts, roleFilter, searchQuery]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshAccounts();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      role: 'customer',
    });
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setFormError('Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu');
      return;
    }

    if (formData.password.length < 4) {
      setFormError('Mật khẩu phải chứa tối thiểu 4 ký tự');
      return;
    }

    setFormSubmitting(true);
    const res = await addNewAccount(formData);
    setFormSubmitting(false);

    if (res.success) {
      setIsAddModalOpen(false);
    } else {
      setFormError(res.message);
    }
  };

  const handleOpenEditModal = (user: any) => {
    setEditingUserId(user.id || user.email);
    setEditFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      phone: user.phone || '',
      address: user.address || '',
      role: user.role === 'admin' ? 'admin' : 'customer',
    });
    setEditFormError('');
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditFormError('');

    if (!editFormData.name.trim() || !editFormData.email.trim()) {
      setEditFormError('Vui lòng điền đầy đủ Họ tên và Email');
      return;
    }

    if (editFormData.password && editFormData.password.length < 4) {
      setEditFormError('Mật khẩu mới nếu đặt lại phải chứa tối thiểu 4 ký tự');
      return;
    }

    if (!editingUserId) return;

    setEditFormSubmitting(true);
    const res = await updateAccount(editingUserId, {
      name: editFormData.name.trim(),
      email: editFormData.email.trim(),
      phone: editFormData.phone.trim(),
      address: editFormData.address.trim(),
      role: editFormData.role,
      ...(editFormData.password.trim() ? { password: editFormData.password.trim() } : {}),
    });
    setEditFormSubmitting(false);

    if (res.success) {
      setIsEditModalOpen(false);
      setEditingUserId(null);
    } else {
      setEditFormError(res.message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteAccount(userId);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Top Header Card - Warm Beige Theme */}
      <div className="bg-[#FDFCF9] rounded-3xl p-6 sm:p-7 shadow-sm border border-[#EBE3D5] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-9 h-9 rounded-2xl bg-[#F5EFE6] text-[#A3704C] flex items-center justify-center border border-[#E8DFD1]">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#2D2117] tracking-tight">
              Quản Lý Người Dùng & Khách Hàng
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EFF5EB] text-[#587346] border border-[#D5E3CC]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#587346] animate-pulse" />
              Đồng bộ MongoDB
            </span>
          </div>
          <p className="text-sm text-[#71553E]">
            Xem và quản trị danh sách người dùng đã đăng ký mua hàng hoặc tài khoản phân quyền quản trị.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2.5 rounded-2xl border border-[#DDD1BF] hover:border-[#A3704C] bg-white hover:bg-[#FAF8F5] text-[#523C2A] text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            title="Tải lại dữ liệu mới nhất"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#8E7055] ${isRefreshing ? 'animate-spin text-[#A3704C]' : ''}`} />
            <span>Làm mới</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#A3704C] to-[#8E5E36] hover:from-[#8E5E36] hover:to-[#744825] text-[#FAF8F5] text-xs font-bold transition-all shadow-md shadow-[#A3704C]/20 flex items-center gap-2 border border-[#B8855F]/30"
          >
            <Plus className="w-4 h-4 text-[#F5EFE6]" />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* KPI Cards - Warm Beige Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Total */}
        <div className="bg-[#FDFCF9] p-5 rounded-3xl border border-[#EBE3D5] shadow-sm flex items-center justify-between group hover:border-[#D4C3AC] transition-all">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A98D71] block mb-1">
              Tổng số tài khoản
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#2D2117]">{totalUsers}</span>
              <span className="text-xs text-[#71553E] font-medium">thành viên</span>
            </div>
            <p className="text-[11px] text-[#8E7055] mt-1">Được lưu trên MongoDB & Local</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#A3704C] flex items-center justify-center border border-[#E8DFD1]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Customers */}
        <div className="bg-[#FDFCF9] p-5 rounded-3xl border border-[#EBE3D5] shadow-sm flex items-center justify-between group hover:border-[#D4C3AC] transition-all">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A98D71] block mb-1">
              Khách hàng mua sắm
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#587346]">{totalCustomers}</span>
              <span className="text-xs text-[#71553E] font-medium">khách hàng</span>
            </div>
            <p className="text-[11px] text-[#587346] font-semibold mt-1">Có thể đặt hàng & xem lịch sử</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#EFF5EB] text-[#587346] flex items-center justify-center border border-[#D5E3CC]">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Admins */}
        <div className="bg-[#FDFCF9] p-5 rounded-3xl border border-[#EBE3D5] shadow-sm flex items-center justify-between group hover:border-[#D4C3AC] transition-all">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A98D71] block mb-1">
              Quản trị viên (Admin)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#8E7055]">{totalAdmins}</span>
              <span className="text-xs text-[#71553E] font-medium">quản trị</span>
            </div>
            <p className="text-[11px] text-[#8E7055] font-semibold mt-1">Toàn quyền cấu hình & kho</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#71553E] flex items-center justify-center border border-[#E8DFD1]">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Card - Warm Beige */}
      <div className="bg-[#FDFCF9] rounded-3xl border border-[#EBE3D5] shadow-sm overflow-hidden">
        {/* Controls: Search and Filters */}
        <div className="p-4 sm:p-6 border-b border-[#F0EAE0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#A98D71] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-[#DDD1BF] focus:border-[#A3704C] focus:bg-white text-xs sm:text-sm text-[#2D2117] outline-none transition-all placeholder:text-[#A98D71]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A98D71] hover:text-[#523C2A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F5F0E6] rounded-2xl shrink-0 self-start sm:self-auto border border-[#E8DFD1]">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === 'all'
                  ? 'bg-[#A3704C] text-[#FAF8F5] shadow-sm'
                  : 'text-[#71553E] hover:text-[#2D2117]'
              }`}
            >
              Tất cả ({totalUsers})
            </button>
            <button
              onClick={() => setRoleFilter('customer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === 'customer'
                  ? 'bg-[#587346] text-[#FAF8F5] shadow-sm'
                  : 'text-[#71553E] hover:text-[#2D2117]'
              }`}
            >
              Khách hàng ({totalCustomers})
            </button>
            <button
              onClick={() => setRoleFilter('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === 'admin'
                  ? 'bg-[#71553E] text-[#FAF8F5] shadow-sm'
                  : 'text-[#71553E] hover:text-[#2D2117]'
              }`}
            >
              Admin ({totalAdmins})
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-[#F5F0E6] text-[#A98D71] flex items-center justify-center mb-3 border border-[#E8DFD1]">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#2D2117]">Không tìm thấy tài khoản phù hợp</h3>
              <p className="text-xs text-[#71553E] mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? `Không có người dùng nào khớp với từ khóa "${searchQuery}". Hãy thử tìm kiếm bằng thông tin khác.`
                  : 'Chưa có tài khoản nào trong bộ lọc này.'}
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F0EAE0] bg-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider text-[#A98D71]">
                  <th className="py-3.5 px-4 sm:px-6">Thành viên</th>
                  <th className="py-3.5 px-4">Liên hệ & Email</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Địa chỉ</th>
                  <th className="py-3.5 px-4 text-center">Vai trò</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Thời gian</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE0] text-xs sm:text-sm">
                {filteredUsers.map((user) => {
                  const isCurrentAdmin =
                    currentUser && user.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim();
                  const isAdminRole = user.role === 'admin';

                  return (
                    <tr
                      key={user.id || user.email}
                      className="hover:bg-[#FAF8F5] transition-colors group"
                    >
                      {/* Avatar & Name */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              user.avatar ||
                              `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`
                            }
                            alt={user.name}
                            className={`w-9 h-9 rounded-2xl object-cover ring-2 ${
                              isAdminRole ? 'ring-[#C4976E]' : 'ring-[#DDD1BF]'
                            }`}
                          />
                          <div>
                            <div className="font-bold text-[#2D2117] flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isCurrentAdmin && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-[#F5EFE6] text-[#71553E] border border-[#E0D2C0]">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#A98D71] font-mono">
                              ID: {user.id ? user.id.slice(-6) : 'Local'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact & Email */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[#2D2117] font-medium">
                            <Mail className="w-3.5 h-3.5 text-[#A98D71]" />
                            <span className="font-mono text-xs">{user.email}</span>
                          </div>
                          {user.phone ? (
                            <div className="flex items-center gap-1.5 text-[#71553E] text-xs">
                              <Phone className="w-3.5 h-3.5 text-[#A98D71]" />
                              <span>{user.phone}</span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-[#A98D71] italic">Chưa có số ĐT</span>
                          )}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        {user.address ? (
                          <div className="flex items-start gap-1.5 text-[#523C2A] max-w-xs text-xs">
                            <MapPin className="w-3.5 h-3.5 text-[#A98D71] shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{user.address}</span>
                          </div>
                        ) : (
                          <span className="text-[#A98D71] italic text-xs">Chưa cập nhật</span>
                        )}
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {isAdminRole ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#F5EFE6] text-[#71553E] border border-[#E0D2C0]">
                            <ShieldAlert className="w-3 h-3 text-[#A3704C]" />
                            <span>Quản trị viên</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#EFF5EB] text-[#587346] border border-[#D5E3CC]">
                            <UserCheck className="w-3 h-3 text-[#587346]" />
                            <span>Khách hàng</span>
                          </span>
                        )}
                      </td>

                      {/* Registration Date */}
                      <td className="py-3.5 px-4 hidden lg:table-cell text-[#71553E] text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#A98D71]" />
                          <span>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString('vi-VN')
                              : 'Mặc định'}
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditModal(user)}
                            className="p-2 rounded-xl text-[#A3704C] hover:text-[#7A4B29] hover:bg-[#F5EFE6] transition-colors"
                            title="Chỉnh sửa thông tin"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {isCurrentAdmin ? (
                            <span className="text-[11px] font-semibold text-[#A98D71] italic px-1">
                              Đang đăng nhập
                            </span>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(user.id || user.email)}
                              className="p-2 rounded-xl text-[#A98D71] hover:text-[#9A4638] hover:bg-[#FBF0EE] transition-colors"
                              title="Xóa tài khoản này"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL: Thêm tài khoản mới */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241C16]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FDFCF9] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EBE3D5] relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5F0E6] text-[#A98D71] hover:text-[#2D2117] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#F5EFE6] text-[#A3704C] flex items-center justify-center border border-[#E8DFD1]">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2D2117]">Thêm Tài Khoản Mới</h3>
                <p className="text-xs text-[#71553E]">
                  Tạo tài khoản khách hàng hoặc cấp quyền Quản trị viên mới
                </p>
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-2xl bg-[#FBF0EE] border border-[#EED4CE] text-[#9A4638] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#523C2A] mb-1">
                  Họ và Tên <span className="text-[#9A4638]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#523C2A] mb-1">
                    Email đăng nhập <span className="text-[#9A4638]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#523C2A] mb-1">
                    Mật khẩu khởi tạo <span className="text-[#9A4638]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tối thiểu 4 ký tự"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#523C2A] mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#523C2A] mb-1">
                    Phân quyền vai trò <span className="text-[#9A4638]">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as 'customer' | 'admin' })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                  >
                    <option value="customer">Khách hàng (customer)</option>
                    <option value="admin">Quản trị viên (admin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#523C2A] mb-1">
                  Địa chỉ giao hàng mặc định
                </label>
                <input
                  type="text"
                  placeholder="Số nhà, đường phố, Quận/Huyện, Tỉnh/TP"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#F0EAE0]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-[#71553E] hover:bg-[#F5F0E6] text-xs font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#A3704C] hover:bg-[#8E5E36] text-[#FAF8F5] text-xs font-bold transition-all shadow-md shadow-[#A3704C]/20 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Tạo tài khoản</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Xác nhận xóa tài khoản */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241C16]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FDFCF9] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-[#EBE3D5] text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FBF0EE] text-[#9A4638] flex items-center justify-center mb-3 border border-[#EED4CE]">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#2D2117] mb-1">Xác nhận xóa tài khoản?</h3>
            <p className="text-xs text-[#71553E] mb-5 leading-relaxed">
              Hành động này sẽ xóa hoàn toàn tài khoản khỏi hệ thống và cơ sở dữ liệu MongoDB.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#DDD1BF] text-[#523C2A] hover:bg-[#FAF8F5] text-xs font-bold transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-[#9A4638] hover:bg-[#853B2F] text-white text-xs font-bold transition-all shadow-md shadow-[#9A4638]/20"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL: Chỉnh sửa thông tin người dùng */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241C16]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FDFCF9] w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#EBE3D5] text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EAE0]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#F5EFE6] text-[#A3704C] flex items-center justify-center border border-[#E8DFD1]">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#2D2117]">
                    Chỉnh Sửa Thông Tin Người Dùng
                  </h3>
                  <p className="text-xs text-[#71553E]">
                    Cập nhật hồ sơ tài khoản và đồng bộ trực tiếp lên MongoDB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl text-[#A98D71] hover:text-[#2D2117] hover:bg-[#F5F0E6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="mt-5 space-y-4 text-xs sm:text-sm">
              {editFormError && (
                <div className="p-3 rounded-2xl bg-[#FBF0EE] border border-[#EED4CE] text-[#9A4638] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-semibold">{editFormError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#523C2A] mb-1">
                    Họ và tên <span className="text-[#9A4638]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#523C2A] mb-1">
                    Email đăng nhập <span className="text-[#9A4638]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#523C2A] mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                    placeholder="0988 123 456"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#523C2A] mb-1">
                    Phân quyền tài khoản
                  </label>
                  <select
                    value={editFormData.role}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, role: e.target.value as 'customer' | 'admin' })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                  >
                    <option value="customer">Khách hàng (Customer)</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#523C2A] mb-1">
                  Địa chỉ giao hàng
                </label>
                <input
                  type="text"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                  placeholder="Số nhà, đường phố, quận/huyện, tỉnh/thành..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#523C2A] mb-1">
                  Đặt lại mật khẩu mới <span className="text-[#A98D71] font-normal">(Tùy chọn)</span>
                </label>
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD1BF] focus:border-[#A3704C] bg-white outline-none text-xs sm:text-sm text-[#2D2117]"
                  placeholder="Để trống nếu muốn giữ nguyên mật khẩu cũ"
                />
                <p className="text-[11px] text-[#A98D71] mt-1">
                  Chỉ nhập vào ô này nếu bạn muốn đổi sang mật khẩu mới cho người dùng.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#F0EAE0]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-[#71553E] hover:bg-[#F5F0E6] text-xs font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={editFormSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#A3704C] hover:bg-[#8E5E36] text-[#FAF8F5] text-xs font-bold transition-all shadow-md shadow-[#A3704C]/20 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {editFormSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
