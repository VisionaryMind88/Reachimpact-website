import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SupportedLanguage, 
  LanguageContextType, 
  defaultLanguage, 
  supportedLanguages 
} from '@/types';
import { 
  getTranslations, 
  getTranslationValue, 
  detectBrowserLanguage,
  fallbackTranslations 
} from '@/lib/i18n';

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
  languages: supportedLanguages
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize with the user's preferred language or the default
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // Try to get the language from localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang && Object.keys(supportedLanguages).includes(savedLang)) {
      return savedLang as SupportedLanguage;
    }
    
    // Otherwise detect browser language
    return detectBrowserLanguage();
  });

  // Function to change the language
  const setLanguage = (lang: SupportedLanguage) => {
    if (Object.keys(supportedLanguages).includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    } else {
      console.warn(`Language "${lang}" not supported`);
    }
  };

  // Translation function with robust fallback handling
  const t = (key: string): string => {
    // If key is empty or not a string, return empty string
    if (!key || typeof key !== 'string') {
      return '';
    }
    
    // Try to get the translation for the current language
    const value = getTranslationValue(language, key);
    
    // If found, return it
    if (value !== undefined && value !== null) {
      return String(value);
    }
    
    // If not found in current language, try default language as fallback
    if (language !== defaultLanguage) {
      const defaultValue = getTranslationValue(defaultLanguage, key);
      if (defaultValue !== undefined && defaultValue !== null) {
        return String(defaultValue);
      }
    }
    
    // If still not found, use our hardcoded fallback translations
    if (fallbackTranslations[key] !== undefined) {
      return fallbackTranslations[key];
    }
    
    // For debugging - display missing keys in a recognizable format
    console.warn(`No translation found for key: ${key}`);
    return `[${key}]`;
  };

  // Update document language attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
    languages: supportedLanguages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};