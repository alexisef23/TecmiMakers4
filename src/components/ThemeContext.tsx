import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ColorBlindMode = 'normal' | 'colorblind';

interface ThemeContextType {
  theme: Theme;
  colorBlindMode: ColorBlindMode;
  toggleTheme: () => void;
  toggleColorBlindMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('oxxo-theme');
    return (saved as Theme) || 'light';
  });

  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>(() => {
    const saved = localStorage.getItem('oxxo-colorblind');
    return (saved as ColorBlindMode) || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('oxxo-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('oxxo-colorblind', colorBlindMode);
    if (colorBlindMode === 'colorblind') {
      document.documentElement.classList.add('colorblind');
    } else {
      document.documentElement.classList.remove('colorblind');
    }
  }, [colorBlindMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleColorBlindMode = () => {
    setColorBlindMode((prev) => (prev === 'normal' ? 'colorblind' : 'normal'));
  };

  return (
    <ThemeContext.Provider value={{ theme, colorBlindMode, toggleTheme, toggleColorBlindMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
