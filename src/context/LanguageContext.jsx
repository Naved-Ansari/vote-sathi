import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('votesathi-lang') || 'en');

  useEffect(() => {
    localStorage.setItem('votesathi-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.style.fontFamily = lang === 'hi'
      ? 'var(--font-family-hindi)' : 'var(--font-family)';
  }, [lang]);

  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) {
      val = val?.[k];
    }
    return val || key;
  };

  const toggleLang = () => setLang(l => l === 'en' ? 'hi' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
