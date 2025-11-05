
import React from 'react';

const Hero: React.FC = () => {
    const scrollToMenu = () => {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <section className="relative bg-brand-beige py-20 md:py-32">
       <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ backgroundImage: "url('https://picsum.photos/1600/900?image=1078')" }}
      ></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-4">
          Energie Naturală, Livrată Zilnic.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Meniuri delicioase și echilibrate pentru tine și familia ta, preparate din ingrediente proaspete, pentru un stil de viață sănătos.
        </p>
        <button 
            onClick={scrollToMenu}
            className="bg-brand-green-dark text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-lg">
          Vezi Meniul Săptămânii
        </button>
      </div>
    </section>
  );
};

export default Hero;
