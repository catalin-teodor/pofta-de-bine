
import React, { useState } from 'react';
import type { FAQItem } from '../types';
import { ChevronDownIcon } from './IconComponents';

interface FAQProps {
    items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section id="faq" className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Întrebări Frecvente</h2>
                    <p className="text-gray-600 mt-2">Găsește aici răspunsuri la cele mai comune întrebări.</p>
                </div>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                            <button
                                onClick={() => handleToggle(index)}
                                className="w-full flex justify-between items-center text-left p-4 md:p-6 focus:outline-none focus:ring-2 focus:ring-brand-green-light/50 rounded-lg"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                                <ChevronDownIcon className={`h-6 w-6 text-brand-green-dark transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                id={`faq-answer-${index}`}
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                            >
                                <div className="p-4 md:p-6 pt-0 text-gray-600">
                                    <p className="whitespace-pre-line">{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
