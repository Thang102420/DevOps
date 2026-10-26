import React, { useState } from 'react';
import { AdminOverview } from './AdminOverview';
import { AdminProductList } from './AdminProductList';
import { AdminOrderList } from './AdminOrderList';
import { AdminUserList } from './AdminUserList';
import { AdminSettings } from './AdminSettings';
import { AdminProductModal } from './AdminProductModal';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users,
  Settings, 
  ArrowLeft, 
  Store,
  LogOut
} from 'lucide-react';

interface AdminDashboardProps {
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders' | 'users' | 'settings'>('overview');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { addProduct } = useProducts();
  const { currentUser, logout } = useAuth();

  const handleAddProduct = (data: any) => {
    addProduct(data);
  };

  return (
    <div className="min-h-screen bg-beige-50 text-beige-900 flex flex-col font-sans">
      {/* Admin Top Header - Deep Warm Walnut Espresso */}
      <header className="sticky top-0 z-40 bg-[#241C16] text-[#FAF8F5] shadow-lg shadow-stone-900/10 border-b border-[#382C22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={onExit}
                className="p-2 rounded-xl bg-[#32271E] hover:bg-[#423429] text-beige-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold border border-[#44362B]"
                title="Quay lại giao diện cửa hàng"
              >
                <ArrowLeft className="w-4 h-4 text-beige-300" />
                <span className="hidden sm:inline">Về cửa hàng</span>
              </button>

              <div className="h-6 w-px bg-[#3E3126] hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#A3704C] to-[#C99E75] flex items-center justify-center text-white font-black text-sm shadow-sm">
                  VT
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base tracking-tight text-[#FAF8F5]">
                      VietThang Admin
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#382B21] text-[#D8B48D] border border-[#503E30]">
                      Studio
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
              <button
                onClick={() => setActiveAdminTab('overview')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'overview'
                    ? 'bg-[#A3704C] text-[#FAF8F5] shadow-sm font-bold'
                    : 'text-beige-300 hover:bg-[#342921] hover:text-[#FAF8F5]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tổng quan</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('products')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'products'
                    ? 'bg-[#A3704C] text-[#FAF8F5] shadow-sm font-bold'
                    : 'text-beige-300 hover:bg-[#342921] hover:text-[#FAF8F5]'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Sản phẩm</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('orders')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'orders'
                    ? 'bg-[#A3704C] text-[#FAF8F5] shadow-sm font-bold'
                    : 'text-beige-300 hover:bg-[#342921] hover:text-[#FAF8F5]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Đơn hàng</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('users')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'users'
                    ? 'bg-[#A3704C] text-[#FAF8F5] shadow-sm font-bold'
                    : 'text-beige-300 hover:bg-[#342921] hover:text-[#FAF8F5]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Người dùng</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'settings'
                    ? 'bg-[#A3704C] text-[#FAF8F5] shadow-sm font-bold'
                    : 'text-beige-300 hover:bg-[#342921] hover:text-[#FAF8F5]'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dữ liệu</span>
              </button>
            </nav>

            {/* Right actions: Store link & Admin user */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onExit}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#A3704C] to-[#8E5E36] hover:from-[#8E5E36] hover:to-[#744825] text-white text-xs font-semibold shadow-sm transition-all border border-[#B8855F]/30"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Xem Cửa Hàng</span>
              </button>

              {/* Admin profile & logout */}
              <div className="flex items-center gap-2 pl-2 border-l border-[#3E3126]">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-[#C99E75]/70"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#A3704C] text-white font-bold text-xs flex items-center justify-center">
                    A
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-beige-100 leading-tight max-w-[100px] truncate">
                    {currentUser?.name || 'Admin'}
                  </p>
                  <span className="text-[10px] text-[#D8B48D] font-semibold block leading-none">
                    Quản trị viên
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-beige-400 hover:text-rose-400 hover:bg-[#32271E] rounded-lg transition-colors ml-1"
                  title="Đăng xuất khỏi tài khoản Quản trị"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeAdminTab === 'overview' && (
          <AdminOverview
            onNavigateTab={(tab) => setActiveAdminTab(tab)}
            onOpenCreateProduct={() => setIsCreateModalOpen(true)}
          />
        )}

        {activeAdminTab === 'products' && <AdminProductList />}

        {activeAdminTab === 'orders' && <AdminOrderList />}

        {activeAdminTab === 'users' && <AdminUserList />}

        {activeAdminTab === 'settings' && <AdminSettings />}
      </main>

      {/* Quick Add Product Modal from Overview */}
      <AdminProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};
