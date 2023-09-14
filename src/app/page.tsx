'use client';
import useGeoLocation from '@/Components/useGeolocation';

export default function Home() {
  const location = useGeoLocation();
  console.log('Location: ', location);

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
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Nearby restaurant finder</h1>
      {displayCoordinates()}
    </main>
  );
}
