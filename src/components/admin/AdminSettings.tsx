import React, { useRef } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  RotateCcw, 
  Download, 
  Upload
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { products, resetToDefault, importProducts } = useProducts();
  const { orders } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Xuất file JSON sao lưu
  const handleExportJSON = () => {
    const backupData = {
      store: 'VietThang Fashion',
      version: '2.0',
      exportedAt: new Date().toISOString(),
      products,
      orders,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `vietthang_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Đã xuất thành công file sao lưu dữ liệu JSON!', 'success');
  };

  // Nạp file JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.products && Array.isArray(parsed.products)) {
          importProducts(parsed.products);
        } else if (Array.isArray(parsed)) {
          importProducts(parsed);
        } else {
          showToast('Cấu trúc file JSON không hợp lệ!', 'error');
        }
      } catch {
        showToast('Lỗi khi đọc file JSON. Vui lòng kiểm tra lại định dạng.', 'error');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Quản Lý Dữ Liệu & Hệ Thống</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Xuất nhập bản sao lưu dữ liệu JSON và khôi phục kho hàng thời trang.
          </p>
        </div>
      </div>

      {/* Action Cards: Backup & Restore */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sao lưu JSON */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Xuất bản sao lưu dữ liệu (JSON)</h4>
            <p className="text-xs text-slate-500 mt-1">
              Tải toàn bộ {products.length} sản phẩm và {orders.length} đơn hàng về máy tính dưới dạng file JSON.
            </p>
          </div>
          <button
            onClick={handleExportJSON}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Tải về file JSON</span>
          </button>
        </div>

        {/* Nhập JSON */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Nạp dữ liệu từ file JSON</h4>
            <p className="text-xs text-slate-500 mt-1">
              Khôi phục hoặc nạp danh sách sản phẩm từ một file sao lưu JSON trước đó.
            </p>
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
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Chọn file JSON để nạp</span>
          </button>
        </div>
      </div>

      {/* Reset Section */}
      <div className="bg-white p-5 rounded-3xl border border-rose-200/80 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Khôi phục về 36 sản phẩm mẫu ban đầu</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Xóa các thay đổi thử nghiệm và đưa kho hàng về danh sách 36 sản phẩm thời trang thiết kế mẫu ban đầu.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ danh sách sản phẩm về 36 mẫu gốc?')) {
                resetToDefault();
              }
            }}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khôi phục 36 sản phẩm mẫu gốc</span>
          </button>
        </div>
      </div>
    </div>
  );
};
