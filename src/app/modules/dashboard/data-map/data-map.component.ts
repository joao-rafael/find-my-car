import { Component } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss']
})
export class DataMapComponent {
  map: google.maps.Map | undefined;

  mapCenter: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 }; // New York Coordinates
  mapZoom = 12;

  constructor(private readonly infoWindow: MapInfoWindow) {}

  ngOnInit() {
  }
}
