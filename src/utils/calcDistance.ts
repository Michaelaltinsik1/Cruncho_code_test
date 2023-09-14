// Function to convert degrees to radians
const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

// Function to calculate the distance between two coordinates in kilometers using the Haversine formula
export const calculateDistanceInKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  // Radius of the Earth in kilometers
  const earthRadiusKm = 6371;

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = degreesToRadians(lat1);
  const lng1Rad = degreesToRadians(lng1);
  const lat2Rad = degreesToRadians(lat2);
  const lng2Rad = degreesToRadians(lng2);

  // Calculate the differences between coordinates
  const latDiff = lat2Rad - lat1Rad;
  const lngDiff = lng2Rad - lng1Rad;

  // Calculate the Haversine formula
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lngDiff / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance in kilometers
  const distanceKm = earthRadiusKm * c;

  // The distance in kilometers with one decimals
  return Number(distanceKm.toFixed(1));
};
