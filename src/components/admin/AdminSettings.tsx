import React, { useRef, useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  RotateCcw, 
  Download, 
  Upload, 
  Info,
  Database,
  RefreshCw,
  Server,
  CheckCircle2,
  Terminal
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { products, resetToDefault, importProducts, dbStatus, checkDbStatus, seedMongoDb, isLoading } = useProducts();
  const { orders } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedMongo = async () => {
    if (window.confirm('Bạn có chắc chắn muốn nạp 36 sản phẩm mẫu vào cơ sở dữ liệu MongoDB?')) {
      setIsSeeding(true);
      await seedMongoDb();
      setIsSeeding(false);
    }
  };

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
          <h2 className="text-xl font-extrabold text-slate-900">Quản Lý Cơ Sở Dữ Liệu & Hệ Thống</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cấu hình kết nối MongoDB, nạp dữ liệu mẫu ban đầu và xuất nhập file sao lưu.
          </p>
        </div>

        <button
          onClick={() => checkDbStatus()}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Kiểm tra trạng thái CSDL</span>
        </button>
      </div>

      {/* MongoDB Database Status Card */}
      <div className={`p-5 rounded-3xl border transition-all ${
        dbStatus.connected
          ? 'bg-emerald-50/70 border-emerald-300'
          : 'bg-blue-50/70 border-blue-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              dbStatus.connected ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-slate-900 text-base">Cơ sở dữ liệu MongoDB</h4>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  dbStatus.connected
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {dbStatus.connected ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Đang kết nối MongoDB trực tiếp</span>
                    </>
                  ) : (
                    <>
                      <Info className="w-3 h-3 text-blue-600" />
                      <span>Chế độ CSDL Nội bộ (Sẵn sàng 36 SP)</span>
                    </>
                  )}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                {dbStatus.connected
                  ? `Backend API và MongoDB đang trực tuyến. Đã nạp ${dbStatus.productsCount} sản phẩm từ cơ sở dữ liệu MongoDB.`
                  : 'Trang web đang chạy trên bộ nhớ đệm (Local Storage) với đầy đủ 36 sản phẩm thiết kế. Bạn có thể bật Backend Server MongoDB bất kỳ lúc nào.'}
              </p>
            </div>
          </div>

          {/* Seed MongoDB Button */}
          <button
            onClick={handleSeedMongo}
            disabled={isSeeding || isLoading}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            <span>{isSeeding ? 'Đang nạp MongoDB...' : 'Nạp 36 sản phẩm vào MongoDB'}</span>
          </button>
        </div>

        {/* Instructions banner */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-200/60">
            <Server className="w-4 h-4 text-blue-600 shrink-0" />
            <span><strong>Chạy API Server:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">npm run server</code></span>
          </div>
          <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-200/60">
            <Terminal className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Nạp CSDL nhanh:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">npm run seed</code></span>
          </div>
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
