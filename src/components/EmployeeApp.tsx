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
import { RankingView } from './RankingView';
import { GoogleMap } from './GoogleMap';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface EmployeeAppProps {
  onLogout: () => void;
}

// Importar imagen del avatar
import employeeAvatar from '../assets/employee-avatar.png.png';

const todayTransport = {
  pickupTime: '06:45',
  pickupLocation: 'Tu Ubicación Actual',
  address: 'Rastreando en tiempo real',
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
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-white/20">
              <AvatarImage 
                src={employeeAvatar} 
                alt="Profile" 
                className="object-cover"
              />
              <AvatarFallback className="bg-blue-500">
                <User className="h-7 w-7 text-white" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {userType === 'employee' ? 'Laura Rodríguez' : 'Roberto García'}
              </p>
              <p className="text-xs text-blue-100">
                {userType === 'employee' ? 'Empleado' : 'Líder de Tienda'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setUserType(userType === 'employee' ? 'leader' : 'employee')}
              className="text-white bg-white/10 hover:bg-white/20 text-xs border border-white/30"
            >
              {userType === 'employee' ? 'Ver como Líder' : 'Ver como Empleado'}
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-white hover:bg-blue-700">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto pb-20 p-4 space-y-4 bg-slate-50 min-h-screen">
        <Tabs value={userType} onValueChange={(v) => setUserType(v as 'employee' | 'leader')}>
          <TabsContent value="employee">
            {activeView === 'home' && (
              <div className="space-y-4">
                {/* Today's Transport Card */}
                <Card className="border-l-4 border-l-blue-600">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center gap-2">
                      <Bus className="w-5 h-5 text-blue-600" />
                      Mi Transporte de Hoy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Hora de Recogida</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span className="text-2xl">{todayTransport.pickupTime}</span>
                        </div>
                      </div>
                      <Badge className="bg-emerald-600">Programado</Badge>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600">Punto de Encuentro</p>
                      <div className="flex items-start gap-2 mt-1">
                        <MapPin className="w-5 h-5 text-slate-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{todayTransport.pickupLocation}</p>
                          <p className="text-sm text-slate-600">{todayTransport.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Conductor</span>
                        <span className="font-medium">{todayTransport.driver}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Vehículo</span>
                        <span className="font-medium">{todayTransport.vehicle}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Placas</span>
                        <span className="font-medium">{todayTransport.plate}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bus className="w-5 h-5 text-emerald-600" />
                        <p className="font-medium text-emerald-900">Tu transporte está cerca</p>
                      </div>
                      <p className="text-sm text-emerald-700">
                        Llegada estimada en <span className="font-semibold">{todayTransport.eta}</span>
                      </p>
                      <div className="mt-2">
                        <Progress value={80} className="h-2 bg-emerald-200 [&>div]:bg-emerald-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Employee Code Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <QrCode className="w-5 h-5 text-blue-600" />
                      Tu Código Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-lg text-center shadow-lg">
                      <p className="text-sm text-blue-100 mb-3">Código de Empleado</p>
                      <div className="text-6xl text-white tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>
                        {todayTransport.employeeCode}
                      </div>
                      <p className="text-sm text-blue-100">Proporciona este código al abordar</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Map */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mapa de Transporte en Tiempo Real</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="rounded-b-lg overflow-hidden" style={{ height: '400px' }}>
                      <GoogleMap
                        center={{ lat: 28.6460, lng: -106.1025 }}
                        zoom={12}
                        employeeMode={true}
                      />
                    </div>
                    <div className="p-4 bg-slate-50 border-t">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">Tu Ubicación Actual</p>
                          <p className="text-sm text-slate-600">Rastreando en tiempo real</p>
                          <p className="text-xs text-slate-500 mt-1">El punto azul muestra dónde estás ahora</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 mt-3 pt-3 border-t">
                        <Bus className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">Tu Transporte</p>
                          <p className="text-sm text-slate-600">Ubicado en Fashion Mall</p>
                          <p className="text-xs text-emerald-600 font-medium mt-1">Llegada estimada: {todayTransport.eta}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 mt-3 pt-3 border-t">
                        <Clock className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">Punto de Encuentro</p>
                          <p className="text-sm text-slate-600">{todayTransport.pickupLocation}</p>
                          <p className="text-xs text-slate-500 mt-1">{todayTransport.address} - {todayTransport.pickupTime}</p>
                        </div>
                      </div>
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
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notificaciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-3 rounded-lg border ${
                          notif.read 
                            ? 'bg-slate-50' 
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notif.type === 'info' ? 'bg-blue-100' :
                            notif.type === 'warning' ? 'bg-amber-100' :
                            'bg-emerald-100'
                          }`}>
                            {notif.type === 'info' && <Bell className="w-5 h-5 text-blue-600" />}
                            {notif.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                            {notif.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">{notif.message}</p>
                            <p className="text-xs text-slate-500 mt-1">{notif.time} atrás</p>
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
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Historial de Viajes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {tripHistory.map((trip) => (
                      <div key={trip.id} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{trip.route}</p>
                            <p className="text-sm text-slate-600">{trip.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-emerald-600 mb-1">{trip.status}</Badge>
                            <div className="flex items-center gap-1 text-sm">
                              {[...Array(trip.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
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
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl">18</p>
                      <p className="text-sm text-slate-600">Empleados Totales</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Bus className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                      <p className="text-2xl">3</p>
                      <p className="text-sm text-slate-600">Rutas Asignadas</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Transport Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estado de Transportes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div>
                        <p className="font-medium">Ruta Norte</p>
                        <p className="text-sm text-slate-600">12/12 embarcados</p>
                      </div>
                      <Badge className="bg-emerald-600">En ruta</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Ruta Sur</p>
                        <p className="text-sm text-slate-600">3/4 embarcados</p>
                      </div>
                      <Badge className="bg-blue-600">Abordando</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div>
                        <p className="font-medium">Ruta Centro</p>
                        <p className="text-sm text-slate-600">Retraso de 15 min</p>
                      </div>
                      <Badge className="bg-amber-600">Retrasado</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Employee List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Empleados Asignados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {storeEmployees.map((emp) => (
                      <div key={emp.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{emp.name}</p>
                            <p className="text-xs text-slate-600">{emp.route} - {emp.pickup}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            emp.status === 'embarcado' ? 'default' :
                            emp.status === 'no-show' ? 'destructive' : 'secondary'
                          }
                          className={emp.status === 'embarcado' ? 'bg-emerald-600' : ''}
                        >
                          {emp.status === 'embarcado' ? 'Embarcado' :
                           emp.status === 'no-show' ? 'No Show' : 'Pendiente'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Critical Alerts */}
                <Card className="border-l-4 border-l-amber-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      Alertas Críticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm">Retraso en Ruta Centro - 15 minutos</p>
                      <p className="text-xs text-slate-600 mt-1">Hace 10 minutos</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm">Luis Torres marcado como No-Show</p>
                      <p className="text-xs text-slate-600 mt-1">Hace 5 minutos</p>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className={`max-w-lg mx-auto ${userType === 'leader' ? 'flex justify-center' : 'grid grid-cols-4 gap-1'} p-2`}>
          <Button
            variant={activeView === 'home' ? 'default' : 'ghost'}
            className={`flex-col h-14 ${activeView === 'home' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveView('home')}
          >
            <Menu className="w-4 h-4 mb-1" />
            <span className="text-xs">Inicio</span>
          </Button>
          {userType === 'employee' && (
            <>
              <Button
                variant={activeView === 'notifications' ? 'default' : 'ghost'}
                className={`flex-col h-14 relative ${activeView === 'notifications' ? 'bg-blue-600' : ''}`}
                onClick={() => setActiveView('notifications')}
              >
                <Bell className="w-4 h-4 mb-1" />
                <span className="text-xs">Alertas</span>
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </Button>
              <Button
                variant={activeView === 'ranking' ? 'default' : 'ghost'}
                className={`flex-col h-14 ${activeView === 'ranking' ? 'bg-blue-600' : ''}`}
                onClick={() => setActiveView('ranking')}
              >
                <Trophy className="w-4 h-4 mb-1" />
                <span className="text-xs">Ranking</span>
              </Button>
              <Button
                variant={activeView === 'history' ? 'default' : 'ghost'}
                className={`flex-col h-14 ${activeView === 'history' ? 'bg-blue-600' : ''}`}
                onClick={() => setActiveView('history')}
              >
                <History className="w-4 h-4 mb-1" />
                <span className="text-xs">Historial</span>
              </Button>
            </>
          )}
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