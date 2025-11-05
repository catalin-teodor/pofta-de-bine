
import React from 'react';
import { HouseHeartIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white relative">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <HouseHeartIcon className="h-8 w-8 text-brand-green-dark" />
              <span className="text-2xl font-bold">Pofta de Bine</span>
            </div>
            <p className="text-gray-400 mt-2">Mănâncă bine, trăiește bine.</p>
          </div>
          <div className="text-gray-400">
            <p>&copy; {new Date().getFullYear()} Pofta de Bine. Toate drepturile rezervate.</p>
            <p>Str. Soarelui 123, Orașul Vesel, 45678</p>
            <p>contact@poftadebine.ro</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
