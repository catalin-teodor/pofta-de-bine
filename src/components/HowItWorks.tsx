
import React from 'react';
import { MenuIcon, OrderIcon, EnjoyIcon } from './IconComponents';

interface StepCardProps {
    step: number;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, icon, title, description }) => (
    <div className="relative">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
            <div className="absolute -top-6 bg-brand-green-dark text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-gray-50">
                {step}
            </div>
            <div className="mt-6 mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500">{description}</p>
        </div>
    </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Începe în 3 pași simpli</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <StepCard 
                step={1}
                icon={<MenuIcon className="h-12 w-12 text-brand-green-dark" />}
                title="Vezi Meniul"
                description="Descoperă meniurile creative și nutritive din această săptămână, create de bucătarii noștri."
            />
             <StepCard 
                step={2}
                icon={<OrderIcon className="h-12 w-12 text-brand-accent" />}
                title="Plasează Comanda"
                description="Completează formularul nostru simplu cu detaliile și preferințele tale de livrare."
            />
             <StepCard 
                step={3}
                icon={<EnjoyIcon className="h-12 w-12 text-brand-green-light" />}
                title="Bucură-te de Mese"
                description="Livrăm mese proaspete, gata de savurat, pentru a-ți alimenta ziua în mod sănătos."
            />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
