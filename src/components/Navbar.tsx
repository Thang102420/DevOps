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
  ChevronDown,
  LayoutDashboard,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: 'products' | 'about' | 'contact' | 'admin';
  setActiveTab: (tab: 'products' | 'about' | 'contact' | 'admin') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  const { totalItems, setIsCartOpen, wishlistIds, setIsWishlistOpen } = useCart();
  const { currentUser, isAuthenticated, logout, openAuthModal, openHistoryModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: 'products' | 'about' | 'contact' | 'admin') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF9]/95 backdrop-blur-md border-b border-[#EBE3D5] shadow-sm transition-all">
      {/* Top announcement bar - Luxury Espresso & Cognac */}
      <div className="bg-[#241C16] text-[#E8DFD1] text-xs py-1.5 px-4 font-medium flex items-center justify-between gap-2 border-b border-[#3D2C20]">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C4976E] animate-pulse" />
            <span className="hidden sm:inline">Bộ sưu tập thời trang 2026: Nhập mã</span>
            <span className="bg-[#A3704C]/30 text-[#F5E2D0] border border-[#A3704C]/50 px-2 py-0.5 rounded font-mono font-bold">
              VIETTHANG10
            </span>
            <span>giảm 10% | Freeship từ 500k</span>
          </div>

          {/* Customer Service / Guarantee Badge */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#DDD1BF]">
            <span className="flex items-center gap-1 text-[#C4976E]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Đổi size miễn phí 30 ngày</span>
            </span>
            <span className="text-[#523C2A]">•</span>
            <span>Hotline: <strong className="text-[#FAF8F5] font-semibold">1900 8888</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 py-2 gap-3 sm:gap-6">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('products')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#241C16] via-[#71553E] to-[#A3704C] flex items-center justify-center text-[#FAF8F5] shadow-md shadow-[#71553E]/20 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl tracking-tighter">VT</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl text-[#2D2117] tracking-tight">
                  VietThang<span className="text-[#A3704C]">.Fashion</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F5EFE6] text-[#71553E] border border-[#E0D2C0] uppercase">
                  Designer
                </span>
              </div>
              <p className="text-[11px] text-[#71553E] font-medium hidden sm:block">
                Thời Trang Nam Nữ & Xu Hướng Giới Trẻ
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('products')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-[#F5EFE6] text-[#2D2117] font-bold border border-[#E0D2C0] shadow-sm'
                  : 'text-[#71553E] hover:text-[#2D2117] hover:bg-[#FAF8F5]'
              }`}
            >
              Bộ sưu tập
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-[#F5EFE6] text-[#2D2117] font-bold border border-[#E0D2C0] shadow-sm'
                  : 'text-[#71553E] hover:text-[#2D2117] hover:bg-[#FAF8F5]'
              }`}
            >
              Về thương hiệu
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'contact'
                  ? 'bg-[#F5EFE6] text-[#2D2117] font-bold border border-[#E0D2C0] shadow-sm'
                  : 'text-[#71553E] hover:text-[#2D2117] hover:bg-[#FAF8F5]'
              }`}
            >
              Liên hệ & Showroom
            </button>
          </nav>

          {/* Real-time search */}
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
                placeholder="Tìm sơ mi, polo, blazer, đầm dự tiệc..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#FAF8F5] border border-[#EBE3D5] text-sm text-[#2D2117] placeholder-[#A98D71] focus:outline-none focus:ring-2 focus:ring-[#A3704C]/30 focus:border-[#A3704C] focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-[#A98D71] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A98D71] hover:text-[#2D2117] p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action buttons: Wishlist, Cart & User */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl text-[#71553E] hover:text-[#9A4638] hover:bg-[#FBF0EE] transition-all group"
              aria-label="Danh sách yêu thích"
              title="Mục yêu thích"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#9A4638] text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow-sm">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl text-[#71553E] hover:text-[#A3704C] hover:bg-[#F5EFE6] transition-all group flex items-center gap-1.5"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#A3704C] to-[#8E5E36] text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-md animate-bounce">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
              <span className="hidden lg:inline text-xs font-semibold text-[#71553E] group-hover:text-[#A3704C]">
                Túi đồ
              </span>
            </button>

            {/* Auth Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {isAuthenticated && currentUser ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5EFE6] transition-all border border-[#EBE3D5]"
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-[#A3704C]"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#A3704C] text-[#FAF8F5] font-bold text-xs flex items-center justify-center">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-[#2D2117] max-w-[80px] sm:max-w-[110px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#A98D71]" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#FDFCF9] rounded-2xl shadow-xl border border-[#EBE3D5] p-2 z-50 animate-fade-in">
                      <div className="p-3 border-b border-[#F0EAE0]">
                        <p className="text-xs text-[#A98D71]">Tài khoản thành viên</p>
                        <p className="text-sm font-bold text-[#2D2117] truncate">{currentUser.name}</p>
                        <p className="text-xs text-[#A98D71] truncate">{currentUser.email}</p>
                      </div>

                      <div className="py-1">
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              handleNavClick('admin');
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-[#A3704C] bg-[#F5EFE6] hover:bg-[#EBE3D5] rounded-xl transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-[#A3704C]" />
                            <span>Trang Quản trị Shop</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            openHistoryModal();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-[#71553E] hover:bg-[#FAF8F5] hover:text-[#A3704C] rounded-xl transition-colors"
                        >
                          <PackageCheck className="w-4 h-4 text-[#A3704C]" />
                          <span>Đơn hàng thời trang của tôi</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-[#F0EAE0]">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#9A4638] hover:bg-[#FBF0EE] rounded-xl transition-colors"
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
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#A3704C] to-[#8E5E36] hover:from-[#B58058] hover:to-[#7A4B29] text-white text-xs sm:text-sm font-semibold shadow-sm shadow-[#A3704C]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#71553E] hover:text-[#2D2117] hover:bg-[#FAF8F5] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
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
              placeholder="Tìm sơ mi, polo, blazer, váy đầm..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FAF8F5] border border-[#EBE3D5] text-sm text-[#2D2117] placeholder-[#A98D71] focus:outline-none focus:ring-2 focus:ring-[#A3704C]/30 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-[#A98D71] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A98D71] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFCF9] border-t border-[#EBE3D5] px-4 pt-2 pb-4 space-y-1 animate-fade-in shadow-xl">
          <button
            onClick={() => handleNavClick('products')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'products' ? 'bg-[#F5EFE6] text-[#2D2117] font-bold border border-[#E0D2C0]' : 'text-[#71553E] hover:bg-[#FAF8F5]'
            }`}
          >
            Bộ sưu tập
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'about' ? 'bg-[#F5EFE6] text-[#2D2117] font-bold border border-[#E0D2C0]' : 'text-[#71553E] hover:bg-[#FAF8F5]'
            }`}
          >
            Về thương hiệu
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'contact' ? 'bg-[#F5EFE6] text-[#2D2117] font-bold border border-[#E0D2C0]' : 'text-[#71553E] hover:bg-[#FAF8F5]'
            }`}
          >
            Liên hệ & Showroom
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                activeTab === 'admin' ? 'bg-[#241C16] text-[#FAF8F5]' : 'text-[#A3704C] bg-[#F5EFE6] hover:bg-[#EBE3D5]'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-[#A3704C]" />
                <span>Trang Quản trị & MongoDB</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#A3704C] text-[#FAF8F5]">
                Admin
              </span>
            </button>
          )}
          {isAuthenticated && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openHistoryModal();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#71553E] hover:bg-[#FAF8F5] flex items-center gap-2"
            >
              <PackageCheck className="w-4 h-4 text-[#A3704C]" />
              <span>Đơn hàng của tôi</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
