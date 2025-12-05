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
const FASHION_MALL_LOCATION = { lat: 28.6272, lng: -106.1135 };

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

      // Siempre iniciar rastreo de ubicación del usuario (punto azul)
      startUserLocationTracking();
      
      // Si es modo empleado, también crear el marcador del vehículo
      if (employeeMode) {
        initEmployeeMode();
      }
    };

    const initEmployeeMode = () => {
      if (!googleMapInstanceRef.current || !window.google) return;

      // Crear marcador del automóvil en Fashion Mall
      vehicleMarkerRef.current = new google.maps.Marker({
        position: FASHION_MALL_LOCATION,
        map: googleMapInstanceRef.current,
        title: 'Vehículo de Transporte - Fashion Mall',
        icon: {
          path: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 1.5,
          anchor: new google.maps.Point(12, 12),
        },
        zIndex: 900,
      });

      // Info window para el vehículo
      const vehicleInfoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>Vehículo de Transporte</strong><br/>Fashion Mall</div>`,
      });

      vehicleMarkerRef.current.addListener('click', () => {
        vehicleInfoWindow.open(googleMapInstanceRef.current, vehicleMarkerRef.current);
      });
    };

    const startUserLocationTracking = () => {
      if (!navigator.geolocation) {
        console.error('❌ Geolocation NO disponible en este navegador');
        return;
      }

      console.log('🌍 Iniciando rastreo GPS en tiempo real...');

      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }

      // Usar watchPosition para actualización continua en tiempo real
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          // ✅ DATOS DIRECTOS DEL GPS - SIN MODIFICAR
          const gpsLat = position.coords.latitude;
          const gpsLng = position.coords.longitude;
          const gpsAccuracy = position.coords.accuracy;

          console.log('✅ GPS ACTUALIZADO:');
          console.log('   📍 Latitud:', gpsLat);
          console.log('   📍 Longitud:', gpsLng);
          console.log('   📏 Precisión:', gpsAccuracy, 'metros');

          const userPos = { lat: gpsLat, lng: gpsLng };

          if (!googleMapInstanceRef.current || !window.google) return;

          // Crear posición exacta del GPS
          const gpsPosition = new google.maps.LatLng(gpsLat, gpsLng);

          if (userMarkerRef.current) {
            // ✅ ACTUALIZAR posición del marcador existente
            userMarkerRef.current.setPosition(gpsPosition);
            console.log('✅ Marcador azul MOVIDO a GPS:', gpsLat, ',', gpsLng);
          } else {
            // ✅ CREAR nuevo marcador azul
            userMarkerRef.current = new google.maps.Marker({
              position: gpsPosition,
              map: googleMapInstanceRef.current,
              title: '📍 Tu Ubicación GPS en Tiempo Real',
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 4,
                scale: 15,
              },
              zIndex: 1000,
              optimized: false,
            });

            console.log('✅ Marcador azul CREADO en GPS:', gpsLat, ',', gpsLng);

            // Centrar mapa en la ubicación del usuario la primera vez
            if (employeeMode && vehicleMarkerRef.current) {
              // Si hay vehículo, mostrar ambos puntos
              const bounds = new google.maps.LatLngBounds();
              bounds.extend(gpsPosition);
              bounds.extend(FASHION_MALL_LOCATION);
              googleMapInstanceRef.current.fitBounds(bounds);
            } else {
              googleMapInstanceRef.current.setCenter(gpsPosition);
            }
          }

          // Actualizar ruta si es necesario
          if (employeeMode && vehicleMarkerRef.current) {
            updateEmployeeRoute(userPos);
          } else if (showRoute && useDirections && markers.length > 0) {
            updateRoute(userPos);
          }
        },
        (error) => {
          console.error('❌ ERROR DE GPS:', error);
          let errorMessage = '';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = '🚫 Permiso de ubicación DENEGADO. Permite el acceso en tu navegador.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = '📡 Señal GPS no disponible. Sal al exterior o acércate a una ventana.';
              break;
            case error.TIMEOUT:
              errorMessage = '⏱️ Tiempo de espera agotado. Verifica tu conexión GPS.';
              break;
            default:
              errorMessage = '❓ Error desconocido: ' + error.message;
          }
          
          console.error(errorMessage);
        },
        {
          enableHighAccuracy: true,    // ✅ Usar GPS de alta precisión
          timeout: 15000,               // ✅ Esperar hasta 15 segundos
          maximumAge: 0                 // ✅ NO usar datos en caché
        }
      );
    };

    const updateEmployeeRoute = (userPos: { lat: number; lng: number }) => {
      if (!googleMapInstanceRef.current || !window.google || !employeeMode) return;

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

      // Calcular ruta desde la ubicación GPS del usuario hasta Fashion Mall
      const request: google.maps.DirectionsRequest = {
        origin: userPos,
        destination: FASHION_MALL_LOCATION,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result && directionsRendererRef.current) {
          directionsRendererRef.current.setDirections(result);
          console.log('🚗 Ruta calculada desde GPS hacia Fashion Mall');
        } else {
          console.error('❌ Error calculando ruta:', status);
        }
      });
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
    // En employeeMode, no renderizar marcadores adicionales (solo el punto azul y vehículo principal)
    if (employeeMode) return;

    if (!googleMapInstanceRef.current || !window.google) return;

    // Limpiar marcadores anteriores
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Si no hay marcadores, salir
    if (!markers || markers.length === 0) {
      console.log('⚠️ No hay marcadores para renderizar');
      return;
    }

    console.log(`🚗 Renderizando ${markers.length} marcadores de vehículos...`);

    // Renderizar cada marcador
    markers.forEach((markerData, index) => {
      if (!googleMapInstanceRef.current || !window.google) return;

      let markerIcon;
      if (markerData.type === 'vehicle') {
        markerIcon = {
          path: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 1.5,
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

      console.log(`✅ Marcador ${index + 1} creado:`, markerData.title, markerData.position);

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    console.log(`✅ ${markers.length} marcadores de vehículos renderizados en el mapa admin`);
  }, [markers, showRoute, useDirections, employeeMode]);

  return (
    <div
      ref={mapRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}