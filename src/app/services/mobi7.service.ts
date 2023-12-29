import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
  mobi7API: string = environment.mobi7Api;

  constructor(private client: HttpClient) { }

  /**
   * GET REQUEST FOR POIS
   * @returns observable
   */  
  getPois() {
    return this.client.get(this.mobi7API+'/posicao');
  }

  /**
   * GET REQUEST FOR LICENSES
   * @returns observable
   */  
  getLicenses() {
    return this.client.get(this.mobi7API+'/posicao/placas');
  }
}
