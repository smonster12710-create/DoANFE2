export function celestialToXYZ(
  lon,
  lat,
  radius = 100
) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = lon * Math.PI / 180;

  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}