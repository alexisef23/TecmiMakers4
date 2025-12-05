import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { 
  Settings, 
  Users, 
  Bell, 
  Shield,
  Save,
  Database,
  Globe
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';

const users = [
  { id: 1, name: 'Admin Principal', email: 'admin@empresa.com', role: 'Administrador', status: 'Activo' },
  { id: 2, name: 'Carlos Supervisor', email: 'supervisor@empresa.com', role: 'Supervisor', status: 'Activo' },
  { id: 3, name: 'Ana Analista', email: 'analista@empresa.com', role: 'Analista', status: 'Activo' },
];

export function SettingsModule() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Configuración del Sistema</h1>
        <p className="text-slate-600 mt-1">Gestión de usuarios, roles y parámetros del sistema</p>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gestión de Usuarios
          </CardTitle>
          <CardDescription>
            Administra los usuarios con acceso al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Users className="w-4 h-4 mr-2" />
              Agregar Usuario
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-600">{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Parámetros del Sistema
          </CardTitle>
          <CardDescription>
            Configura los parámetros operacionales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tolerance">Tolerancia de Retraso (minutos)</Label>
              <Input id="tolerance" type="number" defaultValue="10" />
              <p className="text-xs text-slate-500">
                Tiempo máximo antes de considerar un retraso crítico
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-passengers">Capacidad Máxima por Vehículo</Label>
              <Input id="max-passengers" type="number" defaultValue="15" />
              <p className="text-xs text-slate-500">
                Número máximo de pasajeros por unidad
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="work-hours">Horario Laboral Inicio</Label>
              <Input id="work-hours" type="time" defaultValue="08:00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="work-hours-end">Horario Laboral Fin</Label>
              <Input id="work-hours-end" type="time" defaultValue="18:00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Select defaultValue="mxn">
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mxn">MXN - Peso Mexicano</SelectItem>
                  <SelectItem value="usd">USD - Dólar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Zona Horaria</Label>
              <Select defaultValue="cdmx">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cdmx">Ciudad de México (GMT-6)</SelectItem>
                  <SelectItem value="monterrey">Monterrey (GMT-6)</SelectItem>
                  <SelectItem value="tijuana">Tijuana (GMT-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Preferencias de Datos
            </h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-backup" className="dark:text-white">Respaldo Automático</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">Realizar respaldos diarios de la base de datos</p>
              </div>
              <Switch id="auto-backup" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-retention" className="dark:text-white">Retención de Datos Históricos</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mantener datos por 12 meses</p>
              </div>
              <Switch id="data-retention" defaultChecked />
            </div>
          </div>

          <div className="pt-4">
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Configuración de Notificaciones
          </CardTitle>
          <CardDescription>
            Gestiona las alertas y notificaciones del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-delays" className="dark:text-white">Notificar Retrasos</Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Alertas cuando un vehículo se retrase más de 10 minutos</p>
            </div>
            <Switch id="notify-delays" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-incidents" className="dark:text-white">Notificar Incidentes</Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Alertas inmediatas ante cualquier incidente reportado</p>
            </div>
            <Switch id="notify-incidents" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-maintenance" className="dark:text-white">Recordatorios de Mantenimiento</Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Alertas 7 días antes del mantenimiento programado</p>
            </div>
            <Switch id="notify-maintenance" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-insurance" className="dark:text-white">Vencimiento de Seguros</Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Alertas 30 días antes del vencimiento de pólizas</p>
            </div>
            <Switch id="notify-insurance" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-email" className="dark:text-white">Notificaciones por Email</Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Enviar resumen diario por correo electrónico</p>
            </div>
            <Switch id="notify-email" />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Seguridad y Permisos
          </CardTitle>
          <CardDescription>
            Configuración de seguridad del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa" className="dark:text-white">Autenticación de Dos Factores</Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Requiere verificación adicional al iniciar sesión</p>
            </div>
            <Switch id="2fa" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="session-timeout" className="dark:text-white">Tiempo de Sesión (minutos)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" className="w-32 dark:bg-slate-800 dark:text-white dark:border-slate-600" />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="password-policy" className="dark:text-white">Política de Contraseñas Estricta</Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Requiere mayúsculas, números y caracteres especiales</p>
            </div>
            <Switch id="password-policy" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Integraciones
          </CardTitle>
          <CardDescription>
            Conecta con servicios externos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p>Google Maps API</p>
                <p className="text-xs text-slate-500">Mapas y rutas en tiempo real</p>
              </div>
            </div>
            <Badge className="bg-emerald-600">Conectado</Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center">
                <Bell className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <p>Servicio de SMS</p>
                <p className="text-xs text-slate-500">Notificaciones por mensaje de texto</p>
              </div>
            </div>
            <Badge variant="secondary">No Configurado</Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p>Sistema de Nómina</p>
                <p className="text-xs text-slate-500">Integración con sistema de pagos</p>
              </div>
            </div>
            <Badge variant="secondary">No Configurado</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
