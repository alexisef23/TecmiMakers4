import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Bus, User, Shield } from 'lucide-react';
import { OxxoLogo } from './OxxoLogo';
import { ThemeToggle } from './ThemeToggle';

interface LoginPageProps {
  onLogin: (type: 'admin' | 'driver' | 'employee') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (type: 'admin' | 'driver' | 'employee') => (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(type);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 p-4 relative">
      {/* Theme Toggle - Fixed at top right */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img 
              src="/src/assets/oxxo-go-logo.png" 
              alt="OXXO GO Logo" 
              className="w-32 h-32 drop-shadow-2xl rounded-3xl"
            />
          </div>
          <h1 className="text-white mb-2 text-4xl font-bold drop-shadow-lg">OXXO GO</h1>
          <p className="text-white/90 drop-shadow">Sistema de Gestión de Transporte Corporativo</p>
        </div>

        <Card className="shadow-2xl dark:bg-slate-900 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Iniciar Sesión</CardTitle>
            <CardDescription className="dark:text-slate-400">Selecciona tu tipo de usuario</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 dark:bg-slate-800">
                <TabsTrigger value="admin" className="flex items-center gap-1 dark:data-[state=active]:bg-slate-700">
                  <Shield className="w-4 h-4" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="driver" className="flex items-center gap-1 dark:data-[state=active]:bg-slate-700">
                  <Bus className="w-4 h-4" />
                  Conductor
                </TabsTrigger>
                <TabsTrigger value="employee" className="flex items-center gap-1 dark:data-[state=active]:bg-slate-700">
                  <User className="w-4 h-4" />
                  Empleado
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin">
                <form onSubmit={handleSubmit('admin')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="dark:text-slate-300">Correo electrónico</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="dark:text-slate-300">Contraseña</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
                    Acceder al Dashboard
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="driver">
                <form onSubmit={handleSubmit('driver')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver-email" className="dark:text-slate-300">Correo electrónico</Label>
                    <Input
                      id="driver-email"
                      type="email"
                      placeholder="conductor@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-password" className="dark:text-slate-300">Contraseña</Label>
                    <Input
                      id="driver-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800">
                    Acceder a App Conductor
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="employee">
                <form onSubmit={handleSubmit('employee')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-email" className="dark:text-slate-300">Correo electrónico</Label>
                    <Input
                      id="employee-email"
                      type="email"
                      placeholder="empleado@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-password" className="dark:text-slate-300">Contraseña</Label>
                    <Input
                      id="employee-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800">
                    Acceder a App Empleado
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-white/90 mt-6 drop-shadow">
          © 2025 OXXO GO - Transporte Corporativo
        </p>
      </div>
    </div>
  );
}