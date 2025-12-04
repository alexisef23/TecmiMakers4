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
  { id: 1, name: 'Ruta Norte', vehicle: 'VH-001', status: 'En ruta', passengers: 12, lat: 19.432, lng: -99.133 },
  { id: 2, name: 'Ruta Sur', vehicle: 'VH-003', status: 'En ruta', passengers: 15, lat: 19.390, lng: -99.145 },
  { id: 3, name: 'Ruta Centro', vehicle: 'VH-005', status: 'Retrasado', passengers: 10, lat: 19.426, lng: -99.165 },
  { id: 4, name: 'Ruta Oeste', vehicle: 'VH-007', status: 'En ruta', passengers: 8, lat: 19.441, lng: -99.201 },
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
            <CardTitle className="text-sm text-slate-600 dark:text-slate-300">Índice de Puntualidad</CardTitle>
            <Clock className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl dark:text-white">94.5%</span>
              <span className="flex items-center text-emerald-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.3%
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">vs. semana anterior</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600 dark:text-slate-300">Servicios Hoy</CardTitle>
            <Bus className="w-5 h-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl dark:text-white">48</span>
              <span className="text-sm text-slate-600 dark:text-slate-300">/ 52 programados</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">4 servicios en curso</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600 dark:text-slate-300">Costo del Mes</CardTitle>
            <DollarSign className="w-5 h-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl dark:text-white">$124,580</span>
              <span className="flex items-center text-red-600 text-sm">
                <TrendingDown className="w-4 h-4 mr-1" />
                -5.2%
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Ahorro vs. presupuesto</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600 dark:text-slate-300">NPS Satisfacción</CardTitle>
            <ThumbsUp className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl dark:text-white">87</span>
              <span className="text-sm text-slate-600 dark:text-slate-300">/ 100</span>
            </div>
            <p className="text-sm text-emerald-600 mt-1">Excelente nivel</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">Evolución de Puntualidad</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" className="dark:text-slate-300"/>
                <YAxis domain={[85, 100]} className="dark:text-slate-300"/>
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
            <CardTitle className="dark:text-white">Servicios por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" className="dark:text-slate-300"/>
                <YAxis className="dark:text-slate-300"/>
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
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <MapPin className="w-5 h-5" />
              Mapa de Operaciones en Tiempo Real
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-gray-800 rounded-lg h-[400px] flex items-center justify-center relative overflow-hidden">
              {/* Simulación de mapa */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800">
                {activeRoutes.map((route, idx) => (
                  <div
                    key={route.id}
                    className="absolute"
                    style={{
                      left: `${20 + idx * 20}%`,
                      top: `${30 + (idx % 2) * 30}%`,
                    }}
                  >
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${
                        route.status === 'Retrasado' ? 'bg-red-500' : 'bg-emerald-500'
                      } animate-pulse`}></div>
                      <div className="absolute left-4 top-0 bg-white dark:bg-gray-700 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                        <div>{route.name}</div>
                        <div className="text-slate-600 dark:text-slate-300">{route.vehicle}</div>
                        <div className="text-slate-500 dark:text-slate-400">{route.passengers} pasajeros</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative z-10 text-center p-4 bg-white/90 dark:bg-gray-700/90 rounded-lg shadow">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-900" />
                <p className="dark:text-white">Integración con Google Maps/Mapbox</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{activeRoutes.length} rutas activas en tiempo real</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
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
                <AlertTitle className="dark:text-white">{incident.type}</AlertTitle>
                <AlertDescription>
                  <div className="flex justify-between items-center mt-1">
                    <span className="dark:text-slate-300">{incident.route}</span>
                    <Badge variant="outline" className="text-xs">
                      {incident.time}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}

            <div className="pt-2 border-t">
              <h4 className="text-sm mb-3 dark:text-white">Rutas Activas</h4>
              <div className="space-y-2">
                {activeRoutes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700 rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        route.status === 'Retrasado' ? 'bg-red-500' : 'bg-emerald-500'
                      }`}></div>
                      <div>
                        <div className="text-sm dark:text-white">{route.name}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">{route.vehicle}</div>
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