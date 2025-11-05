
import React from 'react';
import type { MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

const MenuSkeleton: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
    <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
  </div>
);

interface MenuProps {
  menuItems: MenuItem[];
  isLoading: boolean;
  error: string | null;
}

const Menu: React.FC<MenuProps> = ({ menuItems, isLoading, error }) => {
  return (
    <section id="menu" className="py-16 bg-brand-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Meniul Săptămânii</h2>
          <p className="text-gray-600 mt-2">Proaspăt preparat și conceput creativ pentru pofticioșii de bine.</p>
        </div>
        {error && (
          <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Ups!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => <MenuSkeleton key={index} />)
            : menuItems.map((item, index) => <MenuItemCard key={index} item={item} />)}
        </div>
      </div>
    </section>
  );
};

export default Menu;
