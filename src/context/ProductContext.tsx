import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, DatabaseStatus } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { apiService } from '../services/api';
import { useToast } from './ToastContext';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  dbStatus: DatabaseStatus;
  checkDbStatus: () => Promise<void>;
  seedMongoDb: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  addProduct: (data: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleStock: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  resetToDefault: () => void;
  importProducts: (newProducts: Product[]) => boolean;
  getProductById: (id: string) => Product | undefined;
}

const STORAGE_KEY_PRODUCTS = 'vietthang_products_data_v2';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<DatabaseStatus>({
    connected: false,
    database: 'disconnected',
    productsCount: 0,
    lastChecked: '',
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) {
          return parsed;
        }
      } catch (err) {
        console.error('Lỗi khi đọc dữ liệu sản phẩm từ localStorage:', err);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (err) {
      console.error('Lỗi khi lưu sản phẩm vào localStorage:', err);
    }
  }, [products]);

  // Check MongoDB connection status
  const checkDbStatus = useCallback(async () => {
    const status = await apiService.checkHealth();
    setDbStatus(status);
  }, []);

  // Refresh products from API or local
  const refreshProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiService.getProducts();
      if (res.isLiveDb && res.products.length > 0) {
        setProducts(res.products);
      }
    } catch (error) {
      console.warn('Cannot fetch products from server, using local data', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial check on mount
  useEffect(() => {
    checkDbStatus().then(() => {
      refreshProducts();
    });
  }, [checkDbStatus, refreshProducts]);

  // Seed MongoDB Database
  const seedMongoDb = async () => {
    setIsLoading(true);
    const res = await apiService.seedDatabase();
    if (res.success) {
      showToast(res.message, 'success');
      await checkDbStatus();
      await refreshProducts();
    } else {
      showToast(res.message, 'warning');
    }
    setIsLoading(false);
  };

  const addProduct = async (data: Omit<Product, 'id'>): Promise<Product> => {
    const { product } = await apiService.createProduct(data);
    setProducts((prev) => [product, ...prev]);
    showToast(`Đã thêm sản phẩm "${product.name}" thành công!`, 'success');
    return product;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    await apiService.updateProduct(id, updates);
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      })
    );
    showToast('Đã cập nhật thông tin sản phẩm!', 'success');
  };

  const deleteProduct = async (id: string) => {
    const target = products.find((p) => p.id === id);
    await apiService.deleteProduct(id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast(`Đã xóa sản phẩm "${target ? target.name : id}"`, 'info');
  };

  const toggleStock = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const newInStock = !target.inStock;
    const newStockCount = newInStock ? (target.stockCount > 0 ? target.stockCount : 25) : 0;

    await updateProduct(id, { inStock: newInStock, stockCount: newStockCount });
    showToast(
      `Đã chuyển trạng thái: ${target.name} (${newInStock ? 'Còn hàng' : 'Hết hàng'})`,
      newInStock ? 'success' : 'warning'
    );
  };

  const toggleFeatured = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const nextVal = !target.isFeatured;
    await updateProduct(id, { isFeatured: nextVal });
    showToast(
      nextVal ? `Đã gắn nổi bật cho "${target.name}"` : `Đã bỏ nổi bật "${target.name}"`,
      'info'
    );
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    showToast('Đã khôi phục toàn bộ 36 sản phẩm về mặc định!', 'info');
  };

  const importProducts = (newProducts: Product[]): boolean => {
    if (!Array.isArray(newProducts) || newProducts.length === 0) {
      showToast('Dữ liệu nhập vào không hợp lệ!', 'error');
      return false;
    }
    setProducts(newProducts);
    showToast(`Đã nạp thành công ${newProducts.length} sản phẩm!`, 'success');
    return true;
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        dbStatus,
        checkDbStatus,
        seedMongoDb,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        toggleFeatured,
        resetToDefault,
        importProducts,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
