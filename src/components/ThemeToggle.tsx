import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { Button } from './ui/button';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative h-9 w-9 bg-white/10 dark:bg-slate-700 hover:bg-white/20 dark:hover:bg-slate-600 border border-white/20 dark:border-slate-600"
        title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
      >
        {theme === 'light' ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-blue-300" />
        )}
      </Button>
    </div>
  );
}
