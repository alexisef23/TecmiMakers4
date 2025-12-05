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
  employeeMode?: boolean;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyDs8BKAd6nf2oUtwP6PV31ZjdVIsCXgeYc';
const FASHION_MALL_LOCATION = { lat: 28.6360, lng: -106.0900 };

declare global {
  interface Window {
    initMap?: () => void;
  }
}

export function GoogleMap({
  center = { lat: 28.6460, lng: -106.1025 },
  zoom = 12,
  markers = [],
  className = '',
  showRoute = false,
  useDirections = false,
  employeeMode = false,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const vehicleMarkerRef = useRef<google.maps.Marker | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const loadScript = () => {
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogle);
            initializeMap();
          }
        }, 100);
        return;
      }

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

      googleMapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      if (employeeMode) {
        initEmployeeMode();
      } else {
        startUserLocationTracking();
      }
    };

    const initEmployeeMode = () => {
      if (!googleMapInstanceRef.current || !window.google) return;

      // Crear marcador del carrito en Fashion Mall
      vehicleMarkerRef.current = new google.maps.Marker({
        position: FASHION_MALL_LOCATION,
        map: googleMapInstanceRef.current,
        title: 'Carrito de Transporte - Fashion Mall',
        icon: {
          path: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H6.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z',
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 1.8,
          anchor: new google.maps.Point(12, 12),
        },
        zIndex: 900,
      });

      // Info window para el carrito
      const vehicleInfoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>Carrito de Transporte</strong><br/>Fashion Mall</div>`,
      });

      vehicleMarkerRef.current.addListener('click', () => {
        vehicleInfoWindow.open(googleMapInstanceRef.current, vehicleMarkerRef.current);
      });

      startEmployeeLocationTracking();
    };

    const startEmployeeLocationTracking = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation no está disponible');
        return;
      }

      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      watchIdRef.current = navigator.geolocation.watchPosition(
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

            // Centrar el mapa entre el usuario y Fashion Mall
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(userPos);
            bounds.extend(FASHION_MALL_LOCATION);
            googleMapInstanceRef.current.fitBounds(bounds);
          }

          // Actualizar ruta
          updateEmployeeRoute(userPos);
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

    const updateEmployeeRoute = (userPos: { lat: number; lng: number }) => {
      if (!googleMapInstanceRef.current || !window.google) return;

      const directionsService = new google.maps.DirectionsService();

      // Limpiar ruta anterior
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

      // Calcular ruta desde el carrito (Fashion Mall) hasta el usuario
      const request: google.maps.DirectionsRequest = {
        origin: FASHION_MALL_LOCATION,
        destination: userPos,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result && directionsRendererRef.current) {
          directionsRendererRef.current.setDirections(result);
        }
      });
    };

    const startUserLocationTracking = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation no está disponible');
        return;
      }

      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (!googleMapInstanceRef.current || !window.google) return;

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

            googleMapInstanceRef.current.setCenter(userPos);
          }

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

    const updateRoute = (userPos: { lat: number; lng: number }) => {
      if (!googleMapInstanceRef.current || !window.google || markers.length === 0) return;

      const directionsService = new google.maps.DirectionsService();

      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }

      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map: googleMapInstanceRef.current,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#3b82f6',
          strokeOpacity: 0.8,
          strokeWeight: 5,
        },
      });

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
        }
      });
    };

    loadScript();

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }
      if (vehicleMarkerRef.current) {
        vehicleMarkerRef.current.setMap(null);
      }
      markersRef.current.forEach(m => m.setMap(null));
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (!googleMapInstanceRef.current || !window.google || employeeMode) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    markers.forEach((markerData) => {
      if (!googleMapInstanceRef.current) return;

      let markerIcon;
      if (markerData.type === 'vehicle') {
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
          fillColor: markerData.type === 'employee' ? '#f59e0b' : '#3b82f6',
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
        zIndex: markerData.type === 'vehicle' ? 900 : 800,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  }, [markers, showRoute, useDirections, employeeMode]);

  return (
    <div
      ref={mapRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}