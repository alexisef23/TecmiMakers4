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
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar - Solo visible en desktop */}
      <aside 
        className={`max-lg:hidden flex bg-blue-900 dark:bg-blue-950 text-white transition-all duration-300 flex-col shadow-xl border-r-4 border-blue-600 dark:border-blue-700 ${
          sidebarOpen ? 'w-64' : 'w-24'
        }`}
        style={{ minWidth: sidebarOpen ? '16rem' : '6rem' }}
      >
        <div className="p-4 border-b border-blue-800 dark:border-blue-900 flex items-center justify-between">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-3">
                <img src={oxxoGoLogo} alt="OXXO GO" className="w-10 h-10" />
                <span className="font-semibold">OXXO GO</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:bg-blue-800 h-8 w-8"
              >
                <X className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="text-white hover:bg-blue-700 h-12 w-12 bg-blue-800"
              >
                <Menu className="w-7 h-7" />
              </Button>
            </div>
          )}
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
              } ${!sidebarOpen && 'justify-center h-14 w-14 mx-auto my-2'}`}
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
              !sidebarOpen && 'justify-center h-14 w-14 mx-auto'
            }`}
            onClick={onLogout}
          >
            <LogOut className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : ''}`} />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="p-4 lg:p-8">
          {/* Header móvil con logo */}
          <div className="lg:hidden mb-4 flex items-center justify-between bg-blue-900 dark:bg-blue-950 text-white p-4 -m-4 mb-4">
            <div className="flex items-center gap-3">
              <img src={oxxoGoLogo} alt="OXXO GO" className="w-10 h-10" />
              <span className="font-semibold">OXXO GO</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-white hover:bg-blue-800"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {activeModule === 'home' && <DashboardHome />}
          {activeModule === 'routes' && <RouteManagement />}
          {activeModule === 'finance' && <FinanceModule />}
          {activeModule === 'reports' && <ReportsAnalytics />}
          {activeModule === 'settings' && <SettingsModule />}
        </div>
      </main>

      {/* Bottom Navigation - Solo móvil */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t dark:border-slate-700 shadow-lg z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
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