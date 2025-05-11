import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, defaultLanguage, supportedLanguages } from '@/types';
import en from '@/locales/en';
import nl from '@/locales/nl';
import de from '@/locales/de';
import es from '@/locales/es';
import fr from '@/locales/fr';

// All locale data
const locales = {
  en: en || {},
  nl: nl || {},
  de: de || {},
  es: es || {},
  fr: fr || {},
};

type LocaleKey = keyof typeof locales;

// Fallback English translations for critical UI elements
const fallbacks = {
  'nav.features': 'Features',
  'nav.pricing': 'Pricing',
  'nav.solutions': 'Solutions',
  'nav.testimonials': 'Testimonials',
  'nav.blog': 'Blog',
  'nav.requestDemo': 'Request Demo',
  'nav.buyMinutes': 'Buy Call Minutes',
  'nav.language': 'Language',
  'nav.contact': 'Contact',
  'hero.title': 'Revolutionize Your',
  'hero.titleHighlight': 'Outreach',
  'hero.description': 'ReachImpact uses advanced AI technology to automate your sales and marketing calls, helping you generate more leads, schedule meetings, and improve sales effectiveness—all without lifting a finger.',
  'hero.requestDemo': 'Request Demo',
  'hero.buyMinutes': 'Buy Call Minutes',
};

// Type for context
interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  languages: typeof supportedLanguages;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
  languages: supportedLanguages,
});

// Helper function to get nested property
function getNestedValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }
  
  return current;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or browser
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('language');
    if (saved && Object.keys(supportedLanguages).includes(saved)) {
      return saved as SupportedLanguage;
    }
    
    try {
      const browserLang = navigator.language.split('-')[0];
      if (Object.keys(supportedLanguages).includes(browserLang)) {
        return browserLang as SupportedLanguage;
      }
    } catch (e) {
      console.warn('Error detecting browser language');
    }
    
    return defaultLanguage;
  });

  // Update language in localStorage when changed
  const setLanguage = (lang: SupportedLanguage) => {
    if (Object.keys(supportedLanguages).includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    }
  };

  // Translation function with fallbacks
  const t = (key: string): string => {
    if (!key) return '';
    
    // Try current language
    const value = getNestedValue(locales[language as LocaleKey], key);
    if (value !== undefined) return String(value);
    
    // Try default language as fallback
    if (language !== defaultLanguage) {
      const defaultValue = getNestedValue(locales[defaultLanguage], key);
      if (defaultValue !== undefined) return String(defaultValue);
    }
    
    // Use hardcoded fallbacks for critical UI elements
    if (key in fallbacks) {
      return fallbacks[key as keyof typeof fallbacks];
    }
    
    // Return key as last resort
    return key;
  };

  // Update html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const contextValue = {
    language,
    setLanguage,
    t,
    languages: supportedLanguages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}