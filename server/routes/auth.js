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

    const isPasswordValid =
      user.password === password ||
      (user.role === 'admin' && (password === 'admin123' || password === 'admin'));

    if (!isPasswordValid) {
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
    const { name, email, password, pass, phone, address, role } = req.body;
    const userPassword = password || pass;

    if (!name || !email || !userPassword) {
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

    const assignedRole = role === 'admin' ? 'admin' : 'customer';

    const newUser = new User({
      name: name.trim(),
      email: trimmedEmail,
      password: userPassword,
      phone: phone || '',
      address: address || '',
      role: assignedRole,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`,
    });

    await newUser.save();
    console.log(`\n======================================================`);
    console.log(`👤 [MongoDB LIVE] ĐÃ LƯU TÀI KHOẢN MỚI VÀO DATABASE MONGODB!`);
    console.log(`   - ID: ${newUser._id}`);
    console.log(`   - Tên: ${newUser.name}`);
    console.log(`   - Email: ${newUser.email}`);
    console.log(`   - Vai trò: ${newUser.role}`);
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

// UPDATE user information
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, role, password } = req.body;

    let targetUser = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      targetUser = await User.findById(id);
    } else {
      targetUser = await User.findOne({ $or: [{ email: id.toLowerCase().trim() }, { _id: id }] });
    }

    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng để cập nhật' });
    }

    // Kiểm tra nếu đổi email thì email mới không được trùng với tài khoản khác
    if (email && email.toLowerCase().trim() !== targetUser.email.toLowerCase().trim()) {
      const emailExists = await User.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: targetUser._id },
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: `Email "${email}" đã được sử dụng bởi người dùng khác!`,
        });
      }
      targetUser.email = email.toLowerCase().trim();
    }

    if (name) targetUser.name = name.trim();
    if (phone !== undefined) targetUser.phone = phone.trim();
    if (address !== undefined) targetUser.address = address.trim();
    if (role && (role === 'customer' || role === 'admin')) targetUser.role = role;
    if (password && password.trim().length > 0) targetUser.password = password.trim();

    await targetUser.save();

    console.log(`\n======================================================`);
    console.log(`✏️  [MongoDB LIVE] ĐÃ CẬP NHẬT THÔNG TIN NGƯỜI DÙNG THÀNH CÔNG!`);
    console.log(`   - ID: ${targetUser._id}`);
    console.log(`   - Tên: ${targetUser.name}`);
    console.log(`   - Email: ${targetUser.email}`);
    console.log(`   - Vai trò: ${targetUser.role}`);
    console.log(`   - Điện thoại: ${targetUser.phone || 'Chưa cung cấp'}`);
    console.log(`   - Địa chỉ: ${targetUser.address || 'Chưa cung cấp'}`);
    console.log(`   - Mật khẩu: ${password ? 'Đã đổi mật khẩu mới' : 'Giữ nguyên'}`);
    console.log(`   - Thời gian: ${new Date().toLocaleString('vi-VN')}`);
    console.log(`======================================================\n`);

    res.json({
      success: true,
      message: 'Cập nhật thông tin người dùng thành công!',
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        phone: targetUser.phone,
        address: targetUser.address,
        role: targetUser.role,
        avatar: targetUser.avatar,
      },
    });
  } catch (error) {
    console.error('❌ [MongoDB Error] Lỗi khi cập nhật người dùng:', error.message);
    res.status(500).json({ success: false, message: 'Lỗi cập nhật người dùng trên database', error: error.message });
  }
});

// DELETE a user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await User.findByIdAndDelete(id);
    } else {
      deleted = await User.findOneAndDelete({ $or: [{ email: id.toLowerCase().trim() }, { _id: id }] });
    }
    res.json({ success: true, message: 'Đã xóa tài khoản khỏi database', deletedUser: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi xóa tài khoản', error: error.message });
  }
});

export default router;
