function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

interface ICoordinate {
  latitude: number;
  longitude: number;
}

export function getDistanceFromCoordinates(start: ICoordinate, end: ICoordinate) {
  const R = 6371; // Radius of the earth in km

  const dLat = deg2rad(end.latitude - start.latitude);
  const dLon = deg2rad(end.longitude - start.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start.latitude)) *
      Math.cos(deg2rad(end.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * b; // Distance in km
}
