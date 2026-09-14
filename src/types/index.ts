export type ProductCategory = 
  | 'all'
  | 'men'
  | 'women'
  | 'pants'
  | 'sport'
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage e.g. 15 for 15%
  rating: number; // e.g. 4.8
  reviewsCount: number;
  image: string;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  description: string;
  highlights: string[];
  sizes: string[];
  colors: string[];
  material: string;
  specs: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    note?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'cod' | 'vietqr';
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface ProductFormData {
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  description: string;
  highlights: string[];
  sizes: string[];
  colors: string[];
  material: string;
  specs: Record<string, string>;
}

