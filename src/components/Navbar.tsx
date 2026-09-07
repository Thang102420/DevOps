import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User as UserIcon, 
  Menu, 
  X, 
  Sparkles, 
  LogOut, 
  PackageCheck,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: 'products' | 'about' | 'contact';
  setActiveTab: (tab: 'products' | 'about' | 'contact') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { currentUser, isAuthenticated, logout, openAuthModal, openHistoryModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: 'products' | 'about' | 'contact') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top micro bar for announcements */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Khuyến mãi tháng này: Nhập mã <strong className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold text-amber-200">VIETTHANG10</strong> giảm ngay 10% cho mọi đơn hàng!</span>
        <span className="hidden md:inline">| Miễn phí ship đơn từ 5tr</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2 gap-3 sm:gap-6">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('products')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tighter">VT</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  VietThang<span className="text-blue-600 font-extrabold">.Store</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                  Official
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Công Nghệ Đỉnh Cao & Chính Hãng
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('products')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Sản phẩm
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Giới thiệu shop
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'contact'
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Liên hệ
            </button>
          </nav>

          {/* Search Bar - Real time */}
          <div className="flex-1 max-w-xs lg:max-w-md relative hidden sm:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'products') {
                    setActiveTab('products');
                  }
                }}
                placeholder="Tìm iPhone, MacBook, Sony,..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons: Cart & User Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 transition-all group flex items-center gap-2"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingBag className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-md animate-bounce">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
              <span className="hidden lg:inline text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                Giỏ hàng
              </span>
            </button>

            {/* User Auth Section */}
            <div className="relative" ref={dropdownRef}>
              {isAuthenticated && currentUser ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-all border border-slate-200"
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-slate-800 max-w-[80px] sm:max-w-[120px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
                      <div className="p-3 border-b border-slate-100">
                        <p className="text-xs text-slate-500">Tài khoản của bạn</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            openHistoryModal();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                        >
                          <PackageCheck className="w-4 h-4 text-blue-500" />
                          <span>Lịch sử đơn hàng</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'products') {
                  setActiveTab('products');
                }
              }}
              placeholder="Tìm điện thoại, laptop, phụ kiện..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1 animate-fade-in">
          <button
            onClick={() => handleNavClick('products')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Sản phẩm
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'about' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Giới thiệu shop
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'contact' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Liên hệ
          </button>
          {isAuthenticated && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openHistoryModal();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <PackageCheck className="w-4 h-4 text-blue-600" />
              <span>Lịch sử đơn hàng của tôi</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
