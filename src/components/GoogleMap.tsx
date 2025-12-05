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

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (typeof window.google !== 'undefined') {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      const mapStyles = [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ];

      // Create map
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: mapStyles,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Add markers
      updateMarkers();

      // Get and show user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Add user location marker
            if (userLocationMarkerRef.current) {
              userLocationMarkerRef.current.setMap(null);
            }

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

            // Center map on user location
            googleMapRef.current?.panTo(userLocation);
          },
          (error) => {
            console.warn('Error getting user location:', error);
          }
        );

        // Watch user position for real-time updates
        navigator.geolocation.watchPosition(
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
            console.warn('Error watching user location:', error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000,
          }
        );
      }
    };

    loadGoogleMaps();
  }, [center.lat, center.lng, zoom]);

  useEffect(() => {
    updateMarkers();
  }, [markers]);

  const updateMarkers = () => {
    if (!googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData) => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: googleMapRef.current,
        title: markerData.title,
        icon: getMarkerIcon(markerData.type),
      });

      markersRef.current.push(marker);

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapRef.current, marker);
      });
    });

    // Draw route if enabled
    if (showRoute && markers.length > 1) {
      drawRoute();
    }
  };

  const getMarkerIcon = (type?: string) => {
    const iconColors: Record<string, string> = {
      vehicle: '#10b981', // Green
      stop: '#3b82f6', // Blue
      employee: '#f59e0b', // Orange
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
    if (!googleMapRef.current || markers.length < 2) return;

    const path = markers.map((m) => m.position);

    const polyline = new window.google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#3b82f6',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      map: googleMapRef.current,
    });
  };

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
}
