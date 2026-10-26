import React, { useRef, useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { VOUCHERS } from '../../data/products';
import { 
  Database,
  Download, 
  Upload,
  FileSpreadsheet,
  RotateCcw, 
  Ticket,
  Copy,
  Check,
  Package,
  ShoppingBag,
  HardDrive,
  ShieldCheck,
  Store,
  Truck,
  PhoneCall,
  Sparkles,
  AlertTriangle,
  Trash2,
  RefreshCw,
  Layers
} from 'lucide-react';
import { apiService } from '../../services/api';

export const AdminSettings: React.FC = () => {
  const { products, resetToDefault, importProducts } = useProducts();
  const { orders } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [copiedVoucher, setCopiedVoucher] = useState<string | null>(null);
  const [isSeedingDb, setIsSeedingDb] = useState(false);

  // Tính dung lượng lưu trữ cục bộ
  const getStorageSize = () => {
    try {
      let total = 0;
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          total += (localStorage[key].length + key.length) * 2;
        }
      }
      return `${(total / 1024).toFixed(1)} KB`;
    } catch {
      return '120 KB';
    }
  };

  // 1. Xuất file JSON sao lưu toàn bộ
  const handleExportJSON = () => {
    const backupData = {
      store: 'VietThang Fashion Store',
      version: '2.5',
      exportedAt: new Date().toISOString(),
      summary: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalVouchers: VOUCHERS.length,
      },
      products,
      orders,
      vouchers: VOUCHERS,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `vietthang_backup_full_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Đã xuất thành công file sao lưu dữ liệu toàn diện (JSON)!', 'success');
  };

  // 2. Xuất file CSV danh sách sản phẩm (Mở bằng Excel tiếng Việt chuẩn)
  const handleExportProductsCSV = () => {
    if (products.length === 0) {
      showToast('Không có sản phẩm nào để xuất file!', 'warning');
      return;
    }

    const headers = ['Mã sản phẩm', 'Tên sản phẩm', 'Danh mục', 'Giá bán (VNĐ)', 'Giá gốc (VNĐ)', 'Tồn kho', 'Đánh giá', 'Đánh giá (Lượt)', 'Trạng thái'];
    const rows = products.map((p) => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.price,
      p.originalPrice,
      p.stockCount,
      p.rating,
      p.reviewsCount || 0,
      `"${p.inStock ? 'Còn hàng' : 'Hết hàng'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `vietthang_danh_sach_san_pham_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    showToast(`Đã xuất báo cáo ${products.length} sản phẩm ra file CSV thành công!`, 'success');
  };

  // 3. Xuất file CSV danh sách đơn hàng cho kế toán
  const handleExportOrdersCSV = () => {
    if (orders.length === 0) {
      showToast('Chưa có đơn hàng nào để xuất báo cáo!', 'warning');
      return;
    }

    const headers = ['Mã đơn hàng', 'Khách hàng', 'Số điện thoại', 'Địa chỉ giao hàng', 'Ngày đặt', 'Tổng tiền (VNĐ)', 'Phương thức thanh toán', 'Trạng thái'];
    const rows = orders.map((o) => [
      `"${o.orderCode || o.id}"`,
      `"${(o.customer?.fullName || '').replace(/"/g, '""')}"`,
      `"${o.customer?.phone || ''}"`,
      `"${(o.customer?.address || '').replace(/"/g, '""')}"`,
      `"${o.createdAt}"`,
      o.total,
      `"${o.paymentMethod.toUpperCase()}"`,
      `"${o.status === 'confirmed' ? 'Đã xác nhận' : o.status === 'shipping' ? 'Đang giao' : o.status === 'delivered' ? 'Đã giao' : 'Chờ xử lý'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `vietthang_bao_cao_don_hang_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    showToast(`Đã xuất báo cáo ${orders.length} đơn hàng ra file CSV thành công!`, 'success');
  };

  // 4. Nhập dữ liệu sản phẩm từ file JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.products && Array.isArray(parsed.products)) {
          importProducts(parsed.products);
          showToast(`Đã nạp thành công ${parsed.products.length} sản phẩm từ file sao lưu!`, 'success');
        } else if (Array.isArray(parsed)) {
          importProducts(parsed);
          showToast(`Đã nạp thành công ${parsed.length} sản phẩm vào kho hàng!`, 'success');
        } else {
          showToast('Cấu trúc file JSON không hợp lệ! Vui lòng kiểm tra lại.', 'error');
        }
      } catch {
        showToast('Lỗi khi đọc file JSON. Vui lòng kiểm tra lại định dạng tệp.', 'error');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 5. Nạp lại cơ sở dữ liệu mẫu từ MongoDB Server
  const handleSeedMongoDB = async () => {
    if (window.confirm('Hành động này sẽ tái thiết lập dữ liệu mẫu chuẩn (36 sản phẩm và 4 vouchers) trên cơ sở dữ liệu MongoDB. Bạn có muốn tiếp tục?')) {
      setIsSeedingDb(true);
      const res = await apiService.seedDatabase();
      setIsSeedingDb(false);
      if (res.success) {
        showToast(res.message || 'Nạp dữ liệu MongoDB thành công!', 'success');
        resetToDefault();
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  // 6. Xóa bộ nhớ đệm giỏ hàng tạm
  const handleClearCache = () => {
    if (window.confirm('Bạn có muốn dọn dẹp bộ nhớ đệm giỏ hàng và phiên làm việc tạm thời? (Dữ liệu sản phẩm và tài khoản vẫn được an toàn)')) {
      localStorage.removeItem('vietthang_cart_v2');
      localStorage.removeItem('vietthang_active_voucher');
      showToast('Đã dọn dẹp thành công bộ nhớ đệm giỏ hàng tạm!', 'success');
    }
  };

  // 7. Copy mã voucher
  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(code);
    showToast(`Đã sao chép mã voucher "${code}"!`, 'info');
    setTimeout(() => setCopiedVoucher(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl animate-fadeIn">
      {/* Title Header Card */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-600" />
              <span>Trung Tâm Dữ Liệu & Quản Trị Hệ Thống</span>
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Phiên bản v2.5
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Quản lý sao lưu dữ liệu, xuất báo cáo kho hàng & đơn hàng, theo dõi mã khuyến mãi và tối ưu vận hành.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Sao lưu nhanh (JSON)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards: Data Inventory */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Sản phẩm trong kho
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">{products.length}</span>
              <span className="text-xs text-slate-500 font-medium">sản phẩm</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">7 danh mục thời trang</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Đơn hàng lưu trữ
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">{orders.length}</span>
              <span className="text-xs text-slate-500 font-medium">đơn hàng</span>
            </div>
            <p className="text-[11px] text-indigo-600 font-medium mt-1">Lịch sử giao dịch</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Mã khuyến mãi
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">{VOUCHERS.length}</span>
              <span className="text-xs text-slate-500 font-medium">vouchers</span>
            </div>
            <p className="text-[11px] text-amber-600 font-medium mt-1">Đang kích hoạt</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Ticket className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Bộ nhớ LocalStorage
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">{getStorageSize()}</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Trạng thái tối ưu</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* SECTION 1: XUẤT BÁO CÁO & SAO LƯU DỮ LIỆU */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Sao Lưu Dữ Liệu & Xuất Báo Cáo Kinh Doanh</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tải dữ liệu về máy tính định dạng JSON hoặc CSV mở bằng Excel phục vụ kế toán, thống kê và kiểm kho.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card: Export JSON */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Download className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Bản sao lưu hệ thống (JSON)</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Chứa toàn bộ sản phẩm, đơn hàng và cấu hình để khôi phục khi cần thiết.
              </p>
            </div>
            <button
              onClick={handleExportJSON}
              className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file Backup JSON</span>
            </button>
          </div>

          {/* Card: Export Products CSV */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Báo cáo Kho Sản Phẩm (CSV)</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Xuất danh sách {products.length} sản phẩm kèm tồn kho, giá bán và danh mục cho thủ kho.
              </p>
            </div>
            <button
              onClick={handleExportProductsCSV}
              className="mt-4 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Xuất Excel/CSV Sản phẩm</span>
            </button>
          </div>

          {/* Card: Export Orders CSV */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Báo cáo Đơn Hàng (CSV)</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Xuất toàn bộ {orders.length} đơn hàng, khách mua, doanh thu và thanh toán cho kế toán.
              </p>
            </div>
            <button
              onClick={handleExportOrdersCSV}
              className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Xuất Excel/CSV Đơn hàng</span>
            </button>
          </div>
        </div>

        {/* Nạp dữ liệu JSON (Import) */}
        <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-slate-700 flex items-center justify-center shadow-sm shrink-0">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Nạp danh sách sản phẩm từ file JSON bên ngoài</h4>
              <p className="text-[11px] text-slate-500">Khôi phục hoặc cập nhật thêm sản phẩm vào hệ thống từ tệp dữ liệu đã sao lưu.</p>
            </div>
          </div>

          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleImportJSON}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-sm transition-all flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Chọn tệp JSON để nạp</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: QUẢN LÝ MÃ KHUYẾN MÃI & VOUCHERS */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-amber-500" />
              <span>Mã Giảm Giá & Voucher Đang Hoạt Động</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Các mã ưu đãi khách hàng có thể áp dụng tại giỏ hàng để nhận chiết khấu hoặc miễn phí vận chuyển.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            4 Mã kích hoạt
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {VOUCHERS.map((voucher) => (
            <div
              key={voucher.code}
              className="p-4 rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/40 hover:bg-amber-50/70 transition-all flex items-center justify-between gap-3 relative overflow-hidden"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-amber-900 px-2 py-0.5 bg-amber-100 rounded-lg border border-amber-300/60">
                    {voucher.code}
                  </span>
                  {voucher.freeShip && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                      Freeship
                    </span>
                  )}
                  {voucher.discountPercent > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                      -{voucher.discountPercent}%
                    </span>
                  )}
                  {voucher.fixedDiscount > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      -{voucher.fixedDiscount.toLocaleString('vi-VN')}₫
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 line-clamp-1">{voucher.description}</p>
                <p className="text-[10px] text-slate-400">
                  {voucher.minSpend > 0
                    ? `Áp dụng đơn từ: ${voucher.minSpend.toLocaleString('vi-VN')}₫`
                    : 'Áp dụng mọi giá trị đơn hàng'}
                </p>
              </div>

              <button
                onClick={() => handleCopyVoucher(voucher.code)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100/80 border border-amber-300 text-amber-800 text-xs font-bold transition-all shadow-sm flex items-center gap-1 shrink-0"
                title="Sao chép mã voucher"
              >
                {copiedVoucher === voucher.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: THÔNG TIN VẬN HÀNH & CHÍNH SÁCH */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Store className="w-4 h-4 text-indigo-600" />
            <span>Thông Tin Cửa Hàng & Quy Chuẩn Vận Hành</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Các thông số cấu hình mặc định áp dụng trên toàn bộ trải nghiệm mua sắm của khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2 text-indigo-700 font-bold">
              <Truck className="w-4 h-4" />
              <span>Phí Vận Chuyển Tiêu Chuẩn</span>
            </div>
            <p className="text-slate-800 font-bold text-sm">30.000₫ / đơn hàng</p>
            <p className="text-slate-500 text-[11px]">Tự động miễn phí vận chuyển cho các đơn hàng từ 500.000₫ trở lên.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Chính Sách Đổi Trả</span>
            </div>
            <p className="text-slate-800 font-bold text-sm">30 ngày đổi trả miễn phí</p>
            <p className="text-slate-500 text-[11px]">Áp dụng cho mọi sản phẩm còn nguyên tem mác trên toàn bộ hệ thống.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <PhoneCall className="w-4 h-4" />
              <span>Hotline & CSKH</span>
            </div>
            <p className="text-slate-800 font-bold text-sm font-mono">1900 888 999</p>
            <p className="text-slate-500 text-[11px]">Hỗ trợ giải đáp thắc mắc đơn hàng và sản phẩm từ 8:00 - 22:00 hàng ngày.</p>
          </div>
        </div>
      </div>

      {/* SECTION 4: BẢO TRÌ & KHÔI PHỤC HỆ THỐNG */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Khu Vực Bảo Trì & Khôi Phục Dữ Liệu</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Các tác vụ phục hồi cơ sở dữ liệu về nguyên bản hoặc làm sạch dữ liệu tạm khi cần thiết.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Nạp lại MongoDB */}
          <div className="p-4 rounded-2xl border border-indigo-200/80 bg-indigo-50/30 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5">
                <RefreshCw className={`w-4 h-4 ${isSeedingDb ? 'animate-spin' : ''}`} />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Tái nạp MongoDB chuẩn</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Ghi đè lại 36 sản phẩm thiết kế và 4 voucher mẫu chuẩn lên cơ sở dữ liệu MongoDB.
              </p>
            </div>
            <button
              onClick={handleSeedMongoDB}
              disabled={isSeedingDb}
              className="mt-3 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSeedingDb ? 'animate-spin' : ''}`} />
              <span>Nạp lại MongoDB</span>
            </button>
          </div>

          {/* Reset 36 sản phẩm gốc */}
          <div className="p-4 rounded-2xl border border-rose-200/80 bg-rose-50/30 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2.5">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Khôi phục 36 sản phẩm gốc</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Xóa các thay đổi sản phẩm thử nghiệm và hoàn nguyên về danh sách gốc của VietThang.
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ danh sách sản phẩm về 36 mẫu ban đầu?')) {
                  resetToDefault();
                  showToast('Đã khôi phục kho hàng về 36 sản phẩm gốc!', 'success');
                }
              }}
              className="mt-3 w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục 36 sản phẩm</span>
            </button>
          </div>

          {/* Dọn dẹp cache */}
          <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center mb-2.5">
                <Trash2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Dọn dẹp bộ nhớ đệm (Cache)</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Làm sạch giỏ hàng nháp và dữ liệu duyệt web tạm thời để tối ưu hiệu suất trình duyệt.
              </p>
            </div>
            <button
              onClick={handleClearCache}
              className="mt-3 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Dọn dẹp bộ nhớ đệm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
