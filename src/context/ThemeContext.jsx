import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('votesathi-theme') || 'light');
  const [contrast, setContrast] = useState(() => localStorage.getItem('votesathi-contrast') || 'normal');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('votesathi-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', contrast);
    localStorage.setItem('votesathi-contrast', contrast);
  }, [contrast]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const toggleContrast = () => setContrast(c => c === 'normal' ? 'high' : 'normal');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, contrast, toggleContrast }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
