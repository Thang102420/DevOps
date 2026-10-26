import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// User Login (Admin or Customer)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tài khoản/email và mật khẩu' });
    }

    const trimmed = email.toLowerCase().trim();

    // Tìm kiếm theo email, tên đăng nhập hoặc role admin
    const user = await User.findOne({
      $or: [
        { email: trimmed },
        { name: new RegExp(`^${trimmed}$`, 'i') },
        ...(trimmed === 'admin' ? [{ role: 'admin' }] : []),
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Tài khoản không tồn tại. Vui lòng đăng ký tài khoản trước khi đăng nhập!',
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!',
      });
    }

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi đăng nhập hệ thống', error: error.message });
  }
});

// User Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu' });
    }

    const trimmedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc sử dụng email khác!',
      });
    }

    const newUser = new User({
      name: name.trim(),
      email: trimmedEmail,
      password,
      phone: phone || '',
      address: address || '',
      role: 'customer',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`,
    });

    await newUser.save();
    console.log(`\n======================================================`);
    console.log(`👤 [MongoDB LIVE] ĐÃ LƯU TÀI KHOẢN MỚI VÀO DATABASE MONGODB!`);
    console.log(`   - ID: ${newUser._id}`);
    console.log(`   - Tên: ${newUser.name}`);
    console.log(`   - Email: ${newUser.email}`);
    console.log(`   - Điện thoại: ${newUser.phone || 'Chưa cung cấp'}`);
    console.log(`   - Địa chỉ: ${newUser.address || 'Chưa cung cấp'}`);
    console.log(`   - Thời gian: ${new Date().toLocaleString('vi-VN')}`);
    console.log(`======================================================\n`);

    res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công! Tài khoản đã được lưu vào MongoDB database.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    console.error('❌ [MongoDB Error] Lỗi khi lưu tài khoản vào database:', error.message);
    res.status(400).json({ success: false, message: 'Lỗi đăng ký tài khoản trên database', error: error.message });
  }
});

// GET all registered users from MongoDB (for Admin and verifying database records)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      total: users.length,
      data: users.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        address: u.address,
        role: u.role,
        avatar: u.avatar,
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi đọc danh sách tài khoản từ MongoDB', error: error.message });
  }
});

// DELETE a user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: 'Đã xóa tài khoản khỏi database' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi xóa tài khoản', error: error.message });
  }
});

export default router;
