
import React from 'react';
import { LeafIcon, SmileyFaceIcon, TruckIcon } from './IconComponents';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
        <div className="bg-brand-green-light/30 rounded-full p-4 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">De ce ne aleg clienții</h2>
          <p className="text-gray-600 mt-2">Facem mesele sănătoase simple, delicioase și convenabile!</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<LeafIcon className="h-8 w-8 text-brand-green-dark" />}
                title="Proaspăt & Natural"
                description="Folosim ingrediente locale, proaspete, pentru a asigura cea mai înaltă calitate și valoare nutritivă."
            />
            <FeatureCard 
                icon={<SmileyFaceIcon className="h-8 w-8 text-brand-accent" />}
                title="Aprobați de Pici"
                description="Meniuri delicioase pe care copiii le adoră și părinții le aprobă, pline de nutrienți esențiali pentru toți."
            />
            <FeatureCard 
                icon={<TruckIcon className="h-8 w-8 text-brand-green-dark" />}
                title="Livrare Convenabilă"
                description="Economisește timp cu serviciul nostru zilnic de livrare, aducând mese proaspete direct la ușa ta."
            />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
