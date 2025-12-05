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
  useDirections?: boolean;
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
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const routeIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      if (!mapRef.current || !window.google || !window.google.maps) return;

      // Crear el mapa
      googleMapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      // Iniciar rastreo de ubicación del usuario
      startUserLocationTracking();
    };

    const startUserLocationTracking = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation no está disponible');
        return;
      }

      const updateUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            if (!googleMapInstanceRef.current || !window.google) return;

            // Crear o actualizar marcador azul del usuario
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

              // Centrar mapa en la ubicación del usuario la primera vez
              googleMapInstanceRef.current.setCenter(userPos);
            }

            // Actualizar ruta si está habilitada
            if (showRoute && useDirections && markers.length > 0) {
              updateRoute(userPos);
            }
          },
          (error) => {
            console.error('Error obteniendo ubicación:', error);
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

      // Continuar actualizando cada 3 segundos
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
      locationIntervalRef.current = setInterval(updateUserLocation, 3000);
    };

    const updateRoute = (userPos: { lat: number; lng: number }) => {
      if (!googleMapInstanceRef.current || !window.google || markers.length === 0) return;

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

      // Calcular ruta desde el vehículo hasta el usuario
      const request: google.maps.DirectionsRequest = {
        origin: markers[0].position,
        destination: userPos,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result && directionsRendererRef.current) {
          directionsRendererRef.current.setDirections(result);
        } else {
          console.error('Error calculando ruta:', status);
          // Fallback a línea recta si falla (aunque la intención es usar Directions API)
          // En este caso, no se implementa un fallback explícito a polyline simple aquí
          // ya que la lógica principal es usar Directions API.
        }
      });
    };

    loadScript();

    return () => {
      // Limpieza
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
      if (routeIntervalRef.current) {
        clearInterval(routeIntervalRef.current);
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }
      markersRef.current.forEach(m => m.setMap(null));
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

    // Agregar nuevos marcadores
    markers.forEach((markerData) => {
      if (!googleMapInstanceRef.current) return;

      let markerIcon;
      if (markerData.type === 'vehicle') {
        // Ícono de carrito de compras
        markerIcon = {
          path: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H6.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z',
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 1.8,
          anchor: new google.maps.Point(12, 12),
        };
      } else {
        markerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: markerData.type === 'employee' ? '#f59e0b' : '#3b82f6', // Default to blue for stops
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8,
        };
      }

      const marker = new google.maps.Marker({
        position: markerData.position,
        map: googleMapInstanceRef.current,
        title: markerData.title,
        icon: markerIcon,
        zIndex: markerData.type === 'vehicle' ? 900 : 800, // Ensure vehicle is on top
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Actualizar ruta si es necesario
    if (showRoute && useDirections && markers.length > 0 && userMarkerRef.current) {
      const userPos = userMarkerRef.current.getPosition();
      if (userPos) {
        // Helper function to update route based on current user position
        const updateRouteFromMarkers = () => {
          const pos = userMarkerRef.current?.getPosition();
          if (pos) {
            // Call the shared updateRoute logic
            updateRoute({ lat: pos.lat(), lng: pos.lng() });
          }
        };

        updateRouteFromMarkers(); // Initial call

        if (routeIntervalRef.current) {
          clearInterval(routeIntervalRef.current);
        }
        routeIntervalRef.current = setInterval(updateRouteFromMarkers, 10000); // Recalcular cada 10 segundos
      }
    } else {
        // Clear route interval if showRoute or useDirections is false, or no markers/user location
        if (routeIntervalRef.current) {
            clearInterval(routeIntervalRef.current);
            routeIntervalRef.current = null;
        }
        // Also clear the displayed route if no longer needed
        if (directionsRendererRef.current) {
            directionsRendererRef.current.setMap(null);
            directionsRendererRef.current = null;
        }
    }

    // Shared function for route calculation, used by both initial load and interval
    function updateRoute(userPos: { lat: number; lng: number }) {
      if (!googleMapInstanceRef.current || !window.google || markers.length === 0) return;

      const directionsService = new google.maps.DirectionsService();

      // Ensure directionsRenderer exists or create it
      if (!directionsRendererRef.current) {
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map: googleMapInstanceRef.current,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeWeight: 5,
          },
        });
      } else {
        // Clear previous route if re-rendering
        directionsRendererRef.current.setMap(null);
      }

      const request: google.maps.DirectionsRequest = {
        origin: markers[0].position, // Assuming the first marker is the vehicle/start point
        destination: userPos,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result && directionsRendererRef.current) {
          directionsRendererRef.current.setDirections(result);
          // Ensure the renderer is visible on the map after setting directions
          directionsRendererRef.current.setMap(googleMapInstanceRef.current);
        } else {
          console.error('Error calculando ruta:', status);
          // Optionally clear the renderer if an error occurs and no route can be drawn
          if (directionsRendererRef.current) {
              directionsRendererRef.current.setMap(null);
          }
        }
      });
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