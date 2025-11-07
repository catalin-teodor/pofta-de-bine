import { GoogleGenAI, Type } from "@google/genai";
import type { MenuItem } from '../types';

export const fetchMenu = async (): Promise<MenuItem[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generează un meniu săptămânal (Luni - Vineri) pentru un serviciu de livrare de mâncare sănătoasă. Meniul este destinat atât adulților, cât și copiilor. Pentru fiecare zi, oferă un fel principal, o garnitură, o gustare, o descriere apetisantă, o listă de ingrediente cheie și informații nutriționale estimate (calorii, proteine, carbohidrați, grăsimi). Răspunde în limba română.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: {
                type: Type.STRING,
                description: "Ziua săptămânii (ex. Luni).",
              },
              main: {
                type: Type.STRING,
                description: "Felul principal.",
              },
              side: {
                type: Type.STRING,
                description: "Garnitura.",
              },
              snack: {
                type: Type.STRING,
                description: "Gustarea sănătoasă.",
              },
              description: {
                type: Type.STRING,
                description: "O descriere scurtă și apetisantă a mesei.",
              },
              ingredients: {
                type: Type.ARRAY,
                description: "O listă cu ingredientele cheie.",
                items: { type: Type.STRING }
              },
              nutrition: {
                type: Type.OBJECT,
                description: "Informații nutriționale estimate.",
                properties: {
                  calories: { type: Type.NUMBER, description: "Numărul de calorii." },
                  protein: { type: Type.NUMBER, description: "Grame de proteine." },
                  carbs: { type: Type.NUMBER, description: "Grame de carbohidrați." },
                  fats: { type: Type.NUMBER, description: "Grame de grăsimi." },
                },
                 required: ["calories", "protein", "carbs", "fats"],
              }
            },
            required: ["day", "main", "side", "snack", "description", "ingredients", "nutrition"],
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    const menuData = JSON.parse(jsonText);
    return menuData as MenuItem[];

  } catch (error) {
    console.error("Error fetching menu from Gemini API:", error);
    if (error instanceof Error) {
      throw new Error(`Nu am putut genera meniul: ${error.message}`);
    }
    throw new Error("A apărut o eroare la generarea meniului. Încearcă din nou mai târziu.");
  }
};