import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';
import seedRoutes from './routes/seed.js';
import statsRoutes from './routes/stats.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Voucher from './models/Voucher.js';
import { PRODUCTS, USERS, VOUCHERS } from './data/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Auto-seed function if database is empty
const autoSeedIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('🌱 [MongoDB] Cơ sở dữ liệu đang trống. Đang tự động nạp 36 sản phẩm mẫu...');
      await Product.insertMany(PRODUCTS);
      await User.insertMany(USERS);
      await Voucher.insertMany(VOUCHERS);
      console.log('✅ [MongoDB] Đã tự động nạp dữ liệu mẫu ban đầu thành công!');
    } else {
      console.log(`📦 [MongoDB] Cơ sở dữ liệu hiện có ${count} sản phẩm sẵn sàng.`);
    }
  } catch (err) {
    console.warn('⚠️ [MongoDB] Không thể kiểm tra hoặc tự động nạp dữ liệu:', err.message);
  }
};

// API Health Check
app.get('/api/health', async (req, res) => {
  try {
    const isConnected = Product.db && Product.db.readyState === 1;
    let count = 0;
    if (isConnected) {
      count = await Product.countDocuments();
    }
    res.json({
      status: 'ok',
      service: 'vietthang-fashion-api',
      database: isConnected ? 'connected' : 'disconnected',
      productsCount: count,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.json({
      status: 'warning',
      database: 'disconnected',
      error: err.message,
    });
  }
});

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/stats', statsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send({
    message: '🚀 VietThang Fashion REST API Server is running!',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      orders: '/api/orders',
      auth: '/api/auth/login',
      seed: '/api/seed (POST)',
      stats: '/api/stats',
    },
  });
});

// Start Server
const startServer = async () => {
  const isDbConnected = await connectDB();
  if (isDbConnected) {
    await autoSeedIfEmpty();
  }

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 [VietThang API] Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`📡 [Health Check]: http://localhost:${PORT}/api/health`);
    console.log(`👗 [Products API]: http://localhost:${PORT}/api/products`);
    console.log(`======================================================\n`);
  });
};

startServer();
