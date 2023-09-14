'use client';
import useGeoLocation from '@/Components/useGeolocation';
import NearbyPlacesContainer from '@/Components/NearbyPlacesContainer';
import axios from 'axios';
import React from 'react';
import { usePlacesStore } from '@/store/places';
import { useEffect } from 'react';
export default function Home() {
  const { places, setPlaces } = usePlacesStore();
  const location = useGeoLocation();

  const displayCoordinates = () => {
    if (location.loaded) {
      if (location.coordinates.lat && location.coordinates.lng) {
        return (
          <p className="text-2xl mb-2">
            Lat: {location.coordinates.lat} Lng: {location.coordinates.lng}
          </p>
        );
      } else {
        return <p>Error: {location.error?.message}</p>;
      }
    }
    return <p>location data is not available yet</p>;
  };
  useEffect(() => {
    const handleFetch = async () => {
      if (location.coordinates.lat && location.coordinates.lng) {
        try {
          const response = await axios.post('/api/places', {
            body: {
              location: `${location.coordinates.lat},${location.coordinates.lng}`,
              radius: '6000',
              type: 'restaurant',
            },
          });

          setPlaces(response.data.data.results);
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleFetch();
  }, [location, setPlaces]);

  return (
    <main className="min-h-screen flex flex-col items-center p-24 bg-[#bbdefb]">
      <h1 className="text-5xl mb-6 text-red-500">Nearby places finder</h1>
      {displayCoordinates()}
      <div>{places && <NearbyPlacesContainer />}</div>
    </main>
  );
}
