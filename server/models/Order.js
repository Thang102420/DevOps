import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
  selectedSize: { type: String },
  selectedColor: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String },
      note: { type: String },
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cod', 'vietqr'],
      default: 'cod',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
