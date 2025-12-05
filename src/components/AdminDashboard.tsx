import { useState } from 'react';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  Route, 
  DollarSign, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'home' as const, label: 'Panel Principal', icon: LayoutDashboard },
    { id: 'routes' as const, label: 'Gestión de Rutas', icon: Route },
    { id: 'finance' as const, label: 'Finanzas', icon: DollarSign },
    { id: 'reports' as const, label: 'Reportes', icon: BarChart3 },
    { id: 'settings' as const, label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside 
        className={`bg-blue-900 dark:bg-blue-950 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        } flex flex-col`}
      >
        <div className="p-4 border-b border-blue-800 dark:border-blue-900 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <img src={oxxoGoLogo} alt="OXXO GO" className="w-10 h-10" />
              <span className="font-semibold">OXXO GO</span>
            </div>
          ) : (
            <img src={oxxoGoLogo} alt="OXXO GO" className="w-8 h-8 mx-auto hidden lg:block" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-blue-800 dark:hover:bg-blue-900 lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeModule === item.id ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${
                activeModule === item.id 
                  ? 'bg-white text-blue-900 hover:bg-white' 
                  : 'text-white hover:bg-blue-800'
              } ${!sidebarOpen && 'lg:justify-center'}`}
              onClick={() => setActiveModule(item.id)}
            >
              <item.icon className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : ''}`} />
              {sidebarOpen && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-blue-800 dark:hover:bg-blue-900 ${
              !sidebarOpen && 'lg:justify-center'
            }`}
            onClick={onLogout}
          >
            <LogOut className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : ''}`} />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-8">
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {activeModule === 'home' && <DashboardHome />}
          {activeModule === 'routes' && <RouteManagement />}
          {activeModule === 'finance' && <FinanceModule />}
          {activeModule === 'reports' && <ReportsAnalytics />}
          {activeModule === 'settings' && <SettingsModule />}
        </div>
      </main>
    </div>
  );
}