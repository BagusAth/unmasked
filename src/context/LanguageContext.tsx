import React, { createContext, useContext, useState, type ReactNode } from 'react';
import idTranslations from '../locales/id.json';
import enTranslations from '../locales/en.json';

type Language = 'ID' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ID';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translations: Record<Language, Record<string, unknown>> = {
      ID: idTranslations as Record<string, unknown>,
      EN: enTranslations as Record<string, unknown>,
    };

    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value === undefined || value === null || typeof value !== 'object') break;
      value = (value as Record<string, unknown>)[k];
    }

    if (typeof value === 'string') return value;
    
    // Fallback to ID if English is missing
    if (language === 'EN') {
      let fallbackValue: unknown = idTranslations;
      for (const k of keys) {
        if (fallbackValue === undefined || fallbackValue === null || typeof fallbackValue !== 'object') break;
        fallbackValue = (fallbackValue as Record<string, unknown>)[k];
      }
      if (typeof fallbackValue === 'string') return fallbackValue;
    }

    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
