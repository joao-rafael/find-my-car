import { Component, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PointOfInterest } from 'src/app/modules/shared/interfaces/poi.interface';
import { MapService } from 'src/app/services/map.service';
import { Mobi7Service } from 'src/app/services/mobi7.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  receivedMarkerInfo: { coordinate: google.maps.LatLngLiteral; color: string } | undefined;
  private subscription: Subscription;
  markerOptions: google.maps.MarkerOptions = {};

  map!: google.maps.Map;
  mapCenter: google.maps.LatLngLiteral = { lat: -7.1195, lng: -34.8824 };
  pois: PointOfInterest[] = [];

  constructor(private mapService: MapService, private mobi7Service: Mobi7Service) {
    
    this.subscription = this.mapService.markerInfo$.subscribe((markerInfo) => {
      if (this.map) {
        this.addVehicleMarker(markerInfo.coordinate, markerInfo.color);
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

  initMap(): void {
    let latitude: number = parseFloat(this.pois[0].latitude.toFixed(4));
    let longitude: number = parseFloat(this.pois[0].longitude.toFixed(4));
    const mapOptions: google.maps.MapOptions = {
      center:{ lat: latitude, lng: longitude },
      zoom: 12
    };

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
  }

  addVehicleMarker(coordinate: google.maps.LatLngLiteral, color: string) {
    const marker = new google.maps.Marker({
      position: coordinate,
      map: this.map,
      icon: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`
    });
  }

  addPois(): void {
    for (const poi of this.pois) {
      const marker = new google.maps.Marker({
        position: { lat: poi.latitude, lng: poi.longitude },
        map: this.map,
        title: poi.name
      });
  
      const infowindow = new google.maps.InfoWindow({
        content: `<p><strong>Point of Interest/${poi.name}</strong></p><br><p>Radius: ${poi.radius}m</p>`
      });
  
      const circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: null,
        center: { lat: poi.latitude, lng: poi.longitude },
        radius: poi.radius
      });
  
      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
        circle.setMap(this.map);
  
        const position = marker.getPosition()
        if(position) {
          this.map.setCenter(position);
          this.map.setZoom(15); // Defi
        }
      });
  
      infowindow.addListener('closeclick', () => {
        circle.setMap(null); 
        this.map.setZoom(12); 
      });
    }
  }
}
