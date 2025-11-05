
export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface MenuItem {
  day: string;
  main: string;
  side: string;
  snack: string;
  description: string;
  ingredients: string[];
  nutrition: NutritionInfo;
}

export interface Order {
  id: string;
  timestamp: string;
  fullName: string;
  address: string;
  phone: string;
  days: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
