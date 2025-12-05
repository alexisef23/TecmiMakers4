import { useEffect, useRef } from 'react';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    type?: 'vehicle' | 'stop' | 'employee';
  }>;
  className?: string;
  showRoute?: boolean;
  useDirections?: boolean; // Nueva prop para usar rutas reales
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyDs8BKAd6nf2oUtwP6PV31ZjdVIsCXgeYc';

declare global {
  interface Window {
    initMap?: () => void;
  }
}

export function GoogleMap({
  center = { lat: 28.6460, lng: -106.1025 }, // Chihuahua - Oficinas OXXO
  zoom = 12,
  markers = [],
  className = '',
  showRoute = false,
  useDirections = false,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const loadScript = () => {
      // Verificar si ya existe el script
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Si ya existe, esperar a que window.google esté disponible
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogle);
            initializeMap();
          }
        }, 100);
        return;
      }

      // Crear nuevo script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;

      window.initMap = () => {
        initializeMap();
      };

      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;
      if (!window.google || !window.google.maps) return;

      // Crear el mapa
      googleMapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      // Obtener ubicación del usuario y actualizarla continuamente
      if (navigator.geolocation) {
        // Actualizar ubicación cada 5 segundos
        const updateUserLocation = () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              if (!googleMapInstanceRef.current) return;

              // Crear o actualizar marcador de usuario
              if (userMarkerRef.current) {
                userMarkerRef.current.setPosition(userPos);
              } else {
                userMarkerRef.current = new google.maps.Marker({
                  position: userPos,
                  map: googleMapInstanceRef.current,
                  title: 'Mi Ubicación',
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#4285F4',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 3,
                    scale: 10,
                  },
                  zIndex: 1000,
                });
              }
            },
            (error) => {
              console.log('Error obteniendo ubicación:', error);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
          );
        };

        // Actualizar inmediatamente
        updateUserLocation();
        
        // Continuar actualizando cada 5 segundos
        const locationInterval = setInterval(updateUserLocation, 5000);
        
        // Limpiar intervalo al desmontar
        return () => clearInterval(locationInterval);
      }

      // Agregar marcadores
      updateMapMarkers();
    };

    const updateMapMarkers = () => {
      if (!googleMapInstanceRef.current || !window.google) return;

      // Limpiar marcadores previos
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];

      // Limpiar polyline previa
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }

      // Agregar nuevos marcadores
      markers.forEach((markerData) => {
        if (!googleMapInstanceRef.current) return;

        const marker = new google.maps.Marker({
          position: markerData.position,
          map: googleMapInstanceRef.current,
          title: markerData.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: getMarkerColor(markerData.type),
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      });

      // Dibujar ruta si es necesario
      if (showRoute && markers.length > 1) {
        if (useDirections) {
          // Usar Directions API para rutas reales
          drawDirectionsRoute();
        } else {
          // Usar polyline simple (línea recta)
          const path = markers.map(m => m.position);
          polylineRef.current = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            map: googleMapInstanceRef.current,
          });
        }
      }
    };

    const drawDirectionsRoute = () => {
      if (!googleMapInstanceRef.current || !window.google || markers.length < 1) return;

      const directionsService = new google.maps.DirectionsService();
      
      // Limpiar renderer anterior
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }

      // Crear nuevo renderer
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map: googleMapInstanceRef.current,
        suppressMarkers: true, // No mostrar marcadores del renderer
        polylineOptions: {
          strokeColor: '#3b82f6',
          strokeOpacity: 0.8,
          strokeWeight: 5,
        },
      });

      // Obtener ubicación del usuario para usarla como destino
      if (navigator.geolocation && userMarkerRef.current) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Si solo hay un marcador (vehículo), crear ruta desde vehículo hasta usuario
            if (markers.length === 1) {
              const request: google.maps.DirectionsRequest = {
                origin: markers[0].position,
                destination: userPos,
                travelMode: google.maps.TravelMode.DRIVING,
                optimizeWaypoints: false,
              };

              directionsService.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                  directionsRendererRef.current?.setDirections(result);
                } else {
                  console.error('Error al calcular la ruta:', status);
                  // Fallback a línea recta si falla
                  const path = [markers[0].position, userPos];
                  polylineRef.current = new google.maps.Polyline({
                    path: path,
                    geodesic: true,
                    strokeColor: '#3b82f6',
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                    map: googleMapInstanceRef.current,
                  });
                }
              });
            } else {
              // Si hay múltiples marcadores, usar lógica original
              const waypoints = markers.slice(1, -1).map(m => ({
                location: m.position,
                stopover: true,
              }));

              const request: google.maps.DirectionsRequest = {
                origin: markers[0].position,
                destination: markers[markers.length - 1].position,
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
                optimizeWaypoints: false,
              };

              directionsService.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                  directionsRendererRef.current?.setDirections(result);
                } else {
                  console.error('Error al calcular la ruta:', status);
                  const path = markers.map(m => m.position);
                  polylineRef.current = new google.maps.Polyline({
                    path: path,
                    geodesic: true,
                    strokeColor: '#3b82f6',
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                    map: googleMapInstanceRef.current,
                  });
                }
              });
            }
          },
          (error) => {
            console.log('Error obteniendo ubicación para ruta:', error);
          }
        );
      }
    };

    const getMarkerColor = (type?: string) => {
      switch (type) {
        case 'vehicle':
          return '#10b981';
        case 'employee':
          return '#f59e0b';
        case 'stop':
          return '#3b82f6';
        default:
          return '#6366f1';
      }
    };

    loadScript();

    return () => {
      // Cleanup
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }
      markersRef.current.forEach(m => m.setMap(null));
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
    };
  }, []);

  // Actualizar marcadores cuando cambien
  useEffect(() => {
    if (!googleMapInstanceRef.current || !window.google) return;

    // Limpiar marcadores previos (excepto el de usuario)
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Limpiar polyline previa
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    // Agregar nuevos marcadores
    markers.forEach((markerData) => {
      if (!googleMapInstanceRef.current) return;

      const marker = new google.maps.Marker({
        position: markerData.position,
        map: googleMapInstanceRef.current,
        title: markerData.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: markerData.type === 'vehicle' ? '#10b981' : markerData.type === 'employee' ? '#f59e0b' : '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Dibujar ruta si es necesario
    if (showRoute && markers.length >= 1) {
      if (useDirections) {
        // Usar Directions API para rutas reales
        const directionsService = new google.maps.DirectionsService();
        
        // Limpiar renderer anterior
        if (directionsRendererRef.current) {
          directionsRendererRef.current.setMap(null);
        }

        // Crear nuevo renderer
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map: googleMapInstanceRef.current,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeWeight: 5,
          },
        });

        // Función para calcular ruta
        const calculateRoute = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userPos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };

                // Si solo hay un marcador (vehículo), crear ruta desde vehículo hasta usuario
                if (markers.length === 1) {
                  const request: google.maps.DirectionsRequest = {
                    origin: markers[0].position,
                    destination: userPos,
                    travelMode: google.maps.TravelMode.DRIVING,
                    optimizeWaypoints: false,
                  };

                  directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result) {
                      directionsRendererRef.current?.setDirections(result);
                    } else {
                      console.error('Error al calcular la ruta:', status);
                    }
                  });
                } else {
                  // Si hay múltiples marcadores, usar lógica original
                  const waypoints = markers.slice(1, -1).map(m => ({
                    location: m.position,
                    stopover: true,
                  }));

                  const request: google.maps.DirectionsRequest = {
                    origin: markers[0].position,
                    destination: markers[markers.length - 1].position,
                    waypoints: waypoints,
                    travelMode: google.maps.TravelMode.DRIVING,
                    optimizeWaypoints: false,
                  };

                  directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result) {
                      directionsRendererRef.current?.setDirections(result);
                    } else {
                      console.error('Error al calcular la ruta:', status);
                    }
                  });
                }
              },
              (error) => {
                console.log('Error obteniendo ubicación para ruta:', error);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              }
            );
          }
        };

        // Calcular ruta inmediatamente
        calculateRoute();
        
        // Recalcular ruta cada 10 segundos
        const routeInterval = setInterval(calculateRoute, 10000);
        
        // Limpiar intervalo
        return () => clearInterval(routeInterval);
      } else {
        // Usar polyline simple
        const path = markers.map(m => m.position);
        polylineRef.current = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: '#3b82f6',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map: googleMapInstanceRef.current,
        });
      }
    }
  }, [markers, showRoute, useDirections]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}