import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Voucher from '../models/Voucher.js';
import Order from '../models/Order.js';
import { PRODUCTS, USERS, VOUCHERS } from '../data/seedData.js';

const router = express.Router();

// Trigger full database seeding
router.post('/', async (req, res) => {
  try {
    // 1. Clear & Seed Products
    await Product.deleteMany({});
    const insertedProducts = await Product.insertMany(PRODUCTS);

    // 2. Clear & Seed Users
    await User.deleteMany({});
    const insertedUsers = await User.insertMany(USERS);

    // 3. Clear & Seed Vouchers
    await Voucher.deleteMany({});
    const insertedVouchers = await Voucher.insertMany(VOUCHERS);

    res.json({
      success: true,
      message: `Đã nạp thành công ${insertedProducts.length} sản phẩm, ${insertedUsers.length} tài khoản, ${insertedVouchers.length} mã voucher vào MongoDB!`,
      productsCount: insertedProducts.length,
      usersCount: insertedUsers.length,
      vouchersCount: insertedVouchers.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ success: false, message: 'Lỗi nạp dữ liệu vào MongoDB', error: error.message });
  }
});

export default router;
