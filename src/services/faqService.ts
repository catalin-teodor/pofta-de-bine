import { GoogleGenAI, Type } from "@google/genai";
import type { FAQItem } from '../types';

const getAiClient = () => {
  // Fix: Use process.env.API_KEY as required by the coding guidelines, which resolves the TypeScript error.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // Fix: Update error message to reflect the correct environment variable.
    throw new Error("Cheia API (API_KEY) nu este configurată în setările de deployment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchFaq = async (): Promise<FAQItem[]> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generează o listă de 5 întrebări frecvente (FAQ) pentru un serviciu de livrare de mâncare sănătoasă numit 'Pofta de Bine'. Include întrebări despre zonele de livrare, metode de plată, personalizarea comenzilor, ingrediente și ambalaje. Răspunde în limba română.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "Întrebarea frecventă.",
              },
              answer: {
                type: Type.STRING,
                description: "Răspunsul la întrebare.",
              },
            },
            required: ["question", "answer"],
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    const faqData = JSON.parse(jsonText);
    return faqData as FAQItem[];

  } catch (error) {
    console.error("Error fetching FAQ from Gemini API:", error);
     if (error instanceof Error) {
      throw new Error(`Nu am putut genera întrebările: ${error.message}`);
    }
    throw new Error("A apărut o eroare la generarea întrebărilor. Încearcă din nou mai târziu.");
  }
};
