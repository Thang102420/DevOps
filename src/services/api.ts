import { Product, Order, DatabaseStatus } from '../types';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';

const getApiBase = () => {
  if (typeof window !== 'undefined') {
    if (window.location.port === '5000' || window.location.port === '80') {
      return '/api';
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
  }
  return '/api';
};

const API_BASE = getApiBase();

export const apiService = {
  // Check if MongoDB / Express server is online
  async checkHealth(): Promise<DatabaseStatus> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        return {
          connected: true,
          database: data.database || 'connected',
          productsCount: data.productsCount || 0,
          lastChecked: new Date().toLocaleTimeString('vi-VN'),
        };
      }
    } catch {
      // Backend not running or timeout
    }

    return {
      connected: false,
      database: 'disconnected',
      productsCount: 0,
      lastChecked: new Date().toLocaleTimeString('vi-VN'),
    };
  },

  // Get products with optional filter query
  async getProducts(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    inStock?: boolean;
  }): Promise<{ products: Product[]; isLiveDb: boolean }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.category && params.category !== 'all') searchParams.append('category', params.category);
      if (params?.search) searchParams.append('search', params.search);
      if (params?.minPrice) searchParams.append('minPrice', params.minPrice.toString());
      if (params?.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
      if (params?.sort) searchParams.append('sort', params.sort);
      if (params?.inStock) searchParams.append('inStock', 'true');

      const url = `${API_BASE}/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return { products: json.data, isLiveDb: true };
        }
      }
    } catch {
      // Fallback
    }

    return { products: FALLBACK_PRODUCTS, isLiveDb: false };
  },

  // Create new product
  async createProduct(productData: Omit<Product, 'id'>): Promise<{ product: Product; isLiveDb: boolean }> {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return { product: json.data, isLiveDb: true };
        }
      }
    } catch {
      // fallback
    }

    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    return { product: newProd, isLiveDb: false };
  },

  // Update product
  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Get all orders from MongoDB
  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch(`${API_BASE}/orders?limit=100`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data.map((item: any) => ({
            id: item._id || item.id,
            orderCode: item.orderCode,
            createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN'),
            customer: item.customer,
            items: item.items,
            subtotal: item.subtotal,
            discountAmount: item.discountAmount || 0,
            shippingFee: item.shippingFee || 0,
            total: item.total,
            paymentMethod: item.paymentMethod || 'cod',
            status: item.status || 'pending',
          }));
        }
      }
    } catch {
      // fallback
    }
    return [];
  },

  // Create order
  async createOrder(order: Omit<Order, 'id'>): Promise<Order> {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      // fallback
    }

    const fallbackOrder: Order = {
      ...order,
      id: `order-${Date.now()}`,
      orderCode: order.orderCode || `VT-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    return fallbackOrder;
  },

  // Update order status in MongoDB
  async updateOrderStatus(idOrCode: string, status: Order['status']): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(idOrCode)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Delete order in MongoDB
  async deleteOrder(idOrCode: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(idOrCode)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Trigger seed on MongoDB
  async seedDatabase(): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/seed`, { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        return { success: true, message: json.message };
      }
      return { success: false, message: 'Server phản hồi lỗi khi nạp dữ liệu' };
    } catch (err: any) {
      return { success: false, message: 'Không thể kết nối đến API Server (Backend chưa chạy)' };
    }
  },

  // User login via API
  async login(emailOrUsername: string, password: string): Promise<{ success: boolean; user?: any; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });
      const data = await res.json();
      return { success: res.ok && data.success, user: data.user, message: data.message || '' };
    } catch {
      return { success: false, message: 'Không thể kết nối tới máy chủ' };
    }
  },

  // User register via API
  async register(
    name: string,
    email: string,
    password: string,
    phone?: string,
    address?: string,
    role?: 'customer' | 'admin'
  ): Promise<{ success: boolean; user?: any; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, address, role }),
      });
      const data = await res.json();
      return { success: res.ok && data.success, user: data.user, message: data.message || '' };
    } catch {
      return { success: false, message: 'Không thể kết nối tới máy chủ' };
    }
  },

  // Get all registered users from MongoDB
  async getUsers(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/auth/users`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // fallback
    }
    return [];
  },

  // Update user in MongoDB
  async updateUser(
    id: string,
    updates: {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      role?: 'customer' | 'admin';
      password?: string;
    }
  ): Promise<{ success: boolean; user?: any; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth/users/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      return { success: res.ok && data.success, user: data.user, message: data.message };
    } catch {
      return { success: false, message: 'Không thể kết nối tới máy chủ cập nhật' };
    }
  },

  // Delete user from MongoDB
  async deleteUser(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/auth/users/${id}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Get admin statistics
  async getStats(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }
    return null;
  },
};
