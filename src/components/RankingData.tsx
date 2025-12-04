// Sistema de puntos y ranking de empleados

export interface RankingEmployee {
  id: number;
  name: string;
  code: string;
  points: number;
  punctualityStreak: number;
  totalTrips: number;
  averageRating: number;
  noShows: number;
  position: number;
}

// Datos simulados del ranking
export const rankingData: RankingEmployee[] = [
  {
    id: 1,
    name: 'Laura Rodríguez',
    code: '47832',
    points: 850,
    punctualityStreak: 45,
    totalTrips: 90,
    averageRating: 5.0,
    noShows: 0,
    position: 1,
  },
  {
    id: 2,
    name: 'Carlos Ramírez',
    code: '81234',
    points: 780,
    punctualityStreak: 38,
    totalTrips: 85,
    averageRating: 4.9,
    noShows: 1,
    position: 2,
  },
  {
    id: 3,
    name: 'María López',
    code: '65432',
    points: 720,
    punctualityStreak: 32,
    totalTrips: 80,
    averageRating: 4.8,
    noShows: 2,
    position: 3,
  },
  {
    id: 4,
    name: 'Ana Martínez',
    code: '54321',
    points: 680,
    punctualityStreak: 28,
    totalTrips: 75,
    averageRating: 4.7,
    noShows: 3,
    position: 4,
  },
  {
    id: 5,
    name: 'Pedro Sánchez',
    code: '98765',
    points: 650,
    punctualityStreak: 25,
    totalTrips: 70,
    averageRating: 4.6,
    noShows: 4,
    position: 5,
  },
];

// Función para calcular puntos
export function calculatePoints(params: {
  onTime: boolean;
  rating: number;
  noShowsThisMonth: number;
}) {
  let points = 0;
  
  // Puntualidad: +10 puntos
  if (params.onTime) {
    points += 10;
  }
  
  // Calificación: +5 puntos por 5 estrellas
  if (params.rating === 5) {
    points += 5;
  }
  
  // Sin no-shows en el mes: +50 puntos bonus
  if (params.noShowsThisMonth === 0) {
    points += 50;
  }
  
  return points;
}

// Obtener el empleado del mes (posición #1)
export function getEmployeeOfTheMonth(): RankingEmployee {
  return rankingData[0];
}

// Obtener top N empleados
export function getTopEmployees(limit: number = 5): RankingEmployee[] {
  return rankingData.slice(0, limit);
}
