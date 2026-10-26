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

    res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.',
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
    res.status(400).json({ success: false, message: 'Lỗi đăng ký tài khoản', error: error.message });
  }
});

export default router;
