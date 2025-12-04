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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Finanzas y Facturación</h1>
          <p className="text-slate-600 mt-1">Gestión financiera y análisis de costos</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="noviembre">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="noviembre">Noviembre 2025</SelectItem>
              <SelectItem value="octubre">Octubre 2025</SelectItem>
              <SelectItem value="septiembre">Septiembre 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Financieros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Costo Total Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl">$124,580</span>
              <span className="flex items-center text-emerald-600 text-sm">
                <TrendingDown className="w-4 h-4 mr-1" />
                -4.2%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Presupuesto Restante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl">$5,420</span>
              <span className="text-sm text-slate-600">/ $130,000</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Ahorro Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-emerald-600">$5,420</span>
              <span className="text-sm text-slate-600">4.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Costo por Retrasos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-red-600">$9,700</span>
              <span className="flex items-center text-red-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Comparativo Costo vs Presupuesto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
          <CardHeader>
            <CardTitle>Distribución de Costos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Facturas y Pagos
            </CardTitle>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <FileText className="w-4 h-4 mr-2" />
              Nueva Factura
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Factura</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.provider}</TableCell>
                  <TableCell className="max-w-xs truncate">{invoice.concept}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {invoice.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      ${invoice.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={invoice.status === 'Pagada' ? 'default' : 'secondary'}
                      className={invoice.status === 'Pagada' ? 'bg-emerald-600' : 'bg-amber-500'}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delay Cost Analysis */}
      <Card className="border-l-4 border-l-red-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Análisis de Costo de Oportunidad por Retrasos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-slate-600 mb-2">
              Los retrasos impactan directamente en la productividad. Aquí se muestra el costo estimado por tiempo perdido.
            </p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
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
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-sm text-slate-600">Total Semanal</p>
              <p className="text-2xl text-red-600">$9,700</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <p className="text-sm text-slate-600">Horas Perdidas</p>
              <p className="text-2xl">32.5 hrs</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <p className="text-sm text-slate-600">Empleados Afectados</p>
              <p className="text-2xl">48</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
