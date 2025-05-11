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

export type LocaleKey = keyof typeof locales;

// Function to get translations for a specified language
export const getTranslations = (language: LocaleKey = defaultLanguage) => {
  if (!Object.keys(locales).includes(language)) {
    console.warn(`Language "${language}" not found, falling back to default language "${defaultLanguage}"`);
    return locales[defaultLanguage];
  }
  
  return locales[language];
};

// Function to get a specific translation value using a dot-notation path
export const getTranslationValue = (language: LocaleKey, path: string) => {
  const translations = getTranslations(language);
  const keys = path.split('.');
  
  return keys.reduce((obj, key) => {
    return obj && (obj as any)[key] !== undefined ? (obj as any)[key] : undefined;
  }, translations);
};

// Function to detect the user's browser language
export const detectBrowserLanguage = (): LocaleKey => {
  try {
    const browserLang = navigator.language.split('-')[0];
    
    if (Object.keys(supportedLanguages).includes(browserLang)) {
      return browserLang as LocaleKey;
    }
  } catch (error) {
    console.warn('Error detecting browser language:', error);
  }
  
  return defaultLanguage;
};

export default locales;
