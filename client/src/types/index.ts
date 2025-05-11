// Supported languages
export const supportedLanguages = {
  en: {
    name: 'English',
    nativeName: 'English'
  },
  nl: {
    name: 'Dutch',
    nativeName: 'Nederlands'
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch'
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español'
  },
  fr: {
    name: 'French',
    nativeName: 'Français'
  }
};

// Default language
export const defaultLanguage = 'en';

// Types for language context
export type SupportedLanguage = keyof typeof supportedLanguages;

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string | undefined;
  languages: typeof supportedLanguages;
}

// Types for API requests
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface DemoRequestData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
}

export interface BuyMinutesFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  plan: string;
  amount: number;
}

// Types for pricing data
export interface PricingPlan {
  name: string;
  description: string;
  price: number;
  unit: string;
  totalPrice: string;
  totalUnits: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

export interface PricingFeature {
  name: string;
  included: boolean;
}

// Types for testimonials
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image: string;
}

// Types for blog data
export interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
}
