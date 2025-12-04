import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  BarChart3, 
  Download, 
  Filter,
  TrendingUp,
  Clock,
  AlertTriangle,
  ThumbsUp
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';

const puntualidadData = [
  { day: 'Lun', puntualidad: 94, retrasos: 3, noShows: 1 },
  { day: 'Mar', puntualidad: 92, retrasos: 4, noShows: 2 },
  { day: 'Mie', puntualidad: 96, retrasos: 2, noShows: 1 },
  { day: 'Jue', puntualidad: 91, retrasos: 5, noShows: 2 },
  { day: 'Vie', puntualidad: 95, retrasos: 3, noShows: 1 },
  { day: 'Sab', puntualidad: 97, retrasos: 1, noShows: 1 },
  { day: 'Dom', puntualidad: 98, retrasos: 1, noShows: 0 },
];

const incidentData = [
  { type: 'Tráfico', cantidad: 12 },
  { type: 'Mecánicos', cantidad: 3 },
  { type: 'Clima', cantidad: 5 },
  { type: 'Accidentes', cantidad: 1 },
  { type: 'Desvíos', cantidad: 7 },
];

const satisfaccionData = [
  { mes: 'Jun', nps: 82 },
  { mes: 'Jul', nps: 84 },
  { mes: 'Ago', nps: 81 },
  { mes: 'Sep', nps: 85 },
  { mes: 'Oct', nps: 86 },
  { mes: 'Nov', nps: 87 },
];

const performanceByDriver = [
  { conductor: 'Juan Pérez', puntualidad: 96, satisfaccion: 90, incidentes: 2 },
  { conductor: 'María González', puntualidad: 94, satisfaccion: 88, incidentes: 3 },
  { conductor: 'Carlos Ramírez', puntualidad: 89, satisfaccion: 85, incidentes: 5 },
  { conductor: 'Ana Martínez', puntualidad: 97, satisfaccion: 92, incidentes: 1 },
  { conductor: 'Luis Torres', puntualidad: 93, satisfaccion: 87, incidentes: 3 },
];

const radarData = [
  { subject: 'Puntualidad', A: 94 },
  { subject: 'Satisfacción', A: 87 },
  { subject: 'Eficiencia', A: 92 },
  { subject: 'Seguridad', A: 96 },
  { subject: 'Cobertura', A: 89 },
];

export function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState('semana');
  const [selectedBranch, setSelectedBranch] = useState('todas');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          {/* Removed OXXO GO logo and name */}
          <h1>Reportes y Analíticas</h1>
          <p className="text-slate-600 mt-1">Análisis detallado de métricas y rendimiento</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros Avanzados
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Periodo</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoy">Hoy</SelectItem>
                  <SelectItem value="semana">Esta Semana</SelectItem>
                  <SelectItem value="mes">Este Mes</SelectItem>
                  <SelectItem value="trimestre">Trimestre</SelectItem>
                  <SelectItem value="ano">Año</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Sucursal</label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las Sucursales</SelectItem>
                  <SelectItem value="central">Corporativo Central</SelectItem>
                  <SelectItem value="sur">Sucursal Sur</SelectItem>
                  <SelectItem value="norte">Sucursal Norte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Conductor</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los conductores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="juan">Juan Pérez</SelectItem>
                  <SelectItem value="maria">María González</SelectItem>
                  <SelectItem value="carlos">Carlos Ramírez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Proveedor</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los proveedores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="transvida">TransVida</SelectItem>
                  <SelectItem value="flotamovil">FlotaMovil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-emerald-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Puntualidad Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">94.5%</span>
              <Badge className="bg-emerald-600">+2.3%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Incidentes Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">28</span>
              <Badge variant="secondary">-12%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              NPS Satisfacción
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">87</span>
              <Badge className="bg-emerald-600">+5</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Eficiencia Global
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">92%</span>
              <Badge className="bg-blue-600">Óptimo</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Puntualidad y Retrasos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={puntualidadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="puntualidad" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Puntualidad (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="retrasos" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Retrasos"
                />
                <Line 
                  type="monotone" 
                  dataKey="noShows" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="No-Shows"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Incidentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#1e3a8a" name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolución de Satisfacción (NPS)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfaccionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[75, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="nps" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="NPS Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rendimiento General del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar 
                  name="Rendimiento" 
                  dataKey="A" 
                  stroke="#1e3a8a" 
                  fill="#1e3a8a" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Driver Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Rendimiento por Conductor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {performanceByDriver.map((driver, index) => (
              <div 
                key={index} 
                className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-slate-50 rounded-lg items-center"
              >
                <div>
                  <p>{driver.conductor}</p>
                  <p className="text-sm text-slate-600">Conductor #{index + 1}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Puntualidad</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full" 
                        style={{ width: `${driver.puntualidad}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{driver.puntualidad}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Satisfacción</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${driver.satisfaccion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{driver.satisfaccion}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Incidentes</p>
                  <Badge variant={driver.incidentes <= 2 ? 'default' : 'secondary'}>
                    {driver.incidentes}
                  </Badge>
                </div>
                <div className="text-right">
                  <Badge 
                    className={
                      driver.puntualidad >= 95 
                        ? 'bg-emerald-600' 
                        : driver.puntualidad >= 90 
                        ? 'bg-blue-600' 
                        : 'bg-amber-500'
                    }
                  >
                    {driver.puntualidad >= 95 ? 'Excelente' : driver.puntualidad >= 90 ? 'Bueno' : 'Regular'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}