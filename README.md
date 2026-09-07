# 🚀 VietThang Store - Frontend E-Commerce & DevOps CI/CD Pipeline

Dự án Website Bán Hàng Trực Tuyến chuyên kinh doanh thiết bị công nghệ (Điện thoại, Laptop, Phụ kiện, Âm thanh, Smart Home) với chuẩn SPA cao cấp, kết hợp quy trình tự động hóa **DevOps CI/CD** hoàn chỉnh: **Docker Multi-stage**, **GitHub Actions** và Deploy lên **Render (Free Tier)**.

---

## 🌟 1. Công Nghệ Sử Dụng

### Frontend
- **Core**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **State Management**: React Context API (`CartContext`, `AuthContext`, `ToastContext`)
- **SEO & Social Share**: Đầy đủ thẻ OpenGraph (`og:title`, `og:description`, `og:image`, `og:type`) & Twitter Card tối ưu hiển thị đẹp mắt khi chia sẻ qua Zalo, Facebook, Telegram.

### DevOps & Tự Động Hóa
- **Containerization**: Dockerfile Multi-stage (`node:20-alpine` build sang `nginx:alpine` siêu nhẹ chỉ ~25MB).
- **Web Server**: Nginx cấu hình chuẩn SPA (`try_files $uri $uri/ /index.html;`), nén dữ liệu `gzip` và cache tài nguyên tĩnh.
- **Cổng Lắng Nghe**: Cổng `3000` (khớp hoàn hảo với tiêu chuẩn Web Service trên Render).
- **Orchestration**: `docker-compose.yml` hỗ trợ chạy container nhanh chóng ở máy cục bộ.
- **CI/CD Pipeline**: GitHub Actions (`.github/workflows/deploy.yml`) tự động build và push image lên Docker Hub với 2 tag `latest` và `${{ github.sha }}` mỗi khi push lên nhánh `main`.

---

## 🛍️ 2. Tính Năng Giao Diện (UI/UX)

1. **Thanh điều hướng (Navigation)**:
   - **Sản phẩm**: Danh mục Điện thoại, Laptop, Phụ kiện, Âm thanh, Smart Home; tìm kiếm real-time; lọc còn hàng; sắp xếp giá & đánh giá.
   - **Giới thiệu shop**: Câu chuyện thương hiệu VietThang Store, 4 cam kết vàng (100% Chính hãng, Đổi trả 30 ngày, Bảo hành 24 tháng, Hỗ trợ trọn đời), số liệu uy tín.
   - **Liên hệ**: Thông tin hotline mua hàng 1900 8888, hotline kỹ thuật 24/7, showroom Hà Nội & TP. HCM, form gửi thắc mắc trực tuyến.
2. **Thẻ sản phẩm & Modal chi tiết**:
   - Ảnh công nghệ sắc nét, nhãn giảm giá (Sale off %), số sao & lượt đánh giá, trạng thái kho hàng.
   - Modal hiển thị **Bảng thông số kỹ thuật chi tiết** (CPU, RAM, Màn hình, Pin, Camera, v.v.).
3. **Giỏ hàng trượt (Cart Drawer)**:
   - Tăng/giảm số lượng, xóa món, tính tạm tính, phí ship tự động.
   - Hỗ trợ nhập mã Voucher:
     - `VIETTHANG10`: Giảm ngay 10% tổng đơn.
     - `FREESHIP`: Miễn phí giao hàng cho đơn từ 1.000.000đ.
4. **Quy trình Thanh toán (Checkout)**:
   - Thu thập thông tin giao hàng có validation.
   - Phương thức thanh toán: **COD (Tiền mặt khi nhận hàng)** hoặc **Chuyển khoản VietQR** (tự động hiển thị mã QR kèm STK ngân hàng và mã đơn hàng).
   - Tự động sinh mã đơn chuẩn: `VT-XXXXXX`.
5. **Hệ thống Tài khoản & Lịch sử đơn hàng**:
   - Nút **"Đăng nhập nhanh với tài khoản Demo"** (1 click thử nghiệm ngay lập tức).
   - Toggle ẩn/hiện mật khẩu.
   - Lưu trữ phiên đăng nhập và danh sách đơn hàng đã đặt trong `localStorage`.

---

## 💻 3. Hướng Dẫn Cài Đặt & Chạy Local

### Cách 1: Chạy trực tiếp bằng Node.js & Vite
```bash
# 1. Cài đặt các gói thư viện
npm install

# 2. Khởi động môi trường phát triển (Development)
npm run dev
```
Truy cập trình duyệt tại địa chỉ: `http://localhost:3000`

### Cách 2: Chạy thử nghiệm bằng Docker Compose
Yêu cầu máy tính đã cài đặt Docker Desktop.
```bash
# Build và khởi chạy container chạy nền
docker compose up -d --build

# Xem log container
docker compose logs -f

# Dừng container khi không dùng
docker compose down
```
Ứng dụng sẽ hoạt động tại: `http://localhost:3000`

---

## 🚢 4. Quy Trình CI/CD Tự Động Hóa Lên Docker Hub & Render

### Bước 1: Đẩy mã nguồn lên GitHub Repository của bạn
```bash
# Khởi tạo git và commit
git init
git add .
git commit -m "feat: complete VietThang Store with CI/CD Docker and Render setup"

# Đổi tên nhánh chính thành main
git branch -M main

# Liên kết với repository trên GitHub của bạn
git remote add origin https://github.com/<USERNAME-CUA-BAN>/vietthang-store.git

# Push code lên GitHub
git push -u origin main
```

---

### Bước 2: Tạo Access Token trên Docker Hub
1. Đăng nhập vào [Docker Hub](https://hub.dockercom/).
2. Nhấn vào Avatar góc phải trên cùng ➔ chọn **Account settings** ➔ chọn mục **Security**.
3. Bấm **New Access Token**:
   - **Description**: `github-actions-deploy`
   - **Access permissions**: chọn `Read, Write, Delete`.
4. Bấm **Generate** và sao chép lại chuỗi Token được cấp.

---

### Bước 3: Cấu hình GitHub Secrets
1. Truy cập vào Repository trên GitHub: `https://github.com/<USERNAME-CUA-BAN>/vietthang-store`.
2. Vào tab **Settings** ➔ chọn mục **Secrets and variables** ➔ chọn **Actions**.
3. Bấm nút **New repository secret** và thêm các biến sau:
   - `DOCKER_USERNAME`: Tên tài khoản Docker Hub của bạn (ví dụ: `vietthangdev`).
   - `DOCKER_PASSWORD`: Dán chuỗi Access Token vừa tạo ở Bước 2.
   - `RENDER_DEPLOY_HOOK_URL`: (Tùy chọn) URL Deploy Hook từ Render (lấy ở Bước 4 để tự động deploy khi có Docker image mới).

---

### Bước 4: Triển khai lên Render (Web Service Free Tier)

Render hỗ trợ triển khai Web Service miễn phí với Docker cực kỳ đơn giản:

#### 🔹 Cách A: Kết nối trực tiếp Repo GitHub với Dockerfile (Khuyên dùng)
1. Đăng nhập vào [Render Dashboard](https://dashboard.render.com/).
2. Bấm nút **New +** ➔ chọn **Web Service**.
3. Chọn **Build and deploy from a Git repository** ➔ Kết nối với repo `vietthang-store` của bạn.
4. Cấu hình thông tin dịch vụ:
   - **Name**: `vietthang-store`
   - **Region**: Singapore (hoặc gần Việt Nam nhất để có tốc độ tối ưu)
   - **Branch**: `main`
   - **Runtime**: Chọn **Docker**
   - **Instance Type**: Chọn gói **Free**
5. Trong phần **Advanced**:
   - Thêm biến môi trường (Environment Variable):
     - Key: `PORT`
     - Value: `3000`
6. Bấm nút **Create Web Service**. Render sẽ tự động kéo code về, kích hoạt `Dockerfile` multi-stage build và chạy Nginx trên cổng 3000. Bạn sẽ nhận được đường link website có dạng: `https://vietthang-store.onrender.com`.

#### 🔹 Cách B: Deploy bằng Docker Image từ Docker Hub
1. Tại Render Dashboard, bấm **New +** ➔ chọn **Web Service** ➔ chọn **Deploy an existing image from a registry**.
2. Nhập Image URL từ Docker Hub:
   `docker.io/<DOCKER_USERNAME>/vietthang-store:latest`
3. Cài đặt biến môi trường: `PORT=3000`.
4. Tại mục **Settings** của Web Service trên Render, kéo xuống tìm **Deploy Hook** ➔ sao chép URL Deploy Hook này và dán vào GitHub Secret `RENDER_DEPLOY_HOOK_URL`.
5. Từ lúc này, mỗi khi bạn push code lên GitHub `main`, GitHub Actions sẽ tự build Docker image và gọi Deploy Hook của Render để cập nhật website tức thì!

---

## 🔑 5. Tài Khoản Demo & Mã Ưu Đãi

- **Tài khoản Demo 1-Click**:
  - Tại giao diện, bấm **Đăng nhập** ➔ Chọn **"Đăng nhập nhanh với tài khoản Demo"**.
  - Tên: Nguyễn Văn Thắng (Demo)
  - Email: `demo@vietthangstore.vn`
- **Mã Giảm Giá**:
  - `VIETTHANG10`: Giảm 10% trên tổng đơn hàng.
  - `FREESHIP`: Miễn phí vận chuyển cho đơn từ 1.000.000đ.
  - `TECH500`: Giảm 500.000đ cho đơn hàng từ 10.000.000đ.

---

## 🛠️ 6. Cấu Trúc Thư Mục Dự Án

```
vietthang-store/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD tự động build & push Docker Hub, kích hoạt Render
├── public/
│   └── favicon.svg               # Logo thương hiệu VietThang Store
├── src/
│   ├── components/               # Các UI components
│   │   ├── AboutSection.tsx      # Giới thiệu shop & 4 cam kết vàng
│   │   ├── AuthModal.tsx         # Modal đăng nhập, đăng ký & demo 1-click
│   │   ├── Banner.tsx            # Hero banner & cam kết hỏa tốc
│   │   ├── CartDrawer.tsx        # Giỏ hàng trượt, mã giảm giá, tính tiền
│   │   ├── CheckoutModal.tsx     # Thanh toán COD & QR VietQR
│   │   ├── ContactSection.tsx     # Hotline, showroom & form tư vấn
│   │   ├── Footer.tsx            # Chân trang & chứng nhận
│   │   ├── Navbar.tsx            # Header điều hướng, tìm kiếm & giỏ hàng
│   │   ├── OrderHistoryModal.tsx # Lịch sử đơn hàng đã đặt
│   │   ├── OrderSuccessModal.tsx # Thông báo đặt hàng thành công
│   │   ├── ProductCard.tsx       # Thẻ sản phẩm công nghệ
│   │   ├── ProductDetailModal.tsx# Chi tiết & Bảng thông số kỹ thuật
│   │   ├── ProductList.tsx       # Danh mục, bộ lọc & tìm kiếm
│   │   └── Toast.tsx             # Thông báo nổi (Toast notifications)
│   ├── context/                  # React Contexts
│   │   ├── AuthContext.tsx       # Trạng thái đăng nhập & lịch sử đơn
│   │   ├── CartContext.tsx       # Quản lý giỏ hàng & voucher
│   │   └── ToastContext.tsx      # Quản lý thông báo toast
│   ├── data/
│   │   └── products.ts           # Dữ liệu sản phẩm, thông số & voucher
│   ├── types/
│   │   └── index.ts              # Định nghĩa Types TypeScript
│   ├── App.tsx                   # Giao diện chính SPA
│   ├── index.css                 # Tailwind CSS cấu hình
│   └── main.tsx                  # React DOM Root
├── .dockerignore                 # Tối ưu file khi build Docker
├── .gitignore                    # Loại bỏ node_modules, dist khỏi Git
├── docker-compose.yml            # Khởi chạy Docker ở môi trường local
├── Dockerfile                    # Multi-stage Dockerfile (Node 20 -> Nginx Alpine)
├── index.html                    # SEO & OpenGraph Meta Tags
├── nginx.conf                    # Nginx SPA fallback (port 3000, gzip)
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # Cấu hình PostCSS
├── tailwind.config.js            # Bảng màu thương hiệu VietThang Store
├── tsconfig.json                 # Cấu hình TypeScript
└── README.md                     # Tài liệu hướng dẫn toàn diện
```

---
*Chúc bạn triển khai dự án VietThang Store thành công rực rỡ!* 🎉
