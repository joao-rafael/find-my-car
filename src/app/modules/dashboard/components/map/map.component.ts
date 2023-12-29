import { Component } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  map: google.maps.Map | undefined;

  mapCenter: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 }; // New York Coordinates
  mapZoom = 12;

  constructor(private readonly infoWindow: MapInfoWindow) {}

  ngOnInit() {
  }
}
