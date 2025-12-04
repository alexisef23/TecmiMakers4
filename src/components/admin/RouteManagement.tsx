import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  Clock,
  Users,
  Navigation
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const routes = [
  {
    id: 'RT-001',
    name: 'Ruta Norte - Corporativo Central',
    status: 'Activa',
    stops: 5,
    vehicle: 'VH-001 - Mercedes Sprinter',
    driver: 'Juan Pérez',
    schedule: '06:00 - 08:00',
    passengers: 12,
    distance: '23.5 km',
  },
  {
    id: 'RT-002',
    name: 'Ruta Sur - Sucursal Periférico',
    status: 'Activa',
    stops: 7,
    vehicle: 'VH-003 - Ford Transit',
    driver: 'María González',
    schedule: '06:30 - 08:30',
    passengers: 15,
    distance: '31.2 km',
  },
  {
    id: 'RT-003',
    name: 'Ruta Centro - Oficinas Centro',
    status: 'En Mantenimiento',
    stops: 4,
    vehicle: 'VH-005 - Mercedes Sprinter',
    driver: 'Carlos Ramírez',
    schedule: '07:00 - 09:00',
    passengers: 10,
    distance: '18.7 km',
  },
  {
    id: 'RT-004',
    name: 'Ruta Oeste - Zona Industrial',
    status: 'Activa',
    stops: 6,
    vehicle: 'VH-007 - Chevrolet Express',
    driver: 'Ana Martínez',
    schedule: '05:30 - 07:30',
    passengers: 14,
    distance: '28.9 km',
  },
  {
    id: 'RT-005',
    name: 'Ruta Este - Polanco',
    status: 'Activa',
    stops: 5,
    vehicle: 'VH-009 - Ford Transit',
    driver: 'Luis Torres',
    schedule: '06:15 - 08:15',
    passengers: 11,
    distance: '21.3 km',
  },
];

export function RouteManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestión de Rutas</h1>
          <p className="text-slate-600 mt-1">Administra y optimiza las rutas de transporte</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Ruta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Ruta</DialogTitle>
              <DialogDescription>
                Define los detalles de la nueva ruta de transporte
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="route-name">Nombre de la Ruta</Label>
                  <Input id="route-name" placeholder="Ej: Ruta Norte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route-id">ID de Ruta</Label>
                  <Input id="route-id" placeholder="RT-006" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehículo Asignado</Label>
                  <Select>
                    <SelectTrigger id="vehicle">
                      <SelectValue placeholder="Seleccionar vehículo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vh-001">VH-001 - Mercedes Sprinter</SelectItem>
                      <SelectItem value="vh-002">VH-002 - Ford Transit</SelectItem>
                      <SelectItem value="vh-003">VH-003 - Chevrolet Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Conductor Asignado</Label>
                  <Select>
                    <SelectTrigger id="driver">
                      <SelectValue placeholder="Seleccionar conductor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver-1">Juan Pérez</SelectItem>
                      <SelectItem value="driver-2">María González</SelectItem>
                      <SelectItem value="driver-3">Carlos Ramírez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Hora de Inicio</Label>
                  <Input id="start-time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">Hora de Fin</Label>
                  <Input id="end-time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Puntos de Parada (Mapa Interactivo)</Label>
                <div className="bg-slate-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-900" />
                    <p className="text-sm text-slate-600">Haz clic en el mapa para agregar paradas</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-blue-900 hover:bg-blue-800" onClick={() => setIsDialogOpen(false)}>
                Crear Ruta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listado de Rutas</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar rutas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre de Ruta</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Conductor</TableHead>
                  <TableHead>Horario</TableHead>
                  <TableHead>Paradas</TableHead>
                  <TableHead>Pasajeros</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoutes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell>{route.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-blue-900" />
                        <div>
                          <p className="font-medium dark:text-white">{route.name}</p>
                          <div className="text-xs text-slate-500 dark:text-slate-300">{route.distance}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={route.status === 'Activa' ? 'default' : 'secondary'}
                        className={route.status === 'Activa' ? 'bg-emerald-600 dark:bg-emerald-700' : ''}
                      >
                        {route.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{route.vehicle}</TableCell>
                    <TableCell>{route.driver}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-3 h-3" />
                        {route.schedule}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {route.stops}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-500" />
                        {route.passengers}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Route Optimization Card */}
      <Card className="border-l-4 border-l-emerald-600 dark:bg-slate-900 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            Simulación y Optimización de Rutas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Distancia Total Diaria</p>
              <p className="text-2xl dark:text-white">123.6 km</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Tiempo Promedio de Ruta</p>
              <p className="text-2xl dark:text-white">1h 45m</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Eficiencia Estimada</p>
              <p className="text-2xl text-emerald-600 dark:text-emerald-400">92%</p>
            </div>
          </div>
          <div className="mt-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Ejecutar Optimización Automática
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}