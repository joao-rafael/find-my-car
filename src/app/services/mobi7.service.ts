import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe,  map} from 'rxjs';
import { PointOfInterest } from '../modules/shared/interfaces/poi.interface';
import { VehiclePositionData } from '../modules/shared/interfaces/vehicle-position.interface';
import { FormFilter } from '../modules/shared/interfaces/form-filter.interface';
import { HttpParameterCodec } from '@angular/common/http';

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
/**
 * MOBI7 Service
 * 
 * @description
 * This service connects to the mobi7 api and fetches data from the server
 * 
 * @remark
 * The received server data is being translated to english by using the pipe and map operators
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
   * @param filter optional request filter
   * @returns observable
   */  
  getRegisteredPositions(filter?: FormFilter): Observable<VehiclePositionData[]> {
    let params = new HttpParams();

    if(filter) {
      if('license' in filter) {
        params = params.set('placa', filter.license) 
      }
      if('date' in filter) {
        params = params.set('data',filter.date) 
      }
    }
    
    return this.client.get<VehiclePositionData[]>(this.mobi7API+'/posicao', { params }).pipe(
      map((data: any[]) => {
        return data.map(item => {
          return {
            id: item.id,
            license: item.placa,
            date_position: item.data,
            speed: item.velocidade,
            latitude: item.latitude,
            longitude: item.longitude,
            ignited: item.ignicao
          } as VehiclePositionData;
        });
      })
    );
  }

  /**
   * HTTP GET REQUEST FOR REGISTERED LICENSES
   * @returns observable <string>
   */  
  getLicenses(): Observable<string[]> {
    return this.client.get<string[]>(this.mobi7API+'/placas');
  }
}
