import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Order } from '../types';
import { VOUCHERS } from '../data/products';
import { useToast } from './ToastContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  totalItems: number;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
}

const STORAGE_KEY_CART = 'vietthang_cart_items';
const STORAGE_KEY_COUPON = 'vietthang_applied_coupon';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CART);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_COUPON) || null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(STORAGE_KEY_COUPON, appliedCoupon);
    } else {
      localStorage.removeItem(STORAGE_KEY_COUPON);
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm "${product.name.slice(0, 30)}..." vào giỏ hàng`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const upperCode = appliedCoupon.toUpperCase().trim();
    if (upperCode === 'VIETTHANG10') {
      return Math.round(subtotal * 0.1);
    }
    if (upperCode === 'TECH500' && subtotal >= 10000000) {
      return 500000;
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    const upperCode = appliedCoupon ? appliedCoupon.toUpperCase().trim() : '';
    if (upperCode === 'FREESHIP' && subtotal >= 1000000) {
      return 0;
    }
    // Miễn phí vận chuyển cho đơn hàng từ 5 triệu trở lên
    if (subtotal >= 5000000) {
      return 0;
    }
    return 30000; // 30k VNĐ standard shipping
  }, [subtotal, appliedCoupon]);

  const totalAmount = useMemo(() => {
    const total = subtotal - discountAmount + shippingFee;
    return total > 0 ? total : 0;
  }, [subtotal, discountAmount, shippingFee]);

  const applyCoupon = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    const found = VOUCHERS.find((v) => v.code === upper);
    if (!found) {
      showToast(`Mã giảm giá "${code}" không hợp lệ hoặc đã hết hạn`, 'error');
      return false;
    }
    if (found.minSpend && subtotal < found.minSpend) {
      showToast(
        `Đơn hàng cần tối thiểu ${found.minSpend.toLocaleString('vi-VN')}đ để áp dụng mã "${upper}"`,
        'warning'
      );
      return false;
    }
    setAppliedCoupon(upper);
    showToast(`Áp dụng thành công mã "${upper}": ${found.description}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Đã gỡ mã giảm giá', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        totalItems,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
        selectedProductForDetail,
        setSelectedProductForDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
