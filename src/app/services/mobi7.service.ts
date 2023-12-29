import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe,  map} from 'rxjs';
import { PointOfInterest } from '../modules/shared/interfaces/poi.interface';
import { VehiclePositionData } from '../modules/shared/interfaces/vehicle-position.interface';

/**
 * MOBI7 Service
 * 
 * @description
 * This service connects to the mobi7 api and fetches data from the server
 */
@Injectable({
  providedIn: 'root'
})
export class Mobi7Service {
  /**
   * Mobi7 API Address from environment
   * @type {string}
   */
  mobi7API: string = environment.mobi7Api;

  constructor(private client: HttpClient) { }

  /**
   * HTTP GET REQUEST FOR POIS
   * @returns observable
   */  
  getPois(): Observable<PointOfInterest[]> {
    return this.client.get<PointOfInterest[]>(this.mobi7API+'/pois').pipe(
      map((data: any[]) => {
        return data.map(item => {
          return {
            name: item.nome,
            radius: item.raio,
            latitude: item.latitude,
            longitude: item.longitude
          } as PointOfInterest;
        });
      })
    );
  }

  /**
   * HTTP GET REQUEST FOR SINGLE POI 
   * @param name POI name
   * @returns observable
   */
  getSinglePoi(name: string): Observable<PointOfInterest> {
    return this.client.get<PointOfInterest>(this.mobi7API+`/pois/${name}`).pipe(
      map((item: any) => {
        return {
          name: item.nome,
          radius: item.raio,
          latitude: item.latitude,
          longitude: item.longitude
        } as PointOfInterest; 
      })
    );;
  }

  /**
   * HTTP GET REQUEST FOR REGISTERED POSITIONS 
   * @returns observable
   */  
  getRegisteredPositions(license?: string, date?: string): Observable<VehiclePositionData[]> {
    let params = new HttpParams();
    license ? params = params.set('placa', license) : '';
    date ? params = params.set('data', date) : '';

    return this.client.get<VehiclePositionData[]>(this.mobi7API+'/posicao', { params }).pipe(
      map((data: any[]) => {
        return data.map(item => {
          return {
            license: item.posicao,
            date_position: item.data_posicao,
            speed: item.velocidade,
            latitude: item.latitude,
            longitude: item.longitude,
            ignited: item.ignicao
          } as VehiclePositionData;
        });
      })
    );;
  }

  /**
   * HTTP GET REQUEST FOR REGISTERED LICENSES
   * @returns observable
   */  
  getLicenses(): Observable<String[]> {
    return this.client.get<String[]>(this.mobi7API+'/posicao/placas');
  }
}
