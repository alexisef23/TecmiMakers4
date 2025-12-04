import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { DriverApp } from './components/DriverApp';
import { EmployeeApp } from './components/EmployeeApp';
import { LoadingScreen } from './components/LoadingScreen';
import { ThemeProvider } from './components/ThemeContext';

type AppView = 'login' | 'admin' | 'driver' | 'employee';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [userType, setUserType] = useState<'admin' | 'driver' | 'employee'>('admin');

  const handleLogin = (type: 'admin' | 'driver' | 'employee') => {
    setUserType(type);
    if (type === 'admin') {
      setCurrentView('admin');
    } else if (type === 'driver') {
      setCurrentView('driver');
    } else {
      setCurrentView('employee');
    }
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {currentView === 'login' && <LoginPage onLogin={handleLogin} />}
        {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} />}
        {currentView === 'driver' && <DriverApp onLogout={handleLogout} />}
        {currentView === 'employee' && <EmployeeApp onLogout={handleLogout} />}
      </div>
    </ThemeProvider>
  );
}