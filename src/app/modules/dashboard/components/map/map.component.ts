import { Component, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PointOfInterest } from 'src/app/modules/shared/interfaces/poi.interface';
import { MapService } from 'src/app/services/map.service';
import { Mobi7Service } from 'src/app/services/mobi7.service';
import { MAP_ICON, MARKER_INFO_WINDOW, POI_INFO_WINDOW } from 'src/app/modules/shared/constants/map.constants';
import { MarkerTypes, ZoomTypes } from 'src/app/modules/shared/enums/map.enums';

/**
 * @description
 * renders a google maps component and make it reactive to user selection in
 * the table component
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  /**
   * Marker Info from Table
   * @type {subscription}
   * @implements {Observer}
   */
  receivedMarkerInfo: { coordinate: google.maps.LatLngLiteral; color: string } | undefined;
  private subscription: Subscription;

  /**
   * Marker options
   * @type {MarkerOptions}
   */
  markerOptions: google.maps.MarkerOptions = {};

  /**
   * Google maps map component
   */
  map!: google.maps.Map;

  /**
   * List of Points of interest (pois)
   * @remark those will be visible on the map
   */
  pois: PointOfInterest[] = [];

  constructor(private mapService: MapService, private mobi7Service: Mobi7Service) {
    this.subscription = this.mapService.markerInfo$.subscribe((markerInfo) => {
      if (this.map) {
        this.addVehicleMarker(markerInfo.coordinate);
      }
    });
  }

  ngAfterViewInit(): void {
    this.mobi7Service.getPois().subscribe((val) => {
      this.pois = val;
      this.initMap();
      this.addPois();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Inits the google maps instance
   * @returns {void}
   */
  initMap(): void {
    let latitude: number = parseFloat(this.pois[0].latitude.toFixed(4));
    let longitude: number = parseFloat(this.pois[0].longitude.toFixed(4));

    const mapOptions: google.maps.MapOptions = {
      center:{ lat: latitude, lng: longitude },
      zoom: ZoomTypes.default
    };

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
  }

  /**
   * Sets marker behavior accordingly to the marker type
   * @param type type of the marker (vehicle/poi)
   * @param marker google maps marker
   * @param infowindow google maps info window
   */
  setUpMarkerBehavior(type: string, marker: google.maps.Marker, infowindow: google.maps.InfoWindow, radius?: number) {
    switch(type){
      case MarkerTypes.vehicle:
        infowindow.open(this.map, marker);
        infowindow.addListener('closeclick', () => {
          this.map.setZoom(ZoomTypes.default); 
          marker.setMap(null); 
        });
        break;
      case MarkerTypes.poi:
        const circle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: null,
          center: marker.getPosition(),
          radius: radius
        });
    
        marker.addListener('click', () => {
          infowindow.open(this.map, marker);
          circle.setMap(this.map);
          const position = marker.getPosition()
          if(position) {
            this.map.setCenter(position);
            this.map.setZoom(ZoomTypes.zoomIn); 
          }
        });

        infowindow.addListener('closeclick', () => {
          circle.setMap(null); 
          this.map.setZoom(ZoomTypes.default); 
        });
        break;
      default:
        return;
    }
  }

  /**
   * Adds markers for registered vehicle positions (from the table)
   * @param coordinate registered position coordinate
   */
  addVehicleMarker(coordinate: google.maps.LatLngLiteral) {
    const marker = new google.maps.Marker({
      position: coordinate,
      map: this.map,
      icon: MAP_ICON
    });
    const infowindow = new google.maps.InfoWindow({
      content: MARKER_INFO_WINDOW
    });
    this.map.setCenter(coordinate);
    this.map.setZoom(ZoomTypes.zoomIn); 
    this.setUpMarkerBehavior(MarkerTypes.vehicle, marker, infowindow);
  }

  /**
   * Add markers for POI (points of interest)
   * @return {void}
   */
  addPois(): void {
    for (const poi of this.pois) {
      const marker = new google.maps.Marker({
        position: { lat: poi.latitude, lng: poi.longitude },
        map: this.map,
        title: poi.name
      });
  
      const infowindow = new google.maps.InfoWindow({
        content: POI_INFO_WINDOW(poi.name, poi.radius),
      });
      this.setUpMarkerBehavior(MarkerTypes.poi, marker, infowindow, poi.radius);
    }
  }
}
