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
    const translations: Record<Language, any> = {
      ID: idTranslations,
      EN: enTranslations,
    };

    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }

    if (typeof value === 'string') return value;
    
    // Fallback to ID if English is missing
    if (language === 'EN') {
      let fallbackValue = idTranslations as any;
      for (const k of keys) {
        if (fallbackValue === undefined) break;
        fallbackValue = fallbackValue[k];
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
