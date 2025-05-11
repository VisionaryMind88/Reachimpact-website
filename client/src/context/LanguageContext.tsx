import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SupportedLanguage, 
  LanguageContextType, 
  defaultLanguage, 
  supportedLanguages 
} from '@/types';
import { getTranslations, getTranslationValue, detectBrowserLanguage } from '@/lib/i18n';

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

  // Translation function
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
    
    // For static text fallback (temporary fix)
    if (key === 'hero.title') return 'Revolutionize Your';
    if (key === 'hero.titleHighlight') return 'Outreach';
    if (key === 'hero.description') return 'ReachImpact uses advanced AI technology to automate your sales and marketing calls, helping you generate more leads, schedule meetings, and improve sales effectiveness—all without lifting a finger.';
    if (key === 'trustedBy.title') return 'Trusted by forward-thinking companies';
    if (key === 'features.title') return 'Powerful Features That Drive Results';
    if (key === 'footer.products.title') return 'Products';
    if (key === 'footer.resources.title') return 'Resources';
    if (key === 'footer.company.title') return 'Company';
    
    console.warn(`No translation found for key: ${key}`);
    // If all else fails, return the key (but with a distinctive format to identify missing translations)
    return key; 
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
