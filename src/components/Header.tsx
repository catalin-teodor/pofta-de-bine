
import React, { useState } from 'react';
import { HouseHeartIcon, HamburgerIcon, CloseIcon } from './IconComponents';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HouseHeartIcon className="h-8 w-8 text-brand-green-dark" />
          <span className="text-2xl font-bold text-gray-800">Pofta de Bine</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => scrollTo('why-us')} className="text-gray-600 hover:text-brand-green-dark transition-colors">De ce noi</button>
          <button onClick={() => scrollTo('faq')} className="text-gray-600 hover:text-brand-green-dark transition-colors">FAQ</button>
          <button onClick={() => scrollTo('menu')} className="text-gray-600 hover:text-brand-green-dark transition-colors">Meniu</button>
          <button onClick={() => scrollTo('order')} className="bg-brand-accent text-white px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105">
            Comandă Acum
          </button>
        </nav>
        <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800" aria-label="Open menu">
                {isMobileMenuOpen ? <CloseIcon className="h-7 w-7" /> : <HamburgerIcon className="h-7 w-7" />}
            </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-white shadow-lg`}>
          <div className="flex flex-col items-center space-y-4 p-6">
            <button onClick={() => scrollTo('why-us')} className="text-gray-600 hover:text-brand-green-dark transition-colors text-lg">De ce noi</button>
            <button onClick={() => scrollTo('faq')} className="text-gray-600 hover:text-brand-green-dark transition-colors">FAQ</button>
            <button onClick={() => scrollTo('menu')} className="text-gray-600 hover:text-brand-green-dark transition-colors text-lg">Meniu</button>
            <button onClick={() => scrollTo('order')} className="w-full bg-brand-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105">
                Comandă Acum
            </button>
          </div>
      </div>
    </header>
  );
};

export default Header;
