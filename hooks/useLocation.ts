import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Location } from '@/types/places';

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      if (Platform.OS === 'web') {
        // Web geolocation API
        if (!navigator.geolocation) {
          throw new Error('Geolocation is not supported by this browser');
        }

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
          });
        });

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } else {
        // For native platforms, we would use expo-location
        // For now, simulate location
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLocation({
          latitude: 37.7749,
          longitude: -122.4194, // San Francisco coordinates
        });
      }
    } catch (err) {
      setError('Unable to get location. Please enable location services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return {
    location,
    loading,
    error,
    requestLocation,
  };
}