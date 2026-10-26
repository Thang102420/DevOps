import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vietthang_fashion';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ [MongoDB] Kết nối thành công tới máy chủ: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [MongoDB] Chưa thể kết nối tới cơ sở dữ liệu: ${error.message}`);
    console.warn(`👉 Lưu ý: Backend vẫn chạy và sẵn sàng nhận kết nối khi MongoDB được khởi chạy hoặc cập nhật MONGODB_URI trong file server/.env`);
    return false;
  }
};
