import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
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

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'contact'>('products');
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToProducts = () => {
    setActiveTab('products');
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
