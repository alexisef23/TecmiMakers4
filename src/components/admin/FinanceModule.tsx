import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  DollarSign, 
  Download, 
  FileText, 
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const monthlyData = [
  { month: 'Ene', costo: 118000, presupuesto: 130000 },
  { month: 'Feb', costo: 122000, presupuesto: 130000 },
  { month: 'Mar', costo: 115000, presupuesto: 130000 },
  { month: 'Abr', costo: 128000, presupuesto: 130000 },
  { month: 'May', costo: 119000, presupuesto: 130000 },
  { month: 'Jun', costo: 125000, presupuesto: 130000 },
];

const costByCategory = [
  { name: 'Combustible', value: 45000, color: '#1e3a8a' },
  { name: 'Mantenimiento', value: 28000, color: '#10b981' },
  { name: 'Salarios', value: 38000, color: '#f59e0b' },
  { name: 'Seguros', value: 13580, color: '#8b5cf6' },
];

const invoices = [
  {
    id: 'INV-2025-001',
    provider: 'TransVida S.A.',
    concept: 'Servicios Noviembre - Semana 3',
    amount: 28500,
    status: 'Pagada',
    date: '2025-11-15',
  },
  {
    id: 'INV-2025-002',
    provider: 'FlotaMovil',
    concept: 'Mantenimiento Vehículos',
    amount: 15200,
    status: 'Pendiente',
    date: '2025-11-17',
  },
  {
    id: 'INV-2025-003',
    provider: 'Seguros del Centro',
    concept: 'Póliza Mensual Flotilla',
    amount: 13580,
    status: 'Pagada',
    date: '2025-11-10',
  },
  {
    id: 'INV-2025-004',
    provider: 'Gasolina Express',
    concept: 'Suministro Combustible',
    amount: 22300,
    status: 'Pendiente',
    date: '2025-11-18',
  },
];

const delayImpact = [
  { day: 'Lun', costoOportunidad: 2400 },
  { day: 'Mar', costoOportunidad: 1800 },
  { day: 'Mie', costoOportunidad: 1200 },
  { day: 'Jue', costoOportunidad: 2800 },
  { day: 'Vie', costoOportunidad: 1500 },
];

export function FinanceModule() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl">Finanzas y Facturación</h1>
          <p className="text-slate-600 text-sm">Gestión financiera y análisis de costos</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="noviembre">
            <SelectTrigger className="w-36 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="noviembre">Noviembre 2025</SelectItem>
              <SelectItem value="octubre">Octubre 2025</SelectItem>
              <SelectItem value="septiembre">Septiembre 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Financieros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-1 pt-3 px-3">
            <CardTitle className="text-xs text-slate-600">Costo Total Mes</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">$124,580</span>
              <span className="flex items-center text-emerald-600 text-xs">
                <TrendingDown className="w-3 h-3 mr-1" />
                -4.2%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-1 pt-3 px-3">
            <CardTitle className="text-xs text-slate-600">Presupuesto Restante</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">$5,420</span>
              <span className="text-xs text-slate-600">/ $130,000</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-600">
          <CardHeader className="pb-1 pt-3 px-3">
            <CardTitle className="text-xs text-slate-600">Ahorro Mensual</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-emerald-600">$5,420</span>
              <span className="text-xs text-slate-600">4.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-600">
          <CardHeader className="pb-1 pt-3 px-3">
            <CardTitle className="text-xs text-slate-600">Costo por Retrasos</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-red-600">$9,700</span>
              <span className="flex items-center text-red-600 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="text-base">Comparativo Costo vs Presupuesto</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="costo" fill="#1e3a8a" name="Costo Real" />
                <Bar dataKey="presupuesto" fill="#94a3b8" name="Presupuesto" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="text-base">Distribución de Costos</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={costByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader className="pb-2 pt-3 px-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-4 h-4" />
              Facturas y Pagos
            </CardTitle>
            <Button className="bg-blue-900 hover:bg-blue-800 h-8 text-sm">
              <FileText className="w-3 h-3 mr-2" />
              Nueva Factura
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="max-h-48 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs py-2">ID</TableHead>
                  <TableHead className="text-xs py-2">Proveedor</TableHead>
                  <TableHead className="text-xs py-2">Concepto</TableHead>
                  <TableHead className="text-xs py-2">Fecha</TableHead>
                  <TableHead className="text-xs py-2">Monto</TableHead>
                  <TableHead className="text-xs py-2">Estado</TableHead>
                  <TableHead className="text-xs py-2 text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="text-xs py-2">{invoice.id}</TableCell>
                    <TableCell className="text-xs py-2">{invoice.provider}</TableCell>
                    <TableCell className="text-xs py-2 max-w-[150px] truncate">{invoice.concept}</TableCell>
                    <TableCell className="text-xs py-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {invoice.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-slate-500" />
                        ${invoice.amount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge 
                        variant={invoice.status === 'Pagada' ? 'default' : 'secondary'}
                        className={`text-xs ${invoice.status === 'Pagada' ? 'bg-emerald-600' : 'bg-amber-500'}`}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Download className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delay Cost Analysis */}
      <Card className="border-l-4 border-l-red-600">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertCircle className="w-4 h-4 text-red-600" />
            Análisis de Costo por Retrasos
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="mb-2">
            <p className="text-slate-600 text-xs">
              Costo estimado por tiempo perdido debido a retrasos.
            </p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={delayImpact}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="costoOportunidad" 
                stroke="#dc2626" 
                strokeWidth={2}
                name="Costo de Oportunidad ($)"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-red-50 p-2 rounded-lg text-center">
              <p className="text-xs text-slate-600">Total Semanal</p>
              <p className="text-lg font-bold text-red-600">$9,700</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-center">
              <p className="text-xs text-slate-600">Horas Perdidas</p>
              <p className="text-lg font-bold">32.5 hrs</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-center">
              <p className="text-xs text-slate-600">Empleados Afectados</p>
              <p className="text-lg font-bold">48</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
