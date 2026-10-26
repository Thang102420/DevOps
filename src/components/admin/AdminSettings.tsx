import React, { useRef, useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  RotateCcw, 
  Download, 
  Upload,
  Users,
  Shield,
  UserCheck,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { apiService } from '../../services/api';

export const AdminSettings: React.FC = () => {
  const { products, resetToDefault, importProducts } = useProducts();
  const { orders } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mongoUsers, setMongoUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Lấy danh sách tài khoản khách hàng
  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    const data = await apiService.getUsers();
    setMongoUsers(data);
    setIsLoadingUsers(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${name}"?`)) {
      const ok = await apiService.deleteUser(id);
      if (ok) {
        showToast(`Đã xóa tài khoản "${name}" thành công!`, 'success');
        fetchUsers();
      } else {
        showToast('Không thể xóa tài khoản. Vui lòng thử lại!', 'error');
      }
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
      {/* Title Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Quản Lý Khách Hàng & Hệ Thống</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý danh sách tài khoản thành viên, xuất nhập dữ liệu sao lưu và cài đặt kho hàng.
          </p>
        </div>
      </div>

      {/* Bảng Danh Sách Tài Khoản Khách Hàng (Đã bỏ chữ 'Trên Database MongoDB' trong tiêu đề) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm">
                  Danh Sách Tài Khoản Khách Hàng
                </h4>
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {mongoUsers.length} tài khoản
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Quản lý các tài khoản đã đăng ký trên hệ thống cửa hàng.
              </p>
            </div>
          </div>

          <button
            onClick={fetchUsers}
            disabled={isLoadingUsers}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingUsers ? 'animate-spin' : ''}`} />
            <span>Làm mới danh sách</span>
          </button>
        </div>

        {mongoUsers.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200/80">
                <tr>
                  <th className="py-2.5 px-3">Tài khoản & Họ tên</th>
                  <th className="py-2.5 px-3">Email (Đăng nhập)</th>
                  <th className="py-2.5 px-3">Số điện thoại</th>
                  <th className="py-2.5 px-3">Địa chỉ</th>
                  <th className="py-2.5 px-3">Vai trò</th>
                  <th className="py-2.5 px-3">Ngày đăng ký</th>
                  <th className="py-2.5 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {mongoUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={u.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(u.name)}`}
                          alt={u.name}
                          className="w-7 h-7 rounded-full bg-slate-100 object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-medium text-slate-800">
                      {u.email}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {u.phone || 'Chưa cập nhật'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 max-w-xs truncate" title={u.address}>
                      {u.address || 'Chưa cập nhật'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role === 'admin' ? (
                          <>
                            <Shield className="w-3 h-3 text-purple-600" />
                            <span>Quản trị viên</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3 h-3 text-emerald-600" />
                            <span>Khách hàng</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                      {u.createdAt ? new Date(u.createdAt).toLocaleString('vi-VN') : 'Mặc định'}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Xóa tài khoản này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200/60">
            Chưa có tài khoản nào được ghi nhận trên hệ thống.
          </div>
        )}
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
