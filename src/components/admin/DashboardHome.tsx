import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Clock, 
  Bus, 
  DollarSign, 
  ThumbsUp, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { GoogleMap } from '../GoogleMap';

const kpiData = [
  { name: 'Lun', puntualidad: 94 },
  { name: 'Mar', puntualidad: 92 },
  { name: 'Mie', puntualidad: 96 },
  { name: 'Jue', puntualidad: 91 },
  { name: 'Vie', puntualidad: 95 },
  { name: 'Sab', puntualidad: 97 },
  { name: 'Dom', puntualidad: 98 },
];

const serviceData = [
  { name: 'Lun', servicios: 45 },
  { name: 'Mar', servicios: 48 },
  { name: 'Mie', servicios: 52 },
  { name: 'Jue', servicios: 47 },
  { name: 'Vie', servicios: 50 },
  { name: 'Sab', servicios: 30 },
  { name: 'Dom', servicios: 25 },
];

const activeRoutes = [
  { id: 1, name: 'Ruta Fashion Mall', vehicle: 'VH-001', status: 'En ruta', passengers: 12, lat: 28.6272, lng: -106.1135 },
  { id: 2, name: 'Ruta Distrito 1', vehicle: 'VH-003', status: 'En ruta', passengers: 15, lat: 28.7042, lng: -106.1285 },
  { id: 3, name: 'Ruta Centro', vehicle: 'VH-005', status: 'Retrasado', passengers: 10, lat: 28.6365, lng: -106.0761 },
  { id: 4, name: 'Ruta Deportiva Norte', vehicle: 'VH-007', status: 'En ruta', passengers: 8, lat: 28.7185, lng: -106.1088 },
  { id: 5, name: 'Ruta Plaza Sendero', vehicle: 'VH-002', status: 'En ruta', passengers: 14, lat: 28.6290, lng: -106.1150 },
  { id: 6, name: 'Ruta Galerías', vehicle: 'VH-004', status: 'En ruta', passengers: 11, lat: 28.6380, lng: -106.0780 },
  { id: 7, name: 'Ruta Altabrisa', vehicle: 'VH-006', status: 'En ruta', passengers: 13, lat: 28.7055, lng: -106.1300 },
  { id: 8, name: 'Ruta Parque Central', vehicle: 'VH-008', status: 'En ruta', passengers: 9, lat: 28.7200, lng: -106.1100 },
];

const recentIncidents = [
  { id: 1, type: 'Retraso', route: 'Ruta Centro', time: 'Hace 15 min', severity: 'high' },
  { id: 2, type: 'Tráfico Intenso', route: 'Ruta Sur', time: 'Hace 25 min', severity: 'medium' },
  { id: 3, type: 'Desvío', route: 'Ruta Norte', time: 'Hace 1 hora', severity: 'low' },
];

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Panel de Control Principal</h1>
          <p className="text-slate-600 mt-1">Vista general de operaciones en tiempo real</p>
        </div>
        <div className="text-right">
          <p className="text-slate-600">Hoy, 19 de Noviembre 2025</p>
          <p className="text-emerald-600">Operaciones activas</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">Índice de Puntualidad</CardTitle>
            <Clock className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">94.5%</span>
              <span className="flex items-center text-emerald-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.3%
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">vs. semana anterior</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">Servicios Hoy</CardTitle>
            <Bus className="w-5 h-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">48</span>
              <span className="text-sm text-slate-600">/ 52 programados</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">4 servicios en curso</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">Costo del Mes</CardTitle>
            <DollarSign className="w-5 h-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">$124,580</span>
              <span className="flex items-center text-red-600 text-sm">
                <TrendingDown className="w-4 h-4 mr-1" />
                -5.2%
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">Ahorro vs. presupuesto</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">NPS Satisfacción</CardTitle>
            <ThumbsUp className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">87</span>
              <span className="text-sm text-slate-600">/ 100</span>
            </div>
            <p className="text-sm text-emerald-600 mt-1">Excelente nivel</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolución de Puntualidad</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="puntualidad" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Puntualidad (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="servicios" fill="#1e3a8a" name="Servicios" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Operations Map and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Mapa de Operaciones en Tiempo Real
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg h-[1400px] relative overflow-hidden">
              <GoogleMap
                center={{ lat: 28.6460, lng: -106.1025 }}
                zoom={12}
                markers={activeRoutes.map((route) => ({
                  position: { lat: route.lat, lng: route.lng },
                  title: `${route.name} - ${route.vehicle}`,
                  type: 'vehicle'
                }))}
                showRoute={true}
                className="rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-800/95 px-3 py-2 rounded-lg shadow-lg z-10">
                <p className="text-sm font-semibold dark:text-slate-200">{activeRoutes.length} rutas activas</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">En tiempo real</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Alertas e Incidentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentIncidents.map((incident) => (
              <Alert 
                key={incident.id} 
                className={
                  incident.severity === 'high' 
                    ? 'border-red-300 bg-red-50' 
                    : incident.severity === 'medium'
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-blue-300 bg-blue-50'
                }
              >
                <AlertTriangle className={`h-4 w-4 ${
                  incident.severity === 'high' 
                    ? 'text-red-600' 
                    : incident.severity === 'medium'
                    ? 'text-amber-600'
                    : 'text-blue-600'
                }`} />
                <AlertTitle>{incident.type}</AlertTitle>
                <AlertDescription>
                  <div className="flex justify-between items-center mt-1">
                    <span>{incident.route}</span>
                    <Badge variant="outline" className="text-xs">
                      {incident.time}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}

            <div className="pt-2 border-t">
              <h4 className="text-sm mb-3">Rutas Activas</h4>
              <div className="space-y-2">
                {activeRoutes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        route.status === 'Retrasado' ? 'bg-red-500' : 'bg-emerald-500'
                      }`}></div>
                      <div>
                        <div className="text-sm">{route.name}</div>
                        <div className="text-xs text-slate-600">{route.vehicle}</div>
                      </div>
                    </div>
                    <Badge variant={route.status === 'Retrasado' ? 'destructive' : 'default'}>
                      {route.passengers}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
