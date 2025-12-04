import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, TrendingUp, Star, Flame, Calendar } from 'lucide-react';
import { getEmployeeOfTheMonth, getTopEmployees } from '../RankingData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const happyCatImage = 'https://images.unsplash.com/photo-1761249257124-ab02fc22c5b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMG9yYW5nZSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDgwNzA1Mnww&ixlib=rb-4.1.0&q=80&w=400';

// Datos simulados de puntos históricos
const pointsHistory = [
  { month: 'Jul', points: 520 },
  { month: 'Ago', points: 630 },
  { month: 'Sep', points: 720 },
  { month: 'Oct', points: 780 },
  { month: 'Nov', points: 850 },
];

export function EmployeeOfMonthWidget() {
  const employeeOfMonth = getEmployeeOfTheMonth();
  const topEmployees = getTopEmployees(5);

  return (
    <div className="space-y-6">
      {/* Empleado del Mes - Hero Card */}
      <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            <span className="dark:text-white">Empleado del Mes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            {/* Avatar con corona */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                <img
                  src={happyCatImage}
                  alt={employeeOfMonth.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 text-4xl">
                👑
              </div>
            </div>

            {/* Info del empleado */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {employeeOfMonth.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Empleado del Mes</p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Puntos Totales</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {employeeOfMonth.points}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Racha de Puntualidad</p>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {employeeOfMonth.punctualityStreak}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Calificación</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {employeeOfMonth.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Viajes Totales</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {employeeOfMonth.totalTrips}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Puntos del Empleado del Mes */}
      <Card className="dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="dark:text-white">Evolución de Puntos - {employeeOfMonth.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pointsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabla Top 5 */}
      <Card className="dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="dark:text-white">Top 5 Empleados Más Puntuales</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-slate-300">Posición</TableHead>
                <TableHead className="dark:text-slate-300">Empleado</TableHead>
                <TableHead className="dark:text-slate-300">Puntos</TableHead>
                <TableHead className="dark:text-slate-300">Racha</TableHead>
                <TableHead className="dark:text-slate-300">Rating</TableHead>
                <TableHead className="dark:text-slate-300">No-Shows</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topEmployees.map((employee) => (
                <TableRow key={employee.id} className="dark:border-slate-700">
                  <TableCell>
                    <span className="text-2xl">
                      {employee.position === 1 && '🥇'}
                      {employee.position === 2 && '🥈'}
                      {employee.position === 3 && '🥉'}
                      {employee.position > 3 && `#${employee.position}`}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium dark:text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                        <img
                          src={happyCatImage}
                          alt={employee.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {employee.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-600 dark:bg-emerald-700">
                      {employee.points}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 dark:text-slate-300">
                      <Flame className="w-4 h-4 text-orange-500" />
                      {employee.punctualityStreak}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 dark:text-slate-300">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {employee.averageRating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.noShows === 0 ? 'default' : 'destructive'}>
                      {employee.noShows}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
