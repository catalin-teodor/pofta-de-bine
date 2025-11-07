import { GoogleGenAI, Type } from "@google/genai";
import type { TestimonialItem } from '../types';

export const fetchTestimonials = async (): Promise<TestimonialItem[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generează o listă de 3 testimoniale credibile pentru un serviciu de livrare de mâncare sănătoasă numit 'Pofta de Bine'. Fiecare testimonial trebuie să includă o recenzie (quote), numele unui autor fictiv și un rating numeric între 4 și 5. Variază stilul recenziilor: una de la o mamă ocupată, una de la un profesionist din IT și una de la o persoană pasionată de fitness. Răspunde în limba română.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              quote: {
                type: Type.STRING,
                description: "Recenzia clientului.",
              },
              author: {
                type: Type.STRING,
                description: "Numele autorului.",
              },
              rating: {
                type: Type.NUMBER,
                description: "Ratingul de la 1 la 5.",
              }
            },
            required: ["quote", "author", "rating"],
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    const testimonialData = JSON.parse(jsonText);
    return testimonialData as TestimonialItem[];

  } catch (error) {
    console.error("Error fetching testimonials from Gemini API:", error);
    if (error instanceof Error) {
      throw new Error(`Nu am putut genera testimonialele: ${error.message}`);
    }
    throw new Error("A apărut o eroare la generarea testimonialelor. Încearcă din nou mai târziu.");
  }
};