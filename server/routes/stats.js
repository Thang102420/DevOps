import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    const usersCount = await User.countDocuments();

    const orders = await Order.find({ status: { $ne: 'cancelled' } });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const outOfStockCount = await Product.countDocuments({ inStock: false });

    res.json({
      success: true,
      data: {
        productsCount,
        ordersCount,
        usersCount,
        totalRevenue,
        outOfStockCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi tải thống kê', error: error.message });
  }
});

export default router;
