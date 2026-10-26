import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Tên sản phẩm là bắt buộc'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['all', 'men', 'women', 'pants', 'sport', 'outerwear', 'accessories'],
    },
    categoryName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: function () {
        return this.price;
      },
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 50,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    highlights: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL'],
    },
    colors: {
      type: [String],
      default: ['Đen', 'Trắng'],
    },
    material: {
      type: String,
      default: 'Chất liệu cao cấp',
    },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
