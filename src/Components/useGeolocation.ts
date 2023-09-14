import { useState, useEffect } from 'react';
import { LocationType, ErrorType } from '@/utils/types';

const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>({
    loaded: false,
    coordinates: { lat: null, lng: null },
    error: null,
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      error: null,
    });
  };

  const onError = (error: ErrorType) => {
    setLocation({
      loaded: true,
      coordinates: { lat: null, lng: null },
      error,
    });
  };
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({ code: 0, message: 'Geolocation not supported' });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
};
export default useGeoLocation;
