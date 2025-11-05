
import React from 'react';
import type { MenuItem } from '../types';
import { FireIcon, ProteinIcon, CarbIcon, FatIcon } from './IconComponents';

interface MenuItemCardProps {
  item: MenuItem;
}

const NutritionItem: React.FC<{ icon: React.ReactNode, value: number, label: string }> = ({ icon, value, label }) => (
    <div className="flex items-center space-x-1">
        {icon}
        <span className="text-xs text-gray-600 font-medium">{value}{label}</span>
    </div>
);

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { day, main, side, snack, description, ingredients, nutrition } = item;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <img
        className="w-full h-48 object-cover"
        src={`https://picsum.photos/seed/${day}/400/300`}
        alt={main}
      />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-brand-green-dark mb-2">{day}</h3>
        <ul className="space-y-1 text-gray-700 mb-4">
          <li><strong>Principal:</strong> {main}</li>
          <li><strong>Garnitură:</strong> {side}</li>
          <li><strong>Gustare:</strong> {snack}</li>
        </ul>
        <p className="text-gray-600 text-sm italic mb-4">"{description}"</p>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-2 text-center mb-3">
                <NutritionItem icon={<FireIcon className="h-4 w-4 text-orange-500"/>} value={nutrition.calories} label="cal"/>
                <NutritionItem icon={<ProteinIcon className="h-4 w-4 text-red-500"/>} value={nutrition.protein} label="g"/>
                <NutritionItem icon={<CarbIcon className="h-4 w-4 text-yellow-500"/>} value={nutrition.carbs} label="g"/>
                <NutritionItem icon={<FatIcon className="h-4 w-4 text-blue-500"/>} value={nutrition.fats} label="g"/>
            </div>

            <h4 className="font-semibold text-gray-700 text-sm mb-1">Ingrediente Cheie:</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
                {ingredients.join(', ')}
            </p>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
