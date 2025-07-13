export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface GetDistanceBetweenCoordinates {
  from: Coordinate;
  to: Coordinate;
}
