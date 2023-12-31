import { Component, AfterViewInit } from '@angular/core';
import { PointOfInterest } from 'src/app/modules/shared/interfaces/poi.interface';
import { Mobi7Service } from 'src/app/services/mobi7.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map!: google.maps.Map;
  mapCenter: google.maps.LatLngLiteral = { lat: -7.1195, lng: -34.8824 };
  pois: PointOfInterest[] = [];

  constructor(private mobi7Service: Mobi7Service) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.mobi7Service.getPois().subscribe((val) => {
      this.pois = val;
      this.addPois();
    });
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center:{ lat: -7.1195, lng: -34.8824 },
      zoom: 12
    };

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
  }

  addPois(): void {
    for (const poi of this.pois) {
      const marker = new google.maps.Marker({
        position: { lat: poi.latitude, lng: poi.longitude },
        map: this.map,
        title: poi.name
      });

      const infowindow = new google.maps.InfoWindow({
        content: `<p>Point of Interest/${poi.name}</p>`
      });

      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
      });
    }
  }
}
