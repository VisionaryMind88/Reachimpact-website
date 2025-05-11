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
    
    // For static text fallback (comprehensive fallbacks for all used keys)
    // Navigation
    if (key === 'nav.features') return 'Features';
    if (key === 'nav.pricing') return 'Pricing';
    if (key === 'nav.solutions') return 'Solutions';
    if (key === 'nav.testimonials') return 'Testimonials';
    if (key === 'nav.blog') return 'Blog';
    if (key === 'nav.requestDemo') return 'Request Demo';
    if (key === 'nav.buyMinutes') return 'Buy Call Minutes';
    if (key === 'nav.language') return 'Language';
    if (key === 'nav.contact') return 'Contact';
    
    // Hero Section
    if (key === 'hero.title') return 'Revolutionize Your';
    if (key === 'hero.titleHighlight') return 'Outreach';
    if (key === 'hero.description') return 'ReachImpact uses advanced AI technology to automate your sales and marketing calls, helping you generate more leads, schedule meetings, and improve sales effectiveness—all without lifting a finger.';
    if (key === 'hero.requestDemo') return 'Request Demo';
    if (key === 'hero.buyMinutes') return 'Buy Call Minutes';
    
    // Trusted By Section
    if (key === 'trustedBy.title') return 'Trusted by forward-thinking companies';
    
    // Section Titles
    if (key === 'features.title') return 'Powerful Features That Drive Results';
    if (key === 'features.subtitle') return 'Our AI-powered platform offers everything you need to automate and enhance your outbound calling strategy.';
    if (key === 'solutions.title') return 'Tailored Solutions For Every Industry';
    if (key === 'solutions.subtitle') return 'ReachImpact is versatile and adaptable to the unique needs of different industries.';
    if (key === 'pricing.title') return 'Simple, Transparent Pricing';
    if (key === 'pricing.subtitle') return 'Choose the plan that works best for your business needs.';
    if (key === 'testimonials.title') return 'What Our Customers Say';
    if (key === 'testimonials.subtitle') return 'Don\'t just take our word for it—hear from businesses who have transformed their outreach with ReachImpact.';
    if (key === 'howItWorks.title') return 'How ReachImpact Works';
    if (key === 'howItWorks.subtitle') return 'Our streamlined process makes it easy to get started and see results fast.';
    
    // Features Section
    if (key === 'features.feature1.title') return 'AI Voice Assistant';
    if (key === 'features.feature2.title') return 'Automated Scheduling';
    if (key === 'features.feature3.title') return 'Performance Analytics';
    if (key === 'features.feature4.title') return 'Multi-language Support';
    if (key === 'features.feature5.title') return 'CRM Integration';
    if (key === 'features.feature6.title') return 'Compliance & Security';
    
    // Footer Sections
    if (key === 'footer.productTitle') return 'Products';
    if (key === 'footer.resourcesTitle') return 'Resources';
    if (key === 'footer.companyTitle') return 'Company';
    if (key === 'footer.allRightsReserved') return 'All rights reserved.';
    if (key === 'footer.terms') return 'Terms of Service';
    if (key === 'footer.privacy') return 'Privacy Policy';
    if (key === 'footer.cookies') return 'Cookie Policy';
    if (key === 'footer.documentation') return 'Documentation';
    if (key === 'footer.guides') return 'Guides';
    if (key === 'footer.support') return 'Support';
    if (key === 'footer.about') return 'About Us';
    if (key === 'footer.careers') return 'Careers';
    if (key === 'footer.partners') return 'Partners';
    
    // Buy Minutes Page
    if (key === 'buyMinutes.title') return 'Buy Call Minutes';
    if (key === 'buyMinutes.subtitle') return 'Purchase AI calling minutes for your outbound campaigns. Choose from flexible pricing plans with no long-term commitments required.';
    if (key === 'buyMinutes.selectPlan') return 'Select a Plan';
    if (key === 'buyMinutes.planIncludes') return 'All Plans Include';
    if (key === 'buyMinutes.feature1') return 'Advanced AI calling technology';
    if (key === 'buyMinutes.feature2') return 'Detailed analytics and reports';
    if (key === 'buyMinutes.feature3') return 'Email and chat support';
    if (key === 'buyMinutes.feature4') return 'CRM integrations';
    if (key === 'buyMinutes.callMinutes') return 'call minutes';
    
    // Pricing Plans
    if (key === 'pricing.perMinute') return 'per call minute';
    if (key === 'pricing.payg') return 'Pay-As-You-Go';
    if (key === 'pricing.subscription') return 'Subscription';
    
    console.warn(`No translation found for key: ${key}`);
    // If all else fails, return the key (but formatted to help debug)
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