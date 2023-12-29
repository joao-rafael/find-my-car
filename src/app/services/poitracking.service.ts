import { Injectable } from '@angular/core';
import { PointOfInterest } from '../modules/shared/interfaces/poi.interface';
import { VehicleData } from '../modules/shared/interfaces/vehicle-position.interface';

@Injectable({
  providedIn: 'root'
})
export class POITrackingService {

  constructor() { }

  /**
   * Calculates the time a vehicle spent in each poi
   * @param license 
   * @param pois 
   * @param vehiclePositions 
   * @returns 
   */
  getSpentTimeInPoi(license: string, pois: PointOfInterest[], vehiclePositions: VehicleData[]): Map<string, number> {
    const spentTimeInPoi: Map<string, number> = new Map();
  
    const vehyclePositions = vehiclePositions.filter(position => position.placa === license);
  
    for (const position of vehyclePositions) {
      for (const poi of pois) {
        const distancia = this.haversine(
          position.latitude,
          position.longitude,
          poi.latitude,
          poi.longitude
        );
  
        if (distancia <= poi.raio) {
          const tempoNoPOI = spentTimeInPoi.get(poi.nome) || 0;
          spentTimeInPoi.set(poi.nome, tempoNoPOI + 1); // Incrementa o tempo em segundos dentro do POI
        }
      }
    }
  
    return spentTimeInPoi;
  }

/**
 * Calculates the approximate distance between two geographical points using the Haversine formula.
 * 
 * @param lat1 Latitude of point 1 in decimal degrees.
 * @param lon1 Longitude of point 1 in decimal degrees.
 * @param lat2 Latitude of point 2 in decimal degrees.
 * @param lon2 Longitude of point 2 in decimal degrees.
 * @returns The distance between the points in meters.
 * 
 * @remark to know more about the haversine formula: 
 */
haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {

  /**
   * Converts degrees to radians.
   * @param degrees Value in degrees.
   * @returns Value converted to radians.
   */
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  const earthRadius = 6371e3; // Mean radius of the Earth in meters
  
  const phi1 = toRadians(lat1);
  const phi2 =  toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lon2 - lon1);

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c; // Distance between the points in meters

  return distance;
}
}
