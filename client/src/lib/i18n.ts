import { defaultLanguage, supportedLanguages } from '@/types';
import en from '@/locales/en';
import nl from '@/locales/nl';
import de from '@/locales/de';
import es from '@/locales/es';
import fr from '@/locales/fr';

// All locale data
const locales = {
  en,
  nl,
  de,
  es,
  fr
};

// Make sure all the translation files are loaded
// This prevents errors from undefined imports
const safeLocales = {
  en: en || {},
  nl: nl || {},
  de: de || {},
  es: es || {},
  fr: fr || {}
};

export type LocaleKey = keyof typeof locales;

// Function to get translations for a specified language
export const getTranslations = (language: LocaleKey = defaultLanguage) => {
  if (!Object.keys(safeLocales).includes(language)) {
    console.warn(`Language "${language}" not found, falling back to default language "${defaultLanguage}"`);
    return safeLocales[defaultLanguage];
  }
  
  return safeLocales[language];
};

// Safely access nested properties
function getNestedProperty(obj: any, path: string): any {
  if (!obj || typeof obj !== 'object') return undefined;
  if (!path) return obj;
  
  try {
    const parts = path.split('.');
    let current = obj;
    
    for (const part of parts) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }
      current = current[part];
    }
    
    return current;
  } catch (error) {
    console.error(`Error accessing nested property ${path}:`, error);
    return undefined;
  }
}

// Function to get a specific translation value using a dot-notation path
export const getTranslationValue = (language: LocaleKey, path: string) => {
  try {
    const translations = getTranslations(language);
    
    // Try to get the translation using the safe nested property accessor
    const result = getNestedProperty(translations, path);
    
    // For debugging - help identify missing translations
    if (result === undefined) {
      console.warn(`Translation key "${path}" not found in ${language} locale`);
    }
    
    return result;
  } catch (error) {
    console.error(`Error retrieving translation for key "${path}"`, error);
    return undefined;
  }
};

// Function to detect the user's browser language
export const detectBrowserLanguage = (): LocaleKey => {
  try {
    // Get the browser language or fallback to default
    const browserLang = navigator.language.split('-')[0];
    
    if (Object.keys(supportedLanguages).includes(browserLang)) {
      return browserLang as LocaleKey;
    }
  } catch (error) {
    console.warn('Error detecting browser language:', error);
  }
  
  return defaultLanguage;
};

// Export a hardcoded English fallback translations object
// This is used when translations are missing in both the selected and default language
export const fallbackTranslations = {
  // Navigation
  'nav.features': 'Features',
  'nav.pricing': 'Pricing',
  'nav.solutions': 'Solutions',
  'nav.testimonials': 'Testimonials',
  'nav.blog': 'Blog',
  'nav.requestDemo': 'Request Demo',
  'nav.buyMinutes': 'Buy Call Minutes',
  'nav.language': 'Language',
  'nav.contact': 'Contact',
  
  // Hero Section
  'hero.title': 'Revolutionize Your',
  'hero.titleHighlight': 'Outreach',
  'hero.description': 'ReachImpact uses advanced AI technology to automate your sales and marketing calls, helping you generate more leads, schedule meetings, and improve sales effectiveness—all without lifting a finger.',
  'hero.requestDemo': 'Request Demo',
  'hero.buyMinutes': 'Buy Call Minutes',
  
  // Trusted By Section
  'trustedBy.title': 'Trusted by forward-thinking companies',
  
  // Features
  'features.title': 'Powerful Features That Drive Results',
  'features.subtitle': 'Our AI-powered platform offers everything you need to automate and enhance your outbound calling strategy.',
  
  // Solutions
  'solutions.title': 'Tailored Solutions For Every Industry',
  'solutions.subtitle': 'ReachImpact is versatile and adaptable to the unique needs of different industries.',
  
  // Pricing
  'pricing.title': 'Simple, Transparent Pricing',
  'pricing.subtitle': 'Choose the plan that works best for your business needs.',
  'pricing.payg': 'Pay-As-You-Go',
  'pricing.subscription': 'Subscription',
  'pricing.perMinute': 'per call minute',
  
  // Testimonials
  'testimonials.title': 'What Our Customers Say',
  'testimonials.subtitle': 'Don\'t just take our word for it—hear from businesses who have transformed their outreach with ReachImpact.',
  
  // How It Works
  'howItWorks.title': 'How ReachImpact Works',
  'howItWorks.subtitle': 'Our streamlined process makes it easy to get started and see results fast.',
  
  // Footer
  'footer.productTitle': 'Products',
  'footer.resourcesTitle': 'Resources',
  'footer.companyTitle': 'Company',
  'footer.allRightsReserved': 'All rights reserved.',
  'footer.terms': 'Terms of Service',
  'footer.privacy': 'Privacy Policy',
  'footer.cookies': 'Cookie Policy',
  'footer.documentation': 'Documentation',
  'footer.guides': 'Guides',
  'footer.support': 'Support',
  'footer.about': 'About Us',
  'footer.careers': 'Careers',
  'footer.partners': 'Partners',
  
  // Buy Minutes
  'buyMinutes.title': 'Buy Call Minutes',
  'buyMinutes.subtitle': 'Purchase AI calling minutes for your outbound campaigns. Choose from flexible pricing plans with no long-term commitments required.',
};

export default locales;