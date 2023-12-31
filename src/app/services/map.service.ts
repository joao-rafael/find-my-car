import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import '@angular/google-maps';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapsUrl: string = environment.mapsApi;

  constructor(private http: HttpClient) { }

  /**
   * Gets distance from 2 points
   * @param radius 
   * @param latitude 
   * @param longitude 
   * @returns 
   */
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

  /**
   * Loads google maps api
   * 
   * @remark
   * This is needed so we do not have to expose the API Key in the index.html file
   * 
   * @returns {void}
   */
  loadGoogleMapsAPI(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = this.mapsUrl;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = (error) => {
        reject(error);
      };

      document.head.appendChild(script);
    });
  }
}
