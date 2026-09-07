# ==========================================
# Stage 1: Build Frontend (Node.js 20 Alpine)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy source code and build project
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Serve with Nginx Alpine (Lightweight)
# ==========================================
FROM nginx:alpine AS runner

# Xóa cấu hình mặc định của Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copy cấu hình Nginx tối ưu cho React SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts từ Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Render thường sử dụng cổng 3000 hoặc biến môi trường PORT
EXPOSE 3000

# Chạy Nginx ở foreground
CMD ["nginx", "-g", "daemon off;"]
