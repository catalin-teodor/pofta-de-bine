import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import LoginModal from './components/LoginModal';
import FAQ from './components/FAQ';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import type { MenuItem, FAQItem, TestimonialItem } from './types';
import { fetchMenu } from './services/geminiService';
import { fetchFaq } from './services/faqService';
import { fetchTestimonials } from './services/testimonialService';


const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [testimonialItems, setTestimonialItems] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isKeySelected, setIsKeySelected] = useState<boolean | null>(null);

  const clearDataAndStorage = () => {
    setMenuItems([]);
    setFaqItems([]);
    setTestimonialItems([]);
    localStorage.removeItem('weeklyMenu');
    localStorage.removeItem('faqItems');
    localStorage.removeItem('testimonialItems');
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const loadItem = async <T,>(storageKey: string, fetchFn: () => Promise<T[]>, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
        const savedItem = localStorage.getItem(storageKey);
        if (savedItem) {
          setter(JSON.parse(savedItem));
        } else {
          const data = await fetchFn();
          setter(data);
          localStorage.setItem(storageKey, JSON.stringify(data));
        }
      };

      await Promise.all([
        loadItem('weeklyMenu', fetchMenu, setMenuItems),
        loadItem('faqItems', fetchFaq, setFaqItems),
        loadItem('testimonialItems', fetchTestimonials, setTestimonialItems)
      ]);

    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("Requested entity was not found")) {
            setError('Cheia API selectată nu este validă. Vă rugăm să selectați o altă cheie.');
            setIsKeySelected(false);
        } else {
            setError(err.message);
        }
      } else {
        setError('A apărut o eroare neașteptată.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkApiKey = async () => {
        try {
            // @ts-ignore
            const hasKey = window.aistudio && await window.aistudio.hasSelectedApiKey();
            setIsKeySelected(hasKey);
        } catch(e) {
            console.error("Error checking for API key", e);
            setIsKeySelected(false);
        }
    };
    checkApiKey();
  }, []);
  
  useEffect(() => {
    if(isKeySelected === true) {
        loadData();
    } else if (isKeySelected === false) {
        clearDataAndStorage();
        setIsLoading(false);
        setError("Vă rugăm să selectați o cheie API pentru a încărca conținutul dinamic.");
    }
  }, [isKeySelected]);
  
  const handleKeySelected = () => {
    clearDataAndStorage();
    setIsKeySelected(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    setIsAdminModalOpen(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminModalOpen(false);
  }

  const handleSaveMenu = (newMenu: MenuItem[]) => {
      setMenuItems(newMenu);
      localStorage.setItem('weeklyMenu', JSON.stringify(newMenu));
      setIsAdminModalOpen(false);
  }

  const handleSaveFaq = (newFaqs: FAQItem[]) => {
      setFaqItems(newFaqs);
      localStorage.setItem('faqItems', JSON.stringify(newFaqs));
      setIsAdminModalOpen(false);
  }

  const handleSaveTestimonials = (newTestimonials: TestimonialItem[]) => {
      setTestimonialItems(newTestimonials);
      localStorage.setItem('testimonialItems', JSON.stringify(newTestimonials));
      setIsAdminModalOpen(false);
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      {isKeySelected === false && <ApiKeyPrompt onKeySelected={handleKeySelected} />}
      {isKeySelected === null && (
          <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 animate-pulse text-lg">Se verifică configurația...</p>
              </div>
          </div>
      )}
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials testimonialItems={testimonialItems} isLoading={isLoading} error={error} />
        <Menu menuItems={menuItems} isLoading={isLoading} error={error} />
        <FAQ items={faqItems} />
        <OrderForm />
      </main>
      <Footer />
      <button 
        onClick={() => isAuthenticated ? setIsAdminModalOpen(true) : setIsLoginModalOpen(true)}
        className="fixed bottom-4 right-4 bg-brand-accent text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-transform transform hover:scale-110"
        aria-label="Panou de administrare"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </button>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {isAuthenticated && (
        <AdminModal 
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            currentMenu={menuItems}
            onSaveMenu={handleSaveMenu}
            currentFaqs={faqItems}
            onSaveFaq={handleSaveFaq}
            currentTestimonials={testimonialItems}
            onSaveTestimonials={handleSaveTestimonials}
            onLogout={handleLogout}
        />
      )}

    </div>
  );
};

export default App;
