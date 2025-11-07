import React from 'react';

interface ApiKeyPromptProps {
    onKeySelected: () => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onKeySelected }) => {
    
    const handleSelectKey = async () => {
        try {
            // @ts-ignore
            await window.aistudio.openSelectKey();
            onKeySelected();
        } catch (e) {
            console.error("Could not open API key selection:", e);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-[99] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Selectați Cheia API Gemini</h2>
                <p className="text-gray-600 mb-6">
                    Pentru a genera conținut dinamic, cum ar fi meniul săptămânal, această aplicație folosește API-ul Google Gemini. Vă rugăm să selectați cheia API pentru a continua.
                </p>
                <button
                    onClick={handleSelectKey}
                    className="w-full bg-brand-green-dark text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark transition-transform transform hover:scale-105"
                >
                    Selectează Cheia API
                </button>
                <p className="text-xs text-gray-500 mt-4">
                    Utilizarea API-ului Gemini poate implica costuri. Pentru mai multe informații, consultați{' '}
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-accent">
                        documentația de facturare
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default ApiKeyPrompt;
