import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { X, Eye, EyeOff, Lock, Mail, User, Phone, LogIn, UserPlus, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  onAdminLogin?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onAdminLogin }) => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, openAuthModal, login, register } = useAuth();
  const { showToast } = useToast();

  // Login form states
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register form states
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail.trim() || !password) {
      showToast('Vui lòng nhập tài khoản và mật khẩu', 'error');
      return;
    }

    setIsSubmitting(true);
    const trimmed = usernameOrEmail.trim().toLowerCase();
    const isAttemptAdmin =
      trimmed === 'admin' ||
      trimmed === 'admin@vietthangstore.vn' ||
      trimmed === 'admin@vietthang.vn' ||
      trimmed === 'quantri';

    const success = await login(usernameOrEmail, password);
    setIsSubmitting(false);

    if (success && isAttemptAdmin) {
      if (onAdminLogin) {
        onAdminLogin();
      }
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !registerEmail.trim() || !registerPassword) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc!', 'error');
      return;
    }

    if (registerPassword.length < 4) {
      showToast('Mật khẩu phải có tối thiểu 4 ký tự!', 'error');
      return;
    }

    if (registerPassword !== confirmPassword) {
      showToast('Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.', 'error');
      return;
    }

    setIsSubmitting(true);
    const success = await register(name, registerEmail, registerPassword, phone);
    setIsSubmitting(false);

    if (success) {
      setName('');
      setRegisterEmail('');
      setPhone('');
      setRegisterPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="p-6 pb-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/25">
            <span className="font-black text-xl tracking-tight">VT</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {authModalTab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Tài Khoản Mới'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {authModalTab === 'login' 
              ? 'Vui lòng đăng nhập với tài khoản bạn đã đăng ký' 
              : 'Tạo tài khoản để lưu lịch sử đơn hàng và nhận ưu đãi'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 px-6">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className={`flex-1 pb-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              authModalTab === 'login'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng nhập</span>
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('register')}
            className={`flex-1 pb-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              authModalTab === 'register'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Đăng ký mới</span>
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6">
          {authModalTab === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email hoặc Tên đăng nhập
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="email@cuaban.com hoặc admin..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Đang kiểm tra tài khoản...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Đăng nhập ngay</span>
                  </>
                )}
              </button>

              {/* Link to Register */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Bạn chưa có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => openAuthModal('register')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Đăng ký ngay tại đây
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn Thắng"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email đăng ký *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="email@cuaban.com"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0988 123 456"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Tối thiểu 4 ký tự"
                    className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Xác nhận mật khẩu *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đăng ký...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Hoàn tất đăng ký tài khoản</span>
                  </>
                )}
              </button>

              {/* Link to Login */}
              <div className="text-center pt-1.5">
                <p className="text-xs text-slate-500">
                  Đã có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Đăng nhập tại đây
                  </button>
                </p>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
