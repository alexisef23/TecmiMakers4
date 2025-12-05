import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Navigation, 
  Users, 
  Clock, 
  MapPin, 
  AlertCircle,
  LogOut,
  Menu,
  QrCode,
  UserX,
  MessageSquare,
  History,
  Play,
  Eye
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import oxxoGoLogo from '../assets/oxxo-go-logo.png';
import { GoogleMap } from './GoogleMap';

interface DriverAppProps {
  onLogout: () => void;
}

const currentTrip = {
  id: 'RT-001',
  route: 'Ruta Norte - Corporativo Central',
  startTime: '06:00',
  eta: '07:45',
  passengers: 12,
  stops: [
    { id: 1, name: 'Metro Indios Verdes', address: 'Av. Insurgentes Norte', time: '06:15', status: 'completed' },
    { id: 2, name: 'Plaza Lindavista', address: 'Av. Montevideo 363', time: '06:30', status: 'completed' },
    { id: 3, name: 'Politécnico', address: 'Av. IPN', time: '06:45', status: 'current' },
    { id: 4, name: 'Refinería', address: 'Av. 18 de Marzo', time: '07:15', status: 'pending' },
    { id: 5, name: 'Corporativo Central', address: 'Av. Reforma 500', time: '07:45', status: 'pending' },
  ],
};

const passengers = [
  { id: 1, name: 'María López', stop: 'Metro Indios Verdes', status: 'boarded', avatar: 'ML' },
  { id: 2, name: 'Carlos Ramírez', stop: 'Metro Indios Verdes', status: 'boarded', avatar: 'CR' },
  { id: 3, name: 'Ana Martínez', stop: 'Plaza Lindavista', status: 'boarded', avatar: 'AM' },
  { id: 4, name: 'Luis Torres', stop: 'Plaza Lindavista', status: 'boarded', avatar: 'LT' },
  { id: 5, name: 'Pedro Sánchez', stop: 'Politécnico', status: 'pending', avatar: 'PS' },
  { id: 6, name: 'Laura Gómez', stop: 'Politécnico', status: 'pending', avatar: 'LG' },
];

const upcomingTrips = [
  { id: 'RT-001', route: 'Ruta Norte - Regreso', time: '18:00', passengers: 10 },
  { id: 'RT-002', route: 'Ruta Norte - Mañana', time: '06:00 (Mañana)', passengers: 12 },
];

export function DriverApp({ onLogout }: DriverAppProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'navigation' | 'passengers' | 'history'>('dashboard');
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false);
  const [isSuggestionDialogOpen, setIsSuggestionDialogOpen] = useState(false);
  const [tripStarted, setTripStarted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile Header */}
      <div className="bg-emerald-600 dark:bg-emerald-800 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src={oxxoGoLogo} alt="OXXO GO" className="w-10 h-10" />
            <div>
              <h1 className="text-lg">App Conductor</h1>
              <p className="text-xs text-emerald-100 dark:text-emerald-200">Juan Pérez - VH-001</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-white hover:bg-emerald-700">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto p-4 pb-20">
        {activeView === 'dashboard' && (
          <div className="space-y-4">
            {/* Status Card */}
            <Card className="border-l-4 border-l-emerald-600 dark:bg-slate-900 dark:border-slate-700 dark:border-l-emerald-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Estado</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-3 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-lg dark:text-white">Disponible</span>
                    </div>
                  </div>
                  <Badge className="bg-emerald-600 dark:bg-emerald-700">En Servicio</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Hoy</p>
                    <p className="text-xl dark:text-white">2 viajes</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                    <p className="text-xl dark:text-white">22 pasajeros</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Trip */}
            <Card className="border-2 border-blue-600 dark:bg-slate-900 dark:border-slate-700 dark:border-blue-500">
              <CardHeader className="bg-blue-50 dark:bg-slate-800">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Navigation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Viaje Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Ruta</p>
                  <p className="font-semibold dark:text-white">{currentTrip.route}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Hora de Inicio</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span className="dark:text-white">{currentTrip.startTime}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">ETA Final</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="dark:text-white">{currentTrip.eta}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Pasajeros</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-lg dark:text-white">{currentTrip.passengers}</span>
                    <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">12 embarcados</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {!tripStarted ? (
                    <Button 
                      className="col-span-2 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setTripStarted(true)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Viaje
                    </Button>
                  ) : (
                    <>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => setActiveView('navigation')}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Navegar
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setActiveView('passengers')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Pasajeros
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => setIsIncidentDialogOpen(true)}
              >
                <AlertCircle className="w-6 h-6 mb-1 text-amber-600" />
                <span className="text-sm">Reportar Incidente</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => setIsSuggestionDialogOpen(true)}
              >
                <MessageSquare className="w-6 h-6 mb-1 text-blue-600" />
                <span className="text-sm">Sugerencias</span>
              </Button>
            </div>

            {/* Upcoming Trips */}
            <Card className="dark:bg-slate-900 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Próximos Viajes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <p className="font-medium dark:text-white">{trip.route}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{trip.time}</p>
                    </div>
                    <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">{trip.passengers} pax</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'navigation' && (
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setActiveView('dashboard')} className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-800">
              ← Volver
            </Button>

            {/* Map Real */}
            <Card className="dark:bg-slate-900 dark:border-slate-700">
              <CardContent className="p-0">
                <div className="h-80 rounded-t-lg relative overflow-hidden">
                  <GoogleMap
                    center={{ lat: 28.6460, lng: -106.1025 }}
                    zoom={13}
                    markers={currentTrip.stops.map((stop, index) => ({
                      position: { 
                        lat: 19.4326 + (Math.random() - 0.5) * 0.05, 
                        lng: -99.1332 + (Math.random() - 0.5) * 0.05 
                      },
                      title: stop.name,
                      type: 'stop'
                    }))}
                    showRoute={true}
                    className="rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow z-10">
                    <p className="text-sm dark:text-slate-400">Próxima parada</p>
                    <p className="font-semibold dark:text-white">Politécnico</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">500m - 2 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route Progress */}
            <Card className="dark:bg-slate-900 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Progreso de Ruta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentTrip.stops.map((stop, index) => (
                  <div key={stop.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stop.status === 'completed' 
                          ? 'bg-emerald-600 text-white' 
                          : stop.status === 'current'
                          ? 'bg-blue-600 text-white animate-pulse'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                      {index < currentTrip.stops.length - 1 && (
                        <div className={`w-0.5 h-12 ${
                          stop.status === 'completed' ? 'bg-emerald-600' : 'bg-slate-200'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium dark:text-white">{stop.name}</p>
                        <Badge variant={
                          stop.status === 'completed' ? 'default' : 
                          stop.status === 'current' ? 'default' : 'outline'
                        } className={
                          stop.status === 'completed' ? 'bg-emerald-600 dark:bg-emerald-700' :
                          stop.status === 'current' ? 'bg-blue-600 dark:bg-blue-700' : 'dark:border-slate-600 dark:text-slate-300'
                        }>
                          {stop.status === 'completed' ? 'Completado' :
                           stop.status === 'current' ? 'Actual' : stop.time}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{stop.address}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'passengers' && (
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setActiveView('dashboard')} className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-800">
              ← Volver
            </Button>

            <Card className="dark:bg-slate-900 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Lista de Pasajeros</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">{passengers.length} pasajeros totales</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {passengers.map((passenger) => (
                  <div key={passenger.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center">
                        {passenger.avatar}
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{passenger.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{passenger.stop}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {passenger.status === 'boarded' ? (
                        <Badge className="bg-emerald-600 dark:bg-emerald-700">Embarcado</Badge>
                      ) : (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-700">
                            <QrCode className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 dark:text-red-400 dark:border-slate-600 dark:hover:bg-slate-700">
                            <UserX className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'history' && (
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setActiveView('dashboard')} className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-800">
              ← Volver
            </Button>

            <Card className="dark:bg-slate-900 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Historial de Viajes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium dark:text-white">Ruta Norte - Corporativo</p>
                      <Badge className="bg-emerald-600 dark:bg-emerald-700">Completado</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div>18/11/2025</div>
                      <div>12 pasajeros</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t dark:border-slate-700 shadow-lg">
        <div className="max-w-lg mx-auto grid grid-cols-4 gap-1 p-2">
          <Button
            variant={activeView === 'dashboard' ? 'default' : 'ghost'}
            className={`flex-col h-16 ${activeView === 'dashboard' ? 'bg-emerald-600 dark:bg-emerald-700' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-xs">Inicio</span>
          </Button>
          <Button
            variant={activeView === 'navigation' ? 'default' : 'ghost'}
            className={`flex-col h-16 ${activeView === 'navigation' ? 'bg-emerald-600 dark:bg-emerald-700' : ''}`}
            onClick={() => setActiveView('navigation')}
          >
            <Navigation className="w-5 h-5 mb-1" />
            <span className="text-xs">Ruta</span>
          </Button>
          <Button
            variant={activeView === 'passengers' ? 'default' : 'ghost'}
            className={`flex-col h-16 ${activeView === 'passengers' ? 'bg-emerald-600 dark:bg-emerald-700' : ''}`}
            onClick={() => setActiveView('passengers')}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs">Pasajeros</span>
          </Button>
          <Button
            variant={activeView === 'history' ? 'default' : 'ghost'}
            className={`flex-col h-16 ${activeView === 'history' ? 'bg-emerald-600 dark:bg-emerald-700' : ''}`}
            onClick={() => setActiveView('history')}
          >
            <History className="w-5 h-5 mb-1" />
            <span className="text-xs">Historial</span>
          </Button>
        </div>
      </div>

      {/* Incident Dialog */}
      <Dialog open={isIncidentDialogOpen} onOpenChange={setIsIncidentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reportar Incidente</DialogTitle>
            <DialogDescription>
              Describe el incidente para notificar al equipo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Incidente</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traffic">Tráfico Intenso</SelectItem>
                  <SelectItem value="breakdown">Avería Mecánica</SelectItem>
                  <SelectItem value="accident">Accidente</SelectItem>
                  <SelectItem value="detour">Desvío Necesario</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea placeholder="Describe el incidente..." rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIncidentDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => setIsIncidentDialogOpen(false)}>
              Enviar Reporte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suggestion Dialog */}
      <Dialog open={isSuggestionDialogOpen} onOpenChange={setIsSuggestionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buzón de Sugerencias</DialogTitle>
            <DialogDescription>
              Comparte tus ideas para mejorar el servicio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sugerencia</Label>
              <Textarea placeholder="Escribe tu sugerencia..." rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuggestionDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsSuggestionDialogOpen(false)}>
              Enviar Sugerencia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}