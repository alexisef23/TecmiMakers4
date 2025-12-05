import { useState } from 'react';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  Route, 
  DollarSign, 
  BarChart3, 
  Settings, 
  LogOut
} from 'lucide-react';
import { DashboardHome } from './admin/DashboardHome';
import { RouteManagement } from './admin/RouteManagement';
import { FinanceModule } from './admin/FinanceModule';
import { ReportsAnalytics } from './admin/ReportsAnalytics';
import { SettingsModule } from './admin/SettingsModule';
import oxxoGoLogo from '../assets/oxxo-go-logo.png';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveModule = 'home' | 'routes' | 'finance' | 'reports' | 'settings';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeModule, setActiveModule] = useState<ActiveModule>('home');

  const menuItems = [
    { id: 'home' as const, label: 'Panel Principal', icon: LayoutDashboard },
    { id: 'routes' as const, label: 'Gestión de Rutas', icon: Route },
    { id: 'finance' as const, label: 'Finanzas', icon: DollarSign },
    { id: 'reports' as const, label: 'Reportes', icon: BarChart3 },
    { id: 'settings' as const, label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 lg:p-8">
          {/* Header con logo y botón de logout */}
          <div className="mb-4 flex items-center justify-between bg-blue-900 dark:bg-blue-950 text-white p-4 -m-4 mb-4 rounded-lg">
            <div className="flex items-center gap-3">
              <img src={oxxoGoLogo} alt="OXXO GO" className="w-10 h-10" />
              <span className="font-semibold">OXXO GO Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-white hover:bg-blue-800"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>

          {activeModule === 'home' && <DashboardHome />}
          {activeModule === 'routes' && <RouteManagement />}
          {activeModule === 'finance' && <FinanceModule />}
          {activeModule === 'reports' && <ReportsAnalytics />}
          {activeModule === 'settings' && <SettingsModule />}
        </div>
      </main>

      {/* Bottom Navigation - Visible en todas las plataformas */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t dark:border-slate-700 shadow-lg z-50">
        <div className="grid grid-cols-5 gap-1 p-2 max-w-screen-xl mx-auto">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex-col h-16 ${
                activeModule === item.id 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-white' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              onClick={() => setActiveModule(item.id)}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs truncate">{item.label.split(' ')[0]}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}