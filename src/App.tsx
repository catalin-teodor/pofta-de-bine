
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import LoginModal from './components/LoginModal';
import FAQ from './components/FAQ';
import type { MenuItem, FAQItem } from './types';
import { fetchMenu } from './services/geminiService';
import { fetchFaq } from './services/faqService';


const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load Menu
        const savedMenu = localStorage.getItem('weeklyMenu');
        if (savedMenu) {
            setMenuItems(JSON.parse(savedMenu));
        } else {
            const data = await fetchMenu();
            setMenuItems(data);
            localStorage.setItem('weeklyMenu', JSON.stringify(data));
        }

        // Load FAQs
        const savedFaq = localStorage.getItem('faqItems');
        if (savedFaq) {
            setFaqItems(JSON.parse(savedFaq));
        } else {
            const data = await fetchFaq();
            setFaqItems(data);
            localStorage.setItem('faqItems', JSON.stringify(data));
        }

      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("A apărut o eroare necunoscută la încărcarea datelor.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();

    if (window.location.pathname === '/admin') {
      openAdminFlow();
    }
  }, []);
  
  const handleSaveMenu = (newMenu: MenuItem[]) => {
     setMenuItems(newMenu);
     localStorage.setItem('weeklyMenu', JSON.stringify(newMenu));
     setIsAdminModalOpen(false);
  };

  const handleSaveFaq = (newFaqs: FAQItem[]) => {
      setFaqItems(newFaqs);
      localStorage.setItem('faqItems', JSON.stringify(newFaqs));
      setIsAdminModalOpen(false);
  };
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    setIsAdminModalOpen(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminModalOpen(false);
  };

  const openAdminFlow = () => {
    if (isAuthenticated) {
        setIsAdminModalOpen(true);
    } else {
        setIsLoginModalOpen(true);
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <HowItWorks />
        <FAQ items={faqItems} />
        <Menu menuItems={menuItems} isLoading={isLoading} error={error} />
        <OrderForm />
      </main>
      <Footer />
      
      {!isAuthenticated && (
        <LoginModal 
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {isAuthenticated && (
        <AdminModal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            currentMenu={menuItems}
            onSaveMenu={handleSaveMenu}
            currentFaqs={faqItems}
            onSaveFaq={handleSaveFaq}
            onLogout={handleLogout}
      />
      )}
    </div>
  );
};

export default App;
