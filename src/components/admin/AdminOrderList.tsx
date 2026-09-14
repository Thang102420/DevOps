import React, { useState, useMemo } from 'react';
import { Order } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  Package, 
  Search, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Ban, 
  Sparkles, 
  X,
  Phone,
  MapPin,
  CreditCard
} from 'lucide-react';

export const AdminOrderList: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, generateDemoOrder } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchCode = order.orderCode.toLowerCase().includes(q);
        const matchName = order.customer.fullName.toLowerCase().includes(q);
        const matchPhone = order.customer.phone.includes(q);
        if (!matchCode && !matchName && !matchPhone) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Chờ xác nhận',
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <Clock className="w-3.5 h-3.5" />,
        };
      case 'confirmed':
        return {
          label: 'Đã xác nhận',
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        };
      case 'shipping':
        return {
          label: 'Đang giao hàng',
          color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: <Truck className="w-3.5 h-3.5" />,
        };
      case 'delivered':
        return {
          label: 'Giao thành công',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        };
      case 'cancelled':
        return {
          label: 'Đã hủy',
          color: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: <Ban className="w-3.5 h-3.5" />,
        };
      default:
        return {
          label: status,
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: <Package className="w-3.5 h-3.5" />,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quản lý Đơn hàng</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tổng cộng <strong className="text-slate-800">{orders.length}</strong> đơn ({filteredOrders.length} đang hiển thị)
          </p>
        </div>

        <button
          onClick={generateDemoOrder}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ Tạo đơn hàng mẫu thử</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã đơn (VD: DH...), tên khách, số điện thoại..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="shipping">Đang giao hàng</option>
          <option value="delivered">Giao thành công</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Package className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800">Chưa có đơn hàng nào</h4>
            <p className="text-xs text-slate-500 mt-1">
              Đơn hàng khách đặt hoặc đơn mẫu tạo ra sẽ xuất hiện tại đây
            </p>
            <button
              onClick={generateDemoOrder}
              className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-semibold transition-colors"
            >
              + Tạo ngay đơn hàng mẫu
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Mã đơn & Ngày</th>
                  <th className="py-3.5 px-4">Khách hàng</th>
                  <th className="py-3.5 px-4">Sản phẩm</th>
                  <th className="py-3.5 px-4">Tổng tiền</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Mã đơn & Ngày */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="font-bold text-slate-900 font-mono text-xs">
                          {order.orderCode}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </div>
                      </td>

                      {/* Khách hàng */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{order.customer.fullName}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{order.customer.phone}</span>
                        </div>
                      </td>

                      {/* Số món hàng */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-700">
                          {order.items.reduce((sum, it) => sum + it.quantity, 0)} món
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[160px]">
                          {order.items[0]?.productName}
                          {order.items.length > 1 ? ` (+${order.items.length - 1})` : ''}
                        </div>
                      </td>

                      {/* Tổng tiền & thanh toán */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {order.total.toLocaleString('vi-VN')}₫
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400">
                          {order.paymentMethod === 'vietqr' ? 'Chuyển khoản QR' : 'COD'}
                        </span>
                      </td>

                      {/* Trạng thái dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as Order['status'])
                          }
                          className={`text-xs font-semibold px-2.5 py-1 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${badge.color}`}
                        >
                          <option value="pending">Chờ xác nhận</option>
                          <option value="confirmed">Đã xác nhận</option>
                          <option value="shipping">Đang giao hàng</option>
                          <option value="delivered">Giao thành công</option>
                          <option value="cancelled">Đã hủy đơn</option>
                        </select>
                      </td>

                      {/* Thao tác */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Xem chi tiết đơn hàng"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(order.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Xóa đơn hàng"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col animate-fade-in my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Chi tiết đơn hàng
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-mono">
                  #{selectedOrder.orderCode}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
              {/* Khách hàng info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span>{selectedOrder.customer.fullName}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-blue-600">{selectedOrder.customer.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-600 text-xs">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{selectedOrder.customer.address}</span>
                </div>
                {selectedOrder.customer.note && (
                  <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded-xl">
                    <strong>Ghi chú:</strong> {selectedOrder.customer.note}
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Danh sách sản phẩm ({selectedOrder.items.length})
                </h4>
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-100 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-semibold text-slate-800 text-xs line-clamp-1">
                          {item.productName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Size: <strong className="text-slate-600">{item.selectedSize || 'Tiêu chuẩn'}</strong>
                          {item.selectedColor ? ` | Màu: ${item.selectedColor}` : ''}
                        </p>
                        <p className="text-xs font-bold text-blue-600 mt-0.5">
                          {item.price.toLocaleString('vi-VN')}₫ x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-xs">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing summary */}
              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tiền hàng:</span>
                  <span className="font-semibold">{selectedOrder.subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>Giảm giá:</span>
                    <span>-{selectedOrder.discountAmount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'Miễn phí' : `${selectedOrder.shippingFee.toLocaleString('vi-VN')}₫`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Tổng thanh toán:</span>
                  <span className="text-blue-600">{selectedOrder.total.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phương thức: <strong>{selectedOrder.paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : 'Thanh toán COD khi nhận hàng'}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Order Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Xác nhận xóa đơn hàng?</h3>
            <p className="text-xs text-slate-500 mt-2">
              Đơn hàng này sẽ bị xóa vĩnh viễn khỏi danh sách lưu offline.
            </p>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  deleteOrder(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-500/20"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
