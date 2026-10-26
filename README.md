# 👗 VietThang Fashion - Website Thời Trang Cao Cấp (React + MongoDB + Node.js + Docker CI/CD)

Hệ thống Website Bán Hàng Trực Tuyến chuyên kinh doanh **Thời Trang Thiết Kế & Xu Hướng Giới Trẻ** (**VietThang Fashion**), kiến trúc chuẩn Fullstack hiện đại với:
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, Lucide Icons, Glassmorphism UI.
- **Backend**: Node.js, Express REST API, CORS.
- **Database**: **MongoDB (Mongoose ORM)** lưu trữ toàn bộ Danh mục sản phẩm, Đơn hàng, Người dùng và Mã voucher. Hỗ trợ cơ chế **Dual-Mode (MongoDB Live + Local Storage Fallback)** đảm bảo website hoạt động mượt mà cả khi offline hoặc khi kết nối MongoDB.
- **DevOps**: Docker Multi-stage, Docker Compose (MongoDB + Backend + Nginx), GitHub Actions CI/CD.

---

## ⚡ 1. HƯỚNG DẪN KHỞI CHẠY DỰ ÁN (QUICK START)

### Cách 1: Chạy Frontend + Backend MongoDB trên máy tính (Khuyên dùng)

#### Bước 1: Khởi chạy Backend API Server & MongoDB
Tùy chọn kết nối MongoDB trong file [server/.env](file:///e:/DevOps/DuanCICD/server/.env):
- Mặc định: `mongodb://127.0.0.1:27017/vietthang_fashion`
- Hoặc kết nối MongoDB Atlas (Cloud miễn phí): thay bằng chuỗi kết nối Atlas của bạn.

Mở Terminal 1 để chạy Backend API:
```bash
# Khởi chạy Express API Server (Cổng 5000)
npm run server
```

*(Tùy chọn)* Nạp nhanh 36 sản phẩm mẫu vào MongoDB:
```bash
npm run seed
```

#### Bước 2: Khởi chạy Frontend React (Vite)
Mở Terminal 2:
```bash
npm run dev
```
👉 Truy cập website tại: **`http://localhost:3000`**  
*(Vite đã được cấu hình tự động Proxy các lệnh `/api/*` tới Backend cổng 5000).*

---

### Cách 2: Chạy toàn bộ với Docker Compose (Khởi tạo tự động MongoDB 7.0 + API + Web)
Yêu cầu đã bật Docker Desktop:
```bash
# Khởi chạy 3 container: MongoDB + Backend API + Frontend Nginx
docker compose up -d --build

# Xem log hoạt động
docker compose logs -f

# Dừng hệ thống khi không sử dụng
docker compose down
```
👉 Truy cập ngay trên trình duyệt: **`http://localhost:3000`**  
👉 MongoDB tự động lưu trữ dữ liệu bền vững qua Docker Volume `mongo_data`.

---

## 🍃 2. KIẾN TRÚC CƠ SỞ DỮ LIỆU MONGODB

Toàn bộ mã nguồn cơ sở dữ liệu MongoDB nằm trong thư mục [`server/`](file:///e:/DevOps/DuanCICD/server/):

### Các Mongoose Schemas ([server/models/](file:///e:/DevOps/DuanCICD/server/models/)):
1. **`Product`**:
   - `id`: Mã định danh duy nhất (VD: `men-1`, `women-4`, `outer-2`...)
   - `name`: Tên sản phẩm thời trang thiết kế
   - `category`: `men` | `women` | `pants` | `sport` | `outerwear` | `accessories`
   - `categoryName`: Tên hiển thị danh mục
   - `price`, `originalPrice`, `discount` (%)
   - `rating`, `reviewsCount`
   - `image`, `images`: Danh sách ảnh lookbook góc chụp đa dạng
   - `inStock`, `stockCount`
   - `isFeatured`, `isNewArrival`
   - `material`, `sizes`, `colors`, `description`, `highlights`, `specs`
2. **`Order`**:
   - `orderCode`: Mã đơn (VD: `VT-829104`)
   - `customer`: Họ tên, số điện thoại, địa chỉ, ghi chú chiều cao cân nặng
   - `items`: Danh sách món đồ (kèm size, màu, đơn giá, số lượng)
   - `subtotal`, `discountAmount`, `shippingFee`, `total`
   - `paymentMethod`: `cod` (Nhận hàng kiểm tra thanh toán) hoặc `vietqr` (Chuyển khoản QR ngân hàng)
   - `status`: `pending` | `confirmed` | `shipping` | `delivered` | `cancelled`
3. **`User`**:
   - `name`, `email`, `password`, `phone`, `address`, `role`: `admin` | `customer`
4. **`Voucher`**:
   - `code`, `description`, `discountPercent`, `fixedDiscount`, `freeShip`, `minSpend`

### Danh Sách RESTful API Endpoints:
- `GET /api/health`: Kiểm tra trạng thái máy chủ & kết nối MongoDB.
- `GET /api/products`: Lấy danh sách sản phẩm (hỗ trợ lọc danh mục, từ khóa tìm kiếm, khoảng giá, sắp xếp).
- `GET /api/products/:id`: Xem chi tiết 1 sản phẩm.
- `POST /api/products`: Thêm sản phẩm mới (Admin).
- `PUT /api/products/:id`: Chỉnh sửa thông tin sản phẩm (Admin).
- `DELETE /api/products/:id`: Xóa sản phẩm khỏi MongoDB (Admin).
- `GET /api/orders` & `POST /api/orders`: Quản lý & đặt đơn hàng.
- `POST /api/auth/login` & `POST /api/auth/register`: Xác thực thành viên & Admin.
- `POST /api/seed`: Lệnh nạp 36 sản phẩm mẫu vào MongoDB trực tiếp từ giao diện Quản trị.
- `GET /api/stats`: Thống kê doanh thu, số lượng đơn hàng và tình trạng tồn kho.

---

## 🌟 3. TÍNH NĂNG GIAO DIỆN & DANH MỤC THỜI TRANG HIỆN ĐẠI

1. **Bộ Sưu Tập 36 Mẫu Thiết Kế Tuyển Chọn**:
   - 👕 **Thời trang Nam (6 mẫu)**: Sơ mi Oxford chống nhăn, Polo Pima Cotton, Áo thun Oversize typography, Blazer 1 lớp Hàn Quốc, Sơ mi đũi Linen cổ tàu, Áo len dệt kim vặn thừng.
   - 👗 **Thời trang Nữ (6 mẫu)**: Đầm dự tiệc lụa Mango cổ V, Blazer dáng rộng 2 hàng khuy, Set dạ Tweed tiểu thư Pháp, Croptop dệt kim gân, Sơ mi lụa tơ tằm thắt nơ, Đầm maxi voan tơ hoa nhí.
   - 👖 **Quần & Chân Váy (6 mẫu)**: Quần jeans nam denim raw 12.5 Oz, Quần âu co giãn 4 chiều, Chân váy xếp ly cạp cao kèm quần bảo hộ, Quần ống rộng Tencel, Quần chinos kaki slimfit, Quần jeans ống loe retro 90s.
   - 🏃‍♂️ **Đồ Thể Thao (6 mẫu)**: Bộ tập nam Pro-Dry siêu nhẹ, Áo Bra Yoga High-Support lưng đan chéo, Quần Legging Seamless nâng mông, Áo khoác gió kháng nước chống tia UV, Quần short chạy bộ 2 lớp có túi điện thoại, Áo gym tank top khoét nách sâu.
   - 🧥 **Áo Khoác & Giữ Nhiệt (6 mẫu)**: Áo măng tô dạ ép lông cừu dáng dài 110cm, Áo phao 90% lông vũ siêu nhẹ 250g, Áo cardigan len lông thỏ mềm như mây, Áo khoác da Biker phong trần, Áo Hoodie nỉ bông 380GSM, Áo Trench Coat kaki trượt nước.
   - 👜 **Phụ Kiện & Giày (6 mẫu)**: Thắt lưng da bò thật 100% khóa tự động, Kính mát phi công Polarized UV400, Túi kẹp nách da mềm Hobo Bag, Mũ lưỡi trai thêu logo 3D, Khăn lụa vuông Satin 70x70cm, Túi tote canvas mộc 12 Oz.

2. **Bộ Lọc Đa Tầng Thông Minh**:
   - Lọc theo danh mục kèm huy hiệu số lượng món.
   - Lọc theo 4 mức giá: *Tất cả*, *Dưới 300.000₫*, *300.000₫ - 600.000₫*, *Trên 600.000₫*.
   - Sắp xếp: *Phổ biến nhất*, *Mới nhất 2026*, *Giá tăng dần*, *Giá giảm dần*, *Đánh giá cao nhất*.
   - Công tắc chuyển đổi hiển thị lưới 4 cột / 3 cột linh hoạt.
   - Chỉ lọc sản phẩm còn hàng.

3. **Mục Yêu Thích (Wishlist)**:
   - Nút trái tim thả tim nhanh trên từng thẻ sản phẩm.
   - Drawer quản lý danh sách yêu thích, hỗ trợ "Thêm tất cả vào túi đồ" chỉ với 1 click.

4. **Túi Đồ & Thanh Tiến Độ Miễn Phí Vận Chuyển**:
   - Thanh tiến độ hiển thị trực quan số tiền cần mua thêm để đạt mốc **Freeship 500.000₫**.
   - Gợi ý mã giảm giá 1 chạm: `VIETTHANG10` (Giảm 10%), `FREESHIP` (Miễn phí ship), `FASHION50` (Giảm 50k), `WELCOME50` (Giảm 50k).

5. **Thanh Toán Tự Động VietQR & COD**:
   - Phương thức COD: Cho phép mở xem hàng & thử đồ trước khi trả tiền.
   - Phương thức Chuyển khoản VietQR: Tự động tạo mã QR chứa số tiền chuẩn xác, số tài khoản ngân hàng và mã đơn hàng `VT-XXXXXX`.

6. **Trang Quản Trị Hệ Thống (Admin Panel)**:
   - Thẻ hiển thị trực quan trạng thái kết nối MongoDB Live / Local Ready.
   - Nút **"Nạp 36 sản phẩm vào MongoDB"** tự động khởi tạo dữ liệu chỉ bằng 1 click.
   - Quản trị toàn diện: Thêm mới, sửa giá, ẩn hiện kho hàng, cập nhật trạng thái đơn hàng.

---

## 🔑 4. TÀI KHOẢN TRẢI NGHIỆM

- **Tài khoản Quản trị (Admin)**:
  - Email: `admin@vietthangstore.vn`
  - Mật khẩu: `admin123`
  - Đường dẫn nhanh: Truy cập hash `#admin` hoặc bấm nút *Trang quản trị* tại menu.
- **Tài khoản Khách hàng (Demo)**:
  - Email: `demo@vietthangstore.vn`
  - Mật khẩu: `demo`
- **Mã Voucher thử nghiệm**:
  - `VIETTHANG10` (Giảm 10%)
  - `FREESHIP` (Miễn phí ship)
  - `FASHION50` (Giảm 50k cho đơn từ 600k)
  - `WELCOME50` (Giảm 50k cho đơn từ 400k)

---
*VietThang Fashion - Tự hào thời trang Việt, phong cách định hình bản lĩnh!* ✨
