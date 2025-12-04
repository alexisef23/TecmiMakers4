import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { Button } from './ui/button';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, colorBlindMode, toggleTheme, toggleColorBlindMode } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Toggle de Modo Oscuro */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative h-9 w-9"
        title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
      >
        {theme === 'light' ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-blue-400" />
        )}
      </Button>

      {/* Toggle de Modo Daltonismo */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleColorBlindMode}
        className="relative h-9 w-9"
        title={
          colorBlindMode === 'normal'
            ? 'Activar modo amigable para daltonismo'
            : 'Desactivar modo daltonismo'
        }
      >
        {colorBlindMode === 'normal' ? (
          <Eye className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        ) : (
          <EyeOff className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        )}
      </Button>
    </div>
  );
}
