import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Bus, 
  Clock, 
  MapPin, 
  QrCode,
  LogOut,
  Menu,
  Star,
  MessageSquare,
  History,
  Users,
  Bell,
  AlertTriangle,
  CheckCircle,
  Trophy,
  User
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { OxxoLogo } from './OxxoLogo';
import { ThemeToggle } from './ThemeToggle';
import { RankingView } from './RankingView';
import { GoogleMap } from './GoogleMap';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface EmployeeAppProps {
  onLogout: () => void;
}

const happyCatImage = 'https://images.unsplash.com/photo-1761249257124-ab02fc22c5b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMG9yYW5nZSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDgwNzA1Mnww&ixlib=rb-4.1.0&q=80&w=400';

const todayTransport = {
  pickupTime: '06:45',
  pickupLocation: 'Metro Politécnico',
  address: 'Av. IPN 2580',
  driver: 'Juan Pérez',
  vehicle: 'Mercedes Sprinter',
  plate: 'ABC-1234',
  eta: '5 minutos',
  route: 'Ruta Norte',
  employeeCode: '47832', // Código de 5 dígitos
};

const notifications = [
  { id: 1, type: 'info', message: 'Tu transporte está a 5 minutos', time: '5 min', read: false },
  { id: 2, type: 'warning', message: 'Retraso de 10 minutos en tu ruta', time: '15 min', read: false },
  { id: 3, type: 'success', message: 'Viaje completado exitosamente', time: '1 día', read: true },
];

const tripHistory = [
  { id: 1, date: '2025-11-18', route: 'Ruta Norte', status: 'Completado', rating: 5 },
  { id: 2, date: '2025-11-17', route: 'Ruta Norte', status: 'Completado', rating: 5 },
  { id: 3, date: '2025-11-16', route: 'Ruta Norte', status: 'Completado', rating: 4 },
  { id: 4, date: '2025-11-15', route: 'Ruta Norte', status: 'Completado', rating: 5 },
];

const storeEmployees = [
  { id: 1, name: 'María López', route: 'Ruta Norte', status: 'embarcado', pickup: '06:15' },
  { id: 2, name: 'Carlos Ramírez', route: 'Ruta Norte', status: 'embarcado', pickup: '06:15' },
  { id: 3, name: 'Ana Martínez', route: 'Ruta Sur', status: 'embarcado', pickup: '06:30' },
  { id: 4, name: 'Luis Torres', route: 'Ruta Sur', status: 'no-show', pickup: '06:30' },
  { id: 5, name: 'Pedro Sánchez', route: 'Ruta Centro', status: 'pendiente', pickup: '07:00' },
];

export function EmployeeApp({ onLogout }: EmployeeAppProps) {
  const [userType, setUserType] = useState<'employee' | 'leader'>('employee');
  const [activeView, setActiveView] = useState<'home' | 'notifications' | 'history' | 'ranking'>('home');
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile Header */}
      <div className="bg-blue-600 dark:bg-blue-800 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <OxxoLogo size={40} />
            <div>
              <h1 className="text-lg">OXXO GO</h1>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={happyCatImage} alt="Profile" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs text-blue-100">
                  {userType === 'employee' ? 'Laura Rodríguez - Empleado' : 'Roberto García - Líder de Tienda'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setUserType(userType === 'employee' ? 'leader' : 'employee')}
              className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 text-xs"
            >
              {userType === 'employee' ? 'Ver como Líder' : 'Ver como Empleado'}
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-white hover:bg-blue-700 dark:hover:bg-blue-900">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto p-4 pb-20">
        <Tabs value={userType} onValueChange={(v) => setUserType(v as 'employee' | 'leader')}>
          <TabsContent value="employee">
            {activeView === 'home' && (
              <div className="space-y-4">
                {/* Today's Transport Card */}
                <Card className="border-l-4 border-l-blue-600 dark:bg-slate-900 dark:border-l-blue-500">
                  <CardHeader className="bg-blue-50 dark:bg-slate-800">
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Bus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Mi Transporte de Hoy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4 dark:bg-slate-900">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Hora de Recogida</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-2xl dark:text-white">{todayTransport.pickupTime}</span>
                        </div>
                      </div>
                      <Badge className="bg-emerald-600">Programado</Badge>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Punto de Encuentro</p>
                      <div className="flex items-start gap-2 mt-1">
                        <MapPin className="w-5 h-5 text-slate-500 dark:text-slate-400 mt-0.5" />
                        <div>
                          <p className="font-medium dark:text-white">{todayTransport.pickupLocation}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{todayTransport.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Conductor</span>
                        <span className="font-medium dark:text-white">{todayTransport.driver}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Vehículo</span>
                        <span className="font-medium dark:text-white">{todayTransport.vehicle}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Placas</span>
                        <span className="font-medium dark:text-white">{todayTransport.plate}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <p className="font-medium text-emerald-900 dark:text-emerald-100">Tu transporte está cerca</p>
                      </div>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        Llegada estimada en <span className="font-semibold">{todayTransport.eta}</span>
                      </p>
                      <div className="mt-2">
                        <Progress value={80} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Employee Code Card */}
                <Card className="dark:bg-slate-900 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg dark:text-white">
                      <QrCode className="w-5 h-5 dark:text-blue-400" />
                      Tu Código Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 p-8 rounded-lg text-center shadow-lg">
                      <p className="text-sm text-blue-100 dark:text-blue-200 mb-3">Código de Empleado</p>
                      <div className="text-6xl text-white tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>
                        {todayTransport.employeeCode}
                      </div>
                      <p className="text-sm text-blue-100 dark:text-blue-200">Proporciona este código al abordar</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Map */}
                <Card className="dark:bg-slate-900 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Ubicación en Tiempo Real</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="dark:border dark:border-slate-700 rounded-b-lg overflow-hidden">
                      <GoogleMap />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => setIsSurveyOpen(true)}
                  >
                    <Star className="w-6 h-6 mb-1 text-amber-500" />
                    <span className="text-sm">Calificar Servicio</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => setIsSuggestionOpen(true)}
                  >
                    <MessageSquare className="w-6 h-6 mb-1 text-blue-600" />
                    <span className="text-sm">Sugerencias</span>
                  </Button>
                </div>
              </div>
            )}

            {activeView === 'notifications' && (
              <div className="space-y-4">
                <Card className="dark:bg-slate-900 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Notificaciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-3 rounded-lg border ${
                          notif.read 
                            ? 'bg-slate-50 dark:bg-slate-800 dark:border-slate-700' 
                            : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            notif.type === 'info' ? 'bg-blue-100 dark:bg-blue-900' :
                            notif.type === 'warning' ? 'bg-amber-100 dark:bg-amber-900' :
                            'bg-emerald-100 dark:bg-emerald-900'
                          }`}>
                            {notif.type === 'info' && <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                            {notif.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                            {notif.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm dark:text-white">{notif.message}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notif.time} atrás</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === 'history' && (
              <div className="space-y-4">
                <Card className="dark:bg-slate-900 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Historial de Viajes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {tripHistory.map((trip) => (
                      <div key={trip.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium dark:text-white">{trip.route}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{trip.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-emerald-600 dark:bg-emerald-700 mb-1">{trip.status}</Badge>
                            <div className="flex items-center gap-1 text-sm">
                              {[...Array(trip.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 dark:fill-amber-500 dark:text-amber-500" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === 'ranking' && (
              <RankingView currentEmployeeId={1} />
            )}
          </TabsContent>

          <TabsContent value="leader">
            {activeView === 'home' && (
              <div className="space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="dark:bg-slate-900 dark:border-slate-700">
                    <CardContent className="pt-6 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                      <p className="text-2xl dark:text-white">18</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Empleados Totales</p>
                    </CardContent>
                  </Card>
                  <Card className="dark:bg-slate-900 dark:border-slate-700">
                    <CardContent className="pt-6 text-center">
                      <Bus className="w-8 h-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-2xl dark:text-white">3</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Rutas Asignadas</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Transport Status */}
                <Card className="dark:bg-slate-900 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Estado de Transportes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div>
                        <p className="font-medium dark:text-white">Ruta Norte</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">12/12 embarcados</p>
                      </div>
                      <Badge className="bg-emerald-600 dark:bg-emerald-700">En ruta</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div>
                        <p className="font-medium dark:text-white">Ruta Sur</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">3/4 embarcados</p>
                      </div>
                      <Badge className="bg-blue-600 dark:bg-blue-700">Abordando</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div>
                        <p className="font-medium dark:text-white">Ruta Centro</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Retraso de 15 min</p>
                      </div>
                      <Badge className="bg-amber-600 dark:bg-amber-700">Retrasado</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Employee List */}
                <Card className="dark:bg-slate-900 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Users className="w-5 h-5 dark:text-blue-400" />
                      Empleados Asignados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {storeEmployees.map((emp) => (
                      <div key={emp.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center text-sm">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-sm dark:text-white">{emp.name}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">{emp.route} - {emp.pickup}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            emp.status === 'embarcado' ? 'default' :
                            emp.status === 'no-show' ? 'destructive' : 'secondary'
                          }
                          className={emp.status === 'embarcado' ? 'bg-emerald-600 dark:bg-emerald-700' : ''}
                        >
                          {emp.status === 'embarcado' ? 'Embarcado' :
                           emp.status === 'no-show' ? 'No Show' : 'Pendiente'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Critical Alerts */}
                <Card className="border-l-4 border-l-amber-500 dark:bg-slate-900 dark:border-slate-700 dark:border-l-amber-600">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg dark:text-white">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      Alertas Críticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <p className="text-sm dark:text-white">Retraso en Ruta Centro - 15 minutos</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Hace 10 minutos</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm dark:text-white">Luis Torres marcado como No-Show</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Hace 5 minutos</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16">
                    Modificar Asignación
                  </Button>
                  <Button variant="outline" className="h-16">
                    Reportar Ausencia
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t dark:border-slate-700 shadow-lg">
        <div className="max-w-lg mx-auto grid grid-cols-4 gap-1 p-2">
          <Button
            variant={activeView === 'home' ? 'default' : 'ghost'}
            className={`flex-col h-14 ${activeView === 'home' ? 'bg-blue-600 dark:bg-blue-700' : ''}`}
            onClick={() => setActiveView('home')}
          >
            <Menu className="w-4 h-4 mb-1" />
            <span className="text-xs">Inicio</span>
          </Button>
          <Button
            variant={activeView === 'notifications' ? 'default' : 'ghost'}
            className={`flex-col h-14 relative ${activeView === 'notifications' ? 'bg-blue-600 dark:bg-blue-700' : ''}`}
            onClick={() => setActiveView('notifications')}
          >
            <Bell className="w-4 h-4 mb-1" />
            <span className="text-xs">Alertas</span>
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </Button>
          <Button
            variant={activeView === 'ranking' ? 'default' : 'ghost'}
            className={`flex-col h-14 ${activeView === 'ranking' ? 'bg-blue-600 dark:bg-blue-700' : ''}`}
            onClick={() => setActiveView('ranking')}
          >
            <Trophy className="w-4 h-4 mb-1" />
            <span className="text-xs">Ranking</span>
          </Button>
          <Button
            variant={activeView === 'history' ? 'default' : 'ghost'}
            className={`flex-col h-14 ${activeView === 'history' ? 'bg-blue-600 dark:bg-blue-700' : ''}`}
            onClick={() => setActiveView('history')}
          >
            <History className="w-4 h-4 mb-1" />
            <span className="text-xs">Historial</span>
          </Button>
        </div>
      </div>

      {/* Survey Dialog */}
      <Dialog open={isSurveyOpen} onOpenChange={setIsSurveyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Califica tu Experiencia</DialogTitle>
            <DialogDescription>
              Ayúdanos a mejorar el servicio de transporte
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center">
              <p className="text-sm mb-3">¿Cómo fue tu viaje?</p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-10 h-10 ${
                        star <= rating 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-slate-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Comentarios (opcional)</Label>
              <Textarea placeholder="Cuéntanos más sobre tu experiencia..." rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSurveyOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsSurveyOpen(false)}>
              Enviar Calificación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suggestion Dialog */}
      <Dialog open={isSuggestionOpen} onOpenChange={setIsSuggestionOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buzón de Sugerencias</DialogTitle>
            <DialogDescription>
              Comparte tus ideas para mejorar el servicio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Sugerencia</Label>
              <Textarea placeholder="Escribe tu sugerencia..." rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuggestionOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsSuggestionOpen(false)}>
              Enviar Sugerencia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}