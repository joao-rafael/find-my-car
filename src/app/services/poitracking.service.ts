import { Injectable } from '@angular/core';
import { PointOfInterest } from '../modules/shared/interfaces/poi.interface';
import { VehiclePositionData } from '../modules/shared/interfaces/vehicle-position.interface';

/**
 * @description
 * This service contains the necessary mathematical operations
 * related to the Point of Interest (POI) tracking for each vehicle data
 */
@Injectable({
  providedIn: 'root'
})
export class POITrackingService {
  constructor() { }

  /**
   * Calculates the time a vehicle spent in each poi
   * @param license The vehicle license plate
   * @param pois The points of interest
   * @param vehiclePositions The vehicle positions
   * @returns A map with the time spent in each point of interest
   */
  getSpentTimeInPoi(license: string, pois: PointOfInterest[], vehiclePositions: VehiclePositionData[]): Map<string, number> {
    const spentTimeInPoi: Map<string, number> = new Map();
    const vehiclePositionsFiltered = vehiclePositions.filter(position => position.license === license);

    for (const position of vehiclePositionsFiltered) {
      for (const poi of pois) {
        const distance = this.haversine(
          position.latitude,
          position.longitude,
          poi.latitude,
          poi.longitude
        );

        if (distance <= poi.radius) {
          const timeInPOI = spentTimeInPoi.get(poi.name) || 0;
          spentTimeInPoi.set(poi.name, timeInPOI + 1); // Increment time spent in seconds inside the POI
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
   * For more information about the Haversine formula, visit: [link]
   */
  haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;
    const earthRadius = 6371e3; // Mean radius of the Earth in meters

    const phi1 = toRadians(lat1);
    const phi2 = toRadians(lat2);
    const deltaPhi = toRadians(lat2 - lat1);
    const deltaLambda = toRadians(lon2 - lon1);

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance between the points in meters

    return distance;
  }

  /**
   * Associate POI to vehicles
   * 
   * @description gets rid of positions without POI
   */
  associatePOI(vehiclePositions: VehiclePositionData[], pois: PointOfInterest[]) {
    let arr : VehiclePositionData[] = [];

    for (const position of vehiclePositions) {
      for (const poi of pois) {
        const distancia = this.haversine(
          position.latitude,
          position.longitude,
          poi.latitude,
          poi.longitude
        );
    
        if (distancia <= poi.radius) {
          position.poi = poi.name; 
          arr.push(position);
          break;
        } 
      }
    }
    return arr;
  }

  /**
   * Calculates the time per poi and vehicle
   * @param positions 
   * @returns 
   */
  calculateTimePerPOI(positions: any[]) {
    const timeInOutPerPOI: { [key: string]: any } = {};
  
    positions.sort((a, b) => {
      if (a.license === b.license) {
        return new Date(a.date_position).getTime() - new Date(b.date_position).getTime();
      }
      return a.license.localeCompare(b.license);
    });
  
    for (let i = 0; i < positions.length; i++) {
      const currentPosition = positions[i];
  
      if (!timeInOutPerPOI[currentPosition.license + currentPosition.poi]) {
        timeInOutPerPOI[currentPosition.license + currentPosition.poi] = {
          license: currentPosition.license,
          poiName: currentPosition.poi,
          entryTime: new Date(currentPosition.date_position),
          exitTime: null,
          timeSpent: 0,
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
        };
      }
  
      if (i < positions.length - 1 && currentPosition.poi === positions[i + 1].poi) {
        const elapsedTime = (new Date(positions[i + 1].date_position).getTime() - new Date(currentPosition.date_position).getTime()) / 1000; // In seconds
        timeInOutPerPOI[currentPosition.license + currentPosition.poi].exitTime = new Date(positions[i + 1].date_position);
        timeInOutPerPOI[currentPosition.license + currentPosition.poi].timeSpent += elapsedTime;
        i++;
      }
    }
  
    const reducedTable = Object.values(timeInOutPerPOI);
  
    return reducedTable;
  }
}
