import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  UserCheck,
  ShieldAlert,
  Search,
  Plus,
  Trash2,
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
  const { registeredAccounts, currentUser, deleteAccount, addNewAccount, refreshAccounts } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'admin'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state
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

  const handleDeleteUser = async (userId: string) => {
    await deleteAccount(userId);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              <span>Quản Lý Người Dùng & Khách Hàng</span>
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Đồng bộ dữ liệu
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Xem và quản trị danh sách người dùng đã đăng ký mua hàng hoặc tài khoản phân quyền quản trị.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            title="Tải lại dữ liệu mới nhất"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>Làm mới</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Total */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Tổng số tài khoản
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{totalUsers}</span>
              <span className="text-xs text-slate-500 font-medium">thành viên</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Được lưu trên MongoDB & Local</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Customers */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Khách hàng mua sắm
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-600">{totalCustomers}</span>
              <span className="text-xs text-slate-500 font-medium">khách hàng</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Có thể đặt hàng & xem lịch sử</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Admins */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Quản trị viên (Admin)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-purple-600">{totalAdmins}</span>
              <span className="text-xs text-slate-500 font-medium">quản trị</span>
            </div>
            <p className="text-[11px] text-purple-600 font-medium mt-1">Toàn quyền cấu hình & kho</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Controls: Search and Filters */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === 'all'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({totalUsers})
            </button>
            <button
              onClick={() => setRoleFilter('customer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === 'customer'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Khách hàng ({totalCustomers})
            </button>
            <button
              onClick={() => setRoleFilter('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === 'admin'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
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
              <div className="w-14 h-14 mx-auto rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-700">Không tìm thấy tài khoản phù hợp</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? `Không có người dùng nào khớp với từ khóa "${searchQuery}". Hãy thử tìm kiếm bằng thông tin khác.`
                  : 'Chưa có tài khoản nào trong bộ lọc này.'}
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 sm:px-6">Thành viên</th>
                  <th className="py-3.5 px-4">Liên hệ & Email</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Địa chỉ</th>
                  <th className="py-3.5 px-4 text-center">Vai trò</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Thời gian</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredUsers.map((user) => {
                  const isCurrentAdmin =
                    currentUser && user.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim();
                  const isAdminRole = user.role === 'admin';

                  return (
                    <tr
                      key={user.id || user.email}
                      className="hover:bg-slate-50/80 transition-colors group"
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
                              isAdminRole ? 'ring-purple-400/50' : 'ring-slate-200'
                            }`}
                          />
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isCurrentAdmin && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-blue-100 text-blue-700">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ID: {user.id ? user.id.slice(-6) : 'Local'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact & Email */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-mono text-xs">{user.email}</span>
                          </div>
                          {user.phone ? (
                            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{user.phone}</span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">Chưa có số ĐT</span>
                          )}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        {user.address ? (
                          <div className="flex items-start gap-1.5 text-slate-600 max-w-xs text-xs">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{user.address}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">Chưa cập nhật</span>
                        )}
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {isAdminRole ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            <ShieldAlert className="w-3 h-3" />
                            <span>Quản trị viên</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <UserCheck className="w-3 h-3" />
                            <span>Khách hàng</span>
                          </span>
                        )}
                      </td>

                      {/* Registration Date */}
                      <td className="py-3.5 px-4 hidden lg:table-cell text-slate-500 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString('vi-VN')
                              : 'Mặc định'}
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        {isCurrentAdmin ? (
                          <span className="text-[11px] font-semibold text-slate-400 italic">
                            Đang hoạt động
                          </span>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(user.id || user.email)}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Xóa tài khoản này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Thêm Tài Khoản Mới</h3>
                <p className="text-xs text-slate-500">
                  Tạo tài khoản khách hàng hoặc cấp quyền Quản trị viên mới
                </p>
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và Tên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email đăng nhập <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu khởi tạo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tối thiểu 4 ký tự"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phân quyền vai trò <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as 'customer' | 'admin' })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm text-slate-800 bg-white"
                  >
                    <option value="customer">Khách hàng (customer)</option>
                    <option value="admin">Quản trị viên (admin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa chỉ giao hàng mặc định
                </label>
                <input
                  type="text"
                  placeholder="Số nhà, đường phố, Quận/Huyện, Tỉnh/TP"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs sm:text-sm text-slate-800"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Xác nhận xóa tài khoản?</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Hành động này sẽ xóa hoàn toàn tài khoản khỏi hệ thống và cơ sở dữ liệu MongoDB.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-500/20"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
