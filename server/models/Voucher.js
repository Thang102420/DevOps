import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, required: true },
    discountPercent: { type: Number, default: 0 },
    fixedDiscount: { type: Number, default: 0 },
    freeShip: { type: Boolean, default: false },
    minSpend: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Voucher = mongoose.models.Voucher || mongoose.model('Voucher', voucherSchema);
export default Voucher;
