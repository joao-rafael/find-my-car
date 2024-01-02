import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

/**
 * @description
 * This service contains operations related to the map component
 * and to the google-maps API integration
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {
  /**
   * Google maps URL with API Key
   * @remark
   * must be kept away from public repositories
   */
  mapsUrl: string = environment.mapsApi;

  /**
   * Subject: updates the map with marker data from the table
   * @type {subject}
   */
  private markerInfoSource = new Subject<{ coordinate: { lat: number; lng: number }; color: string }>();
  markerInfo$ = this.markerInfoSource.asObservable();

  constructor(private http: HttpClient) { }

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

  /**
   * Updates the marker subject
   * @param markerInfo marker parameters
   */
  sendMarkerInfo(markerInfo: { coordinate: { lat: number; lng: number }; color: string }) {
    this.markerInfoSource.next(markerInfo);
  }
}
