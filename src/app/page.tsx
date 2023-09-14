'use client';
import useGeoLocation from '@/Components/useGeolocation';
import { NearbySearchResult } from '@/utils/types';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';

export default function Home() {
  const [places, setPlaces] = useState<Array<NearbySearchResult>>([]);
  const location = useGeoLocation();

  const displayCoordinates = () => {
    if (location.loaded) {
      if (location.coordinates.lat && location.coordinates.lng) {
        return (
          <p>
            Lat: {location.coordinates.lat} Lng: {location.coordinates.lng}
          </p>
        );
      } else {
        return <p>Error: {location.error?.message}</p>;
      }
    }
    return <p>location data is not available yet</p>;
  };
  const handleSearch = async () => {
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
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Nearby restaurant finder</h1>
      {displayCoordinates()}
      <div>
        <button onClick={handleSearch}>Search Nearby Places</button>
        <div>
          {places.map((place) => {
            return (
              <React.Fragment key={place.reference}>
                <h3>{place.name}</h3>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </main>
  );
}
