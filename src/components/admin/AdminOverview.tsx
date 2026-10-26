import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/products';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  AlertTriangle, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  Plus,
  Users
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigateTab: (tab: 'products' | 'orders' | 'users' | 'settings') => void;
  onOpenCreateProduct: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  onNavigateTab,
  onOpenCreateProduct,
}) => {
  const { products } = useProducts();
  const { orders, registeredAccounts } = useAuth();

  // Thống kê
  const totalRevenue = orders.reduce((sum, ord) => {
    if (ord.status !== 'cancelled') {
      return sum + ord.total;
    }
    return sum;
  }, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const outOfStockCount = products.filter((p) => !p.inStock || p.stockCount <= 0).length;
  const featuredCount = products.filter((p) => p.isFeatured).length;

  // Tính số lượng theo danh mục
  const categoryStats = CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
    const count = products.filter((p) => p.category === cat.id).length;
    const percentage = products.length > 0 ? Math.round((count / products.length) * 100) : 0;
    return {
      id: cat.id,
      name: cat.name,
      count,
      percentage,
    };
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner / Welcome - Luxury Warm Espresso & Cognac Theme */}
      <div className="bg-gradient-to-r from-[#2A1D15] via-[#432F20] to-[#67442A] rounded-3xl p-6 sm:p-8 text-[#FAF8F5] shadow-xl relative overflow-hidden border border-[#523A28]/50">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-72 h-72 rounded-full bg-[#C99E75]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-3 border border-white/15 text-[#EFE7DE]">
            <TrendingUp className="w-3.5 h-3.5 text-[#D8B48D]" />
            <span>Hệ thống Quản trị Doanh nghiệp Offline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            VietThang Studio Admin Dashboard
          </h2>
          <p className="text-beige-200 text-xs sm:text-sm mt-2 leading-relaxed">
            Theo dõi tình hình kinh doanh, quản lý kho thời trang và xử lý đơn hàng nhanh chóng. 
            Mọi thay đổi đều được lưu bền vững trên trình duyệt này.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={onOpenCreateProduct}
              className="px-4 py-2.5 bg-[#FAF8F5] text-[#3A2617] font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-white transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 text-[#A3704C]" />
              <span>Thêm sản phẩm mới</span>
            </button>
            <button
              onClick={() => onNavigateTab('orders')}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-[#FAF8F5] font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-md transition-all flex items-center gap-2 border border-white/10"
            >
              <ShoppingBag className="w-4 h-4 text-[#D8B48D]" />
              <span>Xem danh sách đơn ({orders.length})</span>
            </button>
            <button
              onClick={() => onNavigateTab('users')}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-[#FAF8F5] font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-md transition-all flex items-center gap-2 border border-white/10"
            >
              <Users className="w-4 h-4 text-[#E6C29E]" />
              <span>Quản lý người dùng ({registeredAccounts.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards - Warm Beige & Sand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doanh thu */}
        <div className="bg-[#FDFCF9] p-5 rounded-3xl border border-[#EBE3D5] shadow-sm flex items-center justify-between group hover:border-[#D4C3AC] transition-all">
          <div>
            <p className="text-xs font-semibold text-[#A98D71] uppercase tracking-wider">Doanh thu dự tính</p>
            <h3 className="text-xl sm:text-2xl font-black text-[#2D2117] mt-1">
              {totalRevenue.toLocaleString('vi-VN')}₫
            </h3>
            <p className="text-[11px] text-[#587346] font-semibold mt-1 flex items-center gap-1">
              <span>{orders.length} đơn hàng đã ghi nhận</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#EFF5EB] text-[#587346] flex items-center justify-center font-bold border border-[#D5E3CC]">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Đơn hàng */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-[#FDFCF9] p-5 rounded-3xl border border-[#EBE3D5] shadow-sm flex items-center justify-between cursor-pointer group hover:border-[#D4C3AC] transition-all"
        >
          <div>
            <p className="text-xs font-semibold text-[#A98D71] uppercase tracking-wider">Tổng đơn hàng</p>
            <h3 className="text-xl sm:text-2xl font-black text-[#2D2117] mt-1">
              {orders.length}
            </h3>
            <p className="text-[11px] text-[#A3704C] font-semibold mt-1">
              {pendingOrdersCount > 0 ? `Có ${pendingOrdersCount} đơn cần xác nhận` : 'Tất cả đơn đã được xử lý'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#A3704C] flex items-center justify-center font-bold border border-[#E8DFD1]">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Sản phẩm trong kho */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-[#FDFCF9] p-5 rounded-3xl border border-[#EBE3D5] shadow-sm flex items-center justify-between cursor-pointer group hover:border-[#D4C3AC] transition-all"
        >
          <div>
            <p className="text-xs font-semibold text-[#A98D71] uppercase tracking-wider">Sản phẩm thời trang</p>
            <h3 className="text-xl sm:text-2xl font-black text-[#2D2117] mt-1">
              {products.length}
            </h3>
            <p className="text-[11px] text-[#71553E] font-medium mt-1">
              {products.length - outOfStockCount} sản phẩm còn hàng
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#71553E] flex items-center justify-center font-bold border border-[#E8DFD1]">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Cảnh báo tồn kho */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-[#FDFCF9] p-5 rounded-3xl border border-[#EBE3D5] shadow-sm flex items-center justify-between cursor-pointer group hover:border-[#D4C3AC] transition-all"
        >
          <div>
            <p className="text-xs font-semibold text-[#A98D71] uppercase tracking-wider">Hết hàng / Nổi bật</p>
            <h3 className="text-xl sm:text-2xl font-black text-[#2D2117] mt-1">
              {outOfStockCount} <span className="text-xs text-[#A98D71] font-normal">hết</span> / {featuredCount} <span className="text-xs text-[#A3704C] font-normal">hot</span>
            </h3>
            <p className="text-[11px] text-[#71553E] font-medium mt-1">
              {outOfStockCount > 0 ? 'Cần bổ sung nguồn cung' : 'Kho hàng dồi dào'}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold border ${
            outOfStockCount > 0 ? 'bg-[#FAF0ED] text-[#A84A3B] border-[#F2D1CA]' : 'bg-[#FBF6EE] text-[#C4976E] border-[#EAD7C0]'
          }`}>
            {outOfStockCount > 0 ? <AlertTriangle className="w-6 h-6" /> : <Sparkles className="w-6 h-6 text-[#A3704C]" />}
          </div>
        </div>
      </div>

      {/* Phân bổ danh mục & Đơn gần đây */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phân bổ danh mục */}
        <div className="bg-[#FDFCF9] p-5 sm:p-6 rounded-3xl border border-[#EBE3D5] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#2D2117]">Phân loại theo danh mục</h3>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-bold text-[#A3704C] hover:text-[#8E5E36] flex items-center gap-0.5"
            >
              Xem tất cả <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {categoryStats.map((cat) => (
              <div key={cat.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#523C2A] font-semibold">{cat.name}</span>
                  <span className="text-[#71553E]">{cat.count} SP ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-[#EBE3D5] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#C4976E] to-[#A3704C] h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Đơn hàng gần đây */}
        <div className="lg:col-span-2 bg-[#FDFCF9] p-5 sm:p-6 rounded-3xl border border-[#EBE3D5] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#2D2117]">Đơn hàng mới nhất</h3>
              <p className="text-xs text-[#71553E]">Các đơn hàng được đặt gần đây nhất</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-[#A3704C] hover:text-[#8E5E36] flex items-center gap-0.5"
            >
              Quản lý đơn <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A98D71]">
              Chưa có đơn hàng nào được ghi nhận. Bạn có thể tạo đơn hàng mẫu trong tab Đơn hàng.
            </div>
          ) : (
            <div className="divide-y divide-[#F0EAE0]">
              {orders.slice(0, 4).map((order) => (
                <div key={order.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] flex items-center justify-center text-[#523C2A] font-mono font-bold text-xs border border-[#E8DFD1]">
                      #{order.orderCode.slice(-4)}
                    </div>
                    <div>
                      <p className="font-bold text-[#2D2117] text-xs sm:text-sm">
                        {order.customer.fullName}
                      </p>
                      <p className="text-[11px] text-[#71553E]">
                        {order.items.length} món • {order.paymentMethod === 'vietqr' ? 'VietQR' : 'COD'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-[#2D2117] text-xs sm:text-sm">
                      {order.total.toLocaleString('vi-VN')}₫
                    </p>
                    <span className="inline-block text-[10px] font-bold text-[#8E7055] uppercase bg-[#FAF5EB] border border-[#E8DFD1] px-2 py-0.5 rounded-full mt-0.5">
                      {order.status === 'confirmed' ? 'Đã xác nhận' : order.status === 'shipping' ? 'Đang giao' : order.status === 'delivered' ? 'Đã giao' : 'Chờ xử lý'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
