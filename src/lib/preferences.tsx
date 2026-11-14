import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Language } from '../data/applications';
type Theme = 'dark' | 'light';
const Preferences = createContext<{
  language: Language;
  theme: Theme;
  setLanguage: (value: Language) => void;
  toggleTheme: () => void;
} | null>(null);
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(
    document.documentElement.lang === 'fr' ? 'fr' : 'en',
  );
  const [theme, setTheme] = useState<Theme>(
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('cpsi-language', language);
    } catch {
      /* Session still works. */
    }
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#101114' : '#ffffff');
    try {
      localStorage.setItem('cpsi-theme', theme);
    } catch {
      /* Session still works. */
    }
  }, [theme]);
  return (
    <Preferences.Provider
      value={{
        language,
        theme,
        setLanguage,
        toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      }}
    >
      {children}
    </Preferences.Provider>
  );
}
export function usePreferences() {
  const value = useContext(Preferences);
  if (!value) throw new Error('PreferencesProvider required');
  return value;
}
export function useCopy() {
  const { language } = usePreferences();
  return (en: string, fr: string) => (language === 'en' ? en : fr);
}
