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
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyDs8BKAd6nf2oUtwP6PV31ZjdVIsCXgeYc';

declare global {
  interface Window {
    initMap?: () => void;
  }
}

export function GoogleMap({
  center = { lat: 19.4326, lng: -99.1332 }, // Ciudad de México
  zoom = 12,
  markers = [],
  className = '',
  showRoute = false,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const polylineRef = useRef<google.maps.Polyline | null>(null);

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
    if (showRoute && markers.length > 1) {
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
  }, [markers, showRoute]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}