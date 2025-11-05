import { GoogleGenAI, Type } from "@google/genai";
import type { FAQItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const fetchFaq = async (): Promise<FAQItem[]> => {
  try {
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
    throw new Error("Nu am putut genera întrebările frecvente. Te rugăm să încerci din nou mai târziu.");
  }
};