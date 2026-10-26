import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Voucher from './models/Voucher.js';
import Order from './models/Order.js';
import { PRODUCTS, USERS, VOUCHERS } from './data/seedData.js';

dotenv.config();

const runSeed = async () => {
  console.log('⏳ Đang kết nối tới MongoDB để nạp dữ liệu...');
  const connected = await connectDB();

  if (!connected) {
    console.error('❌ Không thể kết nối MongoDB. Hãy kiểm tra MongoDB daemon hoặc MONGODB_URI trong file .env');
    process.exit(1);
  }

  try {
    console.log('🧹 Đang dọn dẹp các bộ sưu tập cũ...');
    await Product.deleteMany({});
    await User.deleteMany({});
    await Voucher.deleteMany({});
    await Order.deleteMany({});

    console.log(`🌱 Đang nạp ${PRODUCTS.length} sản phẩm thời trang cao cấp...`);
    await Product.insertMany(PRODUCTS);

    console.log(`👤 Đang nạp ${USERS.length} tài khoản người dùng và quản trị...`);
    await User.insertMany(USERS);

    console.log(`🎟️ Đang nạp ${VOUCHERS.length} mã giảm giá voucher...`);
    await Voucher.insertMany(VOUCHERS);

    console.log('\n=============================================================');
    console.log(`🎉 NẠP DỮ LIỆU MONGODB THÀNH CÔNG!`);
    console.log(`- Tổng sản phẩm: ${PRODUCTS.length} mẫu thiết kế`);
    console.log(`- Tài khoản Admin: admin@vietthangstore.vn / admin123`);
    console.log(`- Tài khoản Demo: demo@vietthangstore.vn / demo`);
    console.log(`- Vouchers: VIETTHANG10, FREESHIP, FASHION50, WELCOME50`);
    console.log('=============================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi trong quá trình nạp dữ liệu:', error);
    process.exit(1);
  }
};

runSeed();
