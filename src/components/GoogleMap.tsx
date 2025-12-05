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
  useVehicleIcon?: boolean; // Nueva prop para usar ícono de vehículo
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
  useVehicleIcon = false,
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

      // Obtener ubicación del usuario
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            if (!googleMapInstanceRef.current) return;

            // Crear marcador de usuario
            if (userMarkerRef.current) {
              userMarkerRef.current.setMap(null);
            }

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

            // Centrar en usuario
            googleMapInstanceRef.current.setCenter(userPos);
            
            // Dibujar ruta hacia la ubicación del usuario
            if (showRoute && useDirections && markers.length > 0) {
              drawDirectionsRoute();
            }
          },
          (error) => {
            console.log('Error obteniendo ubicación:', error);
          }
        );
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

        // Configurar ícono según el tipo
        let markerIcon;
        if (useVehicleIcon && markerData.type === 'vehicle') {
          // Ícono de vehículo similar a Uber
          markerIcon = {
            path: 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z',
            fillColor: '#10b981',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 0.7,
            anchor: new google.maps.Point(11, 46),
          };
        } else {
          // Ícono circular para otros tipos
          markerIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: getMarkerColor(markerData.type),
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
      if (!googleMapInstanceRef.current || !window.google) return;

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

      // Determinar origen y destino
      let origin, destination;
      
      if (markers.length >= 2) {
        // Si hay múltiples marcadores, usar el primero y el último
        const waypoints = markers.slice(1, -1).map(m => ({
          location: m.position,
          stopover: true,
        }));
        
        origin = markers[0].position;
        destination = markers[markers.length - 1].position;
        
        const request: google.maps.DirectionsRequest = {
          origin: origin,
          destination: destination,
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
      } else if (markers.length === 1 && userMarkerRef.current) {
        // Si solo hay un marcador (vehículo), usar la ubicación del usuario como destino
        origin = markers[0].position;
        destination = userMarkerRef.current.getPosition()?.toJSON();
        
        if (destination) {
          const request: google.maps.DirectionsRequest = {
            origin: origin,
            destination: destination,
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

      // Configurar ícono según el tipo
      let markerIcon;
      if (useVehicleIcon && markerData.type === 'vehicle') {
        // Ícono de vehículo similar a Uber
        markerIcon = {
          path: 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z',
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 0.7,
          anchor: new google.maps.Point(11, 46),
        };
      } else {
        // Ícono circular para otros tipos
        markerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: markerData.type === 'vehicle' ? '#10b981' : markerData.type === 'employee' ? '#f59e0b' : '#3b82f6',
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

        // Preparar waypoints
        const waypoints = markers.slice(1, -1).map(m => ({
          location: m.position,
          stopover: true,
        }));

        // Calcular ruta
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