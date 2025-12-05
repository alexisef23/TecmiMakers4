
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

// Variable global para rastrear si el script ya se cargó
let isGoogleMapsLoaded = false;
let loadingPromise: Promise<void> | null = null;

export function GoogleMap({
  center = { lat: 19.4326, lng: -99.1332 }, // Ciudad de México
  zoom = 12,
  markers = [],
  className = '',
  showRoute = false,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userLocationMarkerRef = useRef<google.maps.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = (): Promise<void> => {
      // Si ya está cargado, retornar promesa resuelta
      if (isGoogleMapsLoaded && window.google && window.google.maps) {
        return Promise.resolve();
      }

      // Si ya hay una carga en progreso, retornar esa promesa
      if (loadingPromise) {
        return loadingPromise;
      }

      // Crear nueva promesa de carga
      loadingPromise = new Promise((resolve, reject) => {
        // Verificar si el script ya existe
        const existingScript = document.querySelector(
          'script[src*="maps.googleapis.com"]'
        );
        
        if (existingScript) {
          existingScript.addEventListener('load', () => {
            isGoogleMapsLoaded = true;
            resolve();
          });
          existingScript.addEventListener('error', reject);
          return;
        }

        // Crear nuevo script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,places`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          isGoogleMapsLoaded = true;
          resolve();
        };
        
        script.onerror = () => {
          loadingPromise = null;
          reject(new Error('Error al cargar Google Maps API'));
        };
        
        document.head.appendChild(script);
      });

      return loadingPromise;
    };

    const initializeMap = async () => {
      try {
        // Cargar el script de Google Maps
        await loadGoogleMapsScript();

        // Verificar que el contenedor del mapa existe
        if (!mapRef.current) {
          console.error('El contenedor del mapa no existe');
          return;
        }

        // Verificar que Google Maps está disponible
        if (!window.google || !window.google.maps) {
          console.error('Google Maps no está disponible');
          return;
        }

        // Estilos personalizados del mapa
        const mapStyles = [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ];

        // Crear el mapa
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: mapStyles,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        });

        // Agregar marcadores
        updateMarkers();

        // Obtener ubicación del usuario
        getUserLocation();
      } catch (error) {
        console.error('Error al inicializar el mapa:', error);
      }
    };

    const getUserLocation = () => {
      if (!navigator.geolocation) {
        console.warn('Geolocalización no disponible');
        return;
      }

      // Obtener ubicación actual
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (!googleMapRef.current || !window.google) return;

          // Eliminar marcador anterior si existe
          if (userLocationMarkerRef.current) {
            userLocationMarkerRef.current.setMap(null);
          }

          // Crear marcador de ubicación del usuario
          userLocationMarkerRef.current = new window.google.maps.Marker({
            position: userLocation,
            map: googleMapRef.current,
            title: 'Mi Ubicación',
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 10,
            },
            zIndex: 1000,
          });

          // Centrar mapa en ubicación del usuario
          googleMapRef.current.panTo(userLocation);
        },
        (error) => {
          console.warn('Error al obtener ubicación:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

      // Seguir ubicación del usuario en tiempo real
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (userLocationMarkerRef.current) {
            userLocationMarkerRef.current.setPosition(userLocation);
          }
        },
        (error) => {
          console.warn('Error al seguir ubicación:', error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );
    };

    const updateMarkers = () => {
      if (!googleMapRef.current || !window.google || !window.google.maps) {
        return;
      }

      // Limpiar marcadores existentes
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Agregar nuevos marcadores
      markers.forEach((markerData) => {
        if (!googleMapRef.current) return;

        const marker = new window.google.maps.Marker({
          position: markerData.position,
          map: googleMapRef.current,
          title: markerData.title,
          icon: getMarkerIcon(markerData.type),
        });

        markersRef.current.push(marker);

        // Agregar ventana de información
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
        });
      });

      // Dibujar ruta si está habilitado
      if (showRoute && markers.length > 1) {
        drawRoute();
      }
    };

    const getMarkerIcon = (type?: string) => {
      if (!window.google || !window.google.maps) return undefined;

      const iconColors: Record<string, string> = {
        vehicle: '#10b981',
        stop: '#3b82f6',
        employee: '#f59e0b',
      };

      const color = iconColors[type || 'stop'] || '#6366f1';

      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 8,
      };
    };

    const drawRoute = () => {
      if (!googleMapRef.current || !window.google || markers.length < 2) {
        return;
      }

      const path = markers.map((m) => m.position);

      new window.google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#3b82f6',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: googleMapRef.current,
      });
    };

    // Inicializar el mapa
    initializeMap();

    // Cleanup al desmontar
    return () => {
      if (userLocationMarkerRef.current) {
        userLocationMarkerRef.current.setMap(null);
        userLocationMarkerRef.current = null;
      }
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      googleMapRef.current = null;
    };
  }, [center.lat, center.lng, zoom]);

  // Actualizar marcadores cuando cambien
  useEffect(() => {
    if (googleMapRef.current && window.google && window.google.maps) {
      // Limpiar marcadores existentes
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Agregar nuevos marcadores
      markers.forEach((markerData) => {
        if (!googleMapRef.current || !window.google) return;

        const marker = new window.google.maps.Marker({
          position: markerData.position,
          map: googleMapRef.current,
          title: markerData.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: markerData.type === 'vehicle' ? '#10b981' : markerData.type === 'employee' ? '#f59e0b' : '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8,
          },
        });

        markersRef.current.push(marker);

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
        });
      });

      // Dibujar ruta si está habilitado
      if (showRoute && markers.length > 1) {
        const path = markers.map((m) => m.position);
        new window.google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: '#3b82f6',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map: googleMapRef.current,
        });
      }
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
