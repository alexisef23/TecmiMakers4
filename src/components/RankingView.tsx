import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, TrendingUp, Star, Flame } from 'lucide-react';
import { rankingData, RankingEmployee } from './RankingData';

// Importar imágenes de gatos según posición
import gatoGanador from '../../Recursos2/gatoGanador.png';
import gatoEnojado from '../../Recursos2/gatoEnojado.png';
import gatoTriste from '../../Recursos2/gatoTriste.png';
import gatoFeliz from '../../attached_assets/gatoFeliz_1764894849786.png';

interface RankingViewProps {
  currentEmployeeId?: number;
}

export function RankingView({ currentEmployeeId = 1 }: RankingViewProps) {
  const getAvatarImage = (position: number) => {
    switch (position) {
      case 1:
        return gatoGanador;
      case 2:
        return gatoEnojado;
      case 3:
        return gatoTriste;
      case 4:
      case 5:
        return gatoFeliz;
      default:
        return gatoFeliz; // imagen por defecto
    }
  };

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${position}`;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-slate-300 to-slate-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border-l-4 border-l-yellow-500 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="dark:text-white">Ranking de Puntualidad</span>
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Los empleados más puntuales y comprometidos del mes
          </p>
        </CardHeader>
      </Card>

      {/* Explicación del sistema de puntos */}
      <Card className="dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white">¿Cómo ganar puntos?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-600">+10</Badge>
            <span className="text-sm dark:text-slate-300">Por cada viaje a tiempo</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600">+5</Badge>
            <span className="text-sm dark:text-slate-300">Por calificación de 5 estrellas</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-purple-600">+50</Badge>
            <span className="text-sm dark:text-slate-300">Bonus: Sin faltas en el mes</span>
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Employees */}
      <div className="space-y-3">
        {rankingData.map((employee: RankingEmployee) => {
          const isCurrentUser = employee.id === currentEmployeeId;
          const isTopEmployee = employee.position === 1;

          return (
            <Card
              key={employee.id}
              className={`transition-all ${
                isCurrentUser
                  ? 'border-2 border-blue-500 shadow-lg dark:border-blue-400'
                  : 'dark:bg-slate-900'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Position Badge */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl ${getPositionColor(
                      employee.position
                    )}`}
                  >
                    {getMedalIcon(employee.position)}
                  </div>

                  {/* Avatar - Gatito */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                      <img
                        src={getAvatarImage(employee.position)}
                        alt={employee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Employee Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold dark:text-white">{employee.name}</h3>
                      {isCurrentUser && (
                        <Badge variant="outline" className="text-xs dark:border-blue-400 dark:text-blue-400">
                          Tú
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {employee.punctualityStreak} días
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {employee.averageRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {employee.points}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">puntos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Motivational Footer */}
      <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 border-none">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            💪 ¡Sigue siendo puntual para escalar posiciones!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
