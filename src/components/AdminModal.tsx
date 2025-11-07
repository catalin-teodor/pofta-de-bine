import React, { useState, useEffect, useMemo } from 'react';
import type { MenuItem, Order, FAQItem, TestimonialItem } from '../types';
import { fetchMenu } from '../services/geminiService';
import { fetchFaq } from '../services/faqService';
import { fetchTestimonials } from '../services/testimonialService';
import { CloseIcon, MagicWandIcon } from './IconComponents';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMenu: MenuItem[];
  onSaveMenu: (newMenu: MenuItem[]) => void;
  currentFaqs: FAQItem[];
  onSaveFaq: (newFaqs: FAQItem[]) => void;
  currentTestimonials: TestimonialItem[];
  onSaveTestimonials: (newTestimonials: TestimonialItem[]) => void;
  onLogout: () => void;
}

type Tab = 'menu' | 'orders' | 'faq' | 'testimonials';

const MenuEditor: React.FC<{ currentMenu: MenuItem[], onSave: (menu: MenuItem[]) => void }> = ({ currentMenu, onSave }) => {
  const [jsonText, setJsonText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    setJsonText(JSON.stringify(currentMenu, null, 2));
  }, [currentMenu]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newMenu = await fetchMenu();
      setJsonText(JSON.stringify(newMenu, null, 2));
    } catch (err) {
      setError('Eroare la generarea meniului. Încearcă din nou.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    try {
      setError(null);
      const parsedMenu = JSON.parse(jsonText);
      if (!Array.isArray(parsedMenu) || !parsedMenu[0]?.day) {
          throw new Error("Formatul JSON nu este un meniu valid.")
      }
      onSave(parsedMenu);
    } catch (err) {
      setError('Format JSON invalid. Verifică textul și încearcă din nou.');
    }
  };

  return (
    <>
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p>{error}</p></div>}
      <label htmlFor="menuJson" className="block text-sm font-medium text-gray-700 mb-2">Editează meniul (format JSON):</label>
      <textarea id="menuJson" className="w-full h-96 p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-brand-green-dark focus:border-brand-green-dark" value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
      <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
        <button onClick={handleGenerate} disabled={isGenerating} className="flex items-center space-x-2 bg-brand-green-light text-brand-green-dark font-semibold px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors disabled:bg-gray-300 disabled:text-gray-500">
          <MagicWandIcon className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Se generează...' : 'Generează meniu nou cu AI'}</span>
        </button>
        <button onClick={handleSave} className="bg-brand-green-dark text-white font-semibold px-6 py-2 rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105">Salvează Meniul</button>
      </div>
    </>
  );
};

const FAQEditor: React.FC<{ currentFaqs: FAQItem[], onSave: (faqs: FAQItem[]) => void }> = ({ currentFaqs, onSave }) => {
  const [jsonText, setJsonText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    setJsonText(JSON.stringify(currentFaqs, null, 2));
  }, [currentFaqs]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newFaqs = await fetchFaq();
      setJsonText(JSON.stringify(newFaqs, null, 2));
    } catch (err) {
      setError('Eroare la generarea FAQ. Încearcă din nou.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    try {
      setError(null);
      const parsedFaqs = JSON.parse(jsonText);
      if (!Array.isArray(parsedFaqs) || typeof parsedFaqs[0]?.question !== 'string' || typeof parsedFaqs[0]?.answer !== 'string') {
          throw new Error("Formatul JSON nu este valid pentru FAQ.")
      }
      onSave(parsedFaqs);
    } catch (err) {
      setError('Format JSON invalid. Verifică textul și încearcă din nou.');
    }
  };

  return (
    <>
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p>{error}</p></div>}
      <label htmlFor="faqJson" className="block text-sm font-medium text-gray-700 mb-2">Editează Întrebările Frecvente (format JSON):</label>
      <textarea id="faqJson" className="w-full h-96 p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-brand-green-dark focus:border-brand-green-dark" value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
      <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
        <button onClick={handleGenerate} disabled={isGenerating} className="flex items-center space-x-2 bg-brand-green-light text-brand-green-dark font-semibold px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors disabled:bg-gray-300 disabled:text-gray-500">
          <MagicWandIcon className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Se generează...' : 'Generează FAQ nou cu AI'}</span>
        </button>
        <button onClick={handleSave} className="bg-brand-green-dark text-white font-semibold px-6 py-2 rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105">Salvează FAQ</button>
      </div>
    </>
  );
};

const TestimonialEditor: React.FC<{ currentTestimonials: TestimonialItem[], onSave: (testimonials: TestimonialItem[]) => void }> = ({ currentTestimonials, onSave }) => {
  const [jsonText, setJsonText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    setJsonText(JSON.stringify(currentTestimonials, null, 2));
  }, [currentTestimonials]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newTestimonials = await fetchTestimonials();
      setJsonText(JSON.stringify(newTestimonials, null, 2));
    } catch (err) {
      setError('Eroare la generarea testimonialelor. Încearcă din nou.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    try {
      setError(null);
      const parsedTestimonials = JSON.parse(jsonText);
      if (!Array.isArray(parsedTestimonials) || typeof parsedTestimonials[0]?.quote !== 'string') {
          throw new Error("Formatul JSON nu este valid pentru Testimoniale.")
      }
      onSave(parsedTestimonials);
    } catch (err) {
      setError('Format JSON invalid. Verifică textul și încearcă din nou.');
    }
  };

  return (
    <>
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p>{error}</p></div>}
      <label htmlFor="testimonialJson" className="block text-sm font-medium text-gray-700 mb-2">Editează Testimonialele (format JSON):</label>
      <textarea id="testimonialJson" className="w-full h-96 p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-brand-green-dark focus:border-brand-green-dark" value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
      <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
        <button onClick={handleGenerate} disabled={isGenerating} className="flex items-center space-x-2 bg-brand-green-light text-brand-green-dark font-semibold px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors disabled:bg-gray-300 disabled:text-gray-500">
          <MagicWandIcon className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Se generează...' : 'Generează Testimoniale cu AI'}</span>
        </button>
        <button onClick={handleSave} className="bg-brand-green-dark text-white font-semibold px-6 py-2 rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105">Salvează Testimonialele</button>
      </div>
    </>
  );
};

const OrdersDashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            // Fix: Explicitly convert Date objects to numbers using getTime() before subtraction.
            // This resolves a potential TypeScript error where arithmetic operations on Date objects are disallowed.
            setOrders(JSON.parse(storedOrders).sort((a: Order, b: Order) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        }
    }, []);

    const stats = useMemo(() => {
        const dayCounts = orders.flatMap(o => o.days).reduce((acc: Record<string, number>, day) => {
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        }, {});

        const popularDays = Object.entries(dayCounts).sort((a, b) => b[1] - a[1]).map(([day]) => day);

        return {
            totalOrders: orders.length,
            popularDays: popularDays.slice(0, 3),
        }
    }, [orders]);

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistici Rapide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Comenzi</p>
                    <p className="text-2xl font-bold text-brand-green-dark">{stats.totalOrders}</p>
                </div>
                 <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Cele mai populare zile</p>
                    <p className="text-xl font-bold text-brand-accent">{stats.popularDays.join(', ') || 'N/A'}</p>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Lista Comenzilor</h3>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                {orders.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zile Comandate</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dată</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.fullName}</div>
                                        <div className="text-sm text-gray-500 truncate max-w-xs">{order.address}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.days.join(', ')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.timestamp).toLocaleString('ro-RO')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="p-4 text-center text-gray-500">Nu există comenzi înregistrate.</p>
                )}
            </div>
             <p className="text-xs text-gray-400 mt-4">Notă: Comenzile sunt stocate doar în acest browser și se vor pierde dacă datele site-ului sunt șterse.</p>
        </div>
    );
};

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, currentMenu, onSaveMenu, currentFaqs, onSaveFaq, currentTestimonials, onSaveTestimonials, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('menu');

  useEffect(() => {
    if (isOpen) {
      setActiveTab('menu'); // Reset to default tab on open
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const TabButton: React.FC<{ tab: Tab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === tab ? 'bg-white border-gray-200 border-b-white -mb-px' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
      role="tab"
      aria-selected={activeTab === tab}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <header className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Panou de Administrare</h2>
          <div className="flex items-center space-x-4">
             <button onClick={onLogout} className="text-sm text-gray-500 hover:text-brand-accent">Logout</button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Închide"><CloseIcon className="h-6 w-6" /></button>
          </div>
        </header>
        
        <nav className="px-6 border-b border-gray-200">
          <div className="flex space-x-2" role="tablist">
            <TabButton tab="menu" label="Editare Meniu" />
            <TabButton tab="orders" label="Comenzi & Statistici" />
            <TabButton tab="faq" label="Editare FAQ" />
            <TabButton tab="testimonials" label="Editare Testimoniale" />
          </div>
        </nav>
        
        <main className="p-6 overflow-y-auto flex-grow bg-white">
          <div role="tabpanel" hidden={activeTab !== 'menu'}>
            <MenuEditor currentMenu={currentMenu} onSave={onSaveMenu} />
          </div>
          <div role="tabpanel" hidden={activeTab !== 'orders'}>
            <OrdersDashboard />
          </div>
          <div role="tabpanel" hidden={activeTab !== 'faq'}>
            <FAQEditor currentFaqs={currentFaqs} onSave={onSaveFaq} />
          </div>
           <div role="tabpanel" hidden={activeTab !== 'testimonials'}>
            <TestimonialEditor currentTestimonials={currentTestimonials} onSave={onSaveTestimonials} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminModal;
