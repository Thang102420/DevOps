import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vietthang_fashion';

const TARGET_EMAILS = [
  'hoangduc.hn@gmail.com',
  'mailinh.tran89@gmail.com',
  'quanghuy.le@outlook.com',
  'thuhuong.pham@gmail.com',
  'longvu.designer@gmail.com',
  'haiyen.dang@gmail.com',
  'tuananh.bui95@gmail.com',
  'phuongthao.ngo@gmail.com',
  'giabao.do@gmail.com',
  'khanhlinh.ng@gmail.com'
];

async function updatePasswords() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const result = await User.updateMany(
      { email: { $in: TARGET_EMAILS } },
      { $set: { password: '123456' } }
    );

    console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

    const updatedUsers = await User.find({ email: { $in: TARGET_EMAILS } });
    console.log('\n--- Danh sách tài khoản đã đổi mật khẩu ---');
    updatedUsers.forEach((u, i) => {
      console.log(`${i + 1}. ${u.name} (${u.email}) -> Password: ${u.password}`);
    });

    await mongoose.disconnect();
    console.log('\nDone!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating passwords:', err);
    process.exit(1);
  }
}

updatePasswords();
