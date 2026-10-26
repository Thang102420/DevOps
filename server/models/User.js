import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
