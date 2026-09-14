import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import { ProductList } from './components/ProductList';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'contact' | 'admin'>(() => {
    if (typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.search.includes('admin'))) {
      return 'admin';
    }
    return 'products';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Sync hash with admin tab
  useEffect(() => {
    if (activeTab === 'admin') {
      window.location.hash = 'admin';
    } else if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname);
    }
  }, [activeTab]);

  const scrollToProducts = () => {
    setActiveTab('products');
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dedicated Admin Screen (Requires Admin authentication)
  if (activeTab === 'admin') {
    if (!isAuthenticated || !isAdmin) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <AdminLogin onExit={() => setActiveTab('products')} />
          <ToastContainer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <AdminDashboard onExit={() => setActiveTab('products')} />
        <ProductDetailModal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Areas based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'products' && (
          <>
            <Banner onExploreProducts={scrollToProducts} />
            <ProductList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </>
        )}

        {activeTab === 'about' && (
          <AboutSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <AuthModal />
      <OrderHistoryModal />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;

