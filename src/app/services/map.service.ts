import { Injectable } from '@angular/core';
import '@angular/google-maps';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getDistance(radius: number, latitude: number, longitude:number) {
    const point = new google.maps.LatLng(-3.10194, -60.025);
    const center = new google.maps.LatLng(-3.07307, -60.023);
    
    const isWithinRadius = google.maps.geometry.spherical.computeDistanceBetween(point, center) <= radius;
    
    if (isWithinRadius) {
      return true;
    } else {
      return false;
    }
  }
}
