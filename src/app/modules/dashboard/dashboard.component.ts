import { Component, OnInit } from '@angular/core';
import { Mobi7Service } from '../../services/mobi7.service';
import { VehiclePositionData, VehicleTimeInPOI } from '../shared/interfaces/vehicle-position.interface';
import { PointOfInterest } from '../shared/interfaces/poi.interface';
import { POITrackingService } from 'src/app/services/poitracking.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vehicleTimeInPOIList: VehicleTimeInPOI[] = [];

  constructor(
    private poiTrackingService: POITrackingService,
    private mobi7Service: Mobi7Service,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    let pois: PointOfInterest[];
    let licenses: string[];
    let vehiclePositions: VehiclePositionData[];

    this.mobi7Service.getPois().subscribe((poisData: PointOfInterest[]) => {
      pois = poisData;

      this.mobi7Service.getLicenses().subscribe((licensesData: string[]) => {
        licenses = licensesData;

        this.mobi7Service.getRegisteredPositions().subscribe((positionsData: VehiclePositionData[]) => {
          vehiclePositions = positionsData;
          console.log(vehiclePositions)

          if (pois && licenses && vehiclePositions) {
            this.calculateTimeInPOIs(pois, licenses, vehiclePositions);
          }
          console.log(this.vehicleTimeInPOIList);
        });
      });
    });
  }

  calculateTimeInPOIs(pois: PointOfInterest[], licenses: string[], vehiclePositions: VehiclePositionData[]): void {
    licenses.forEach((license: string) => {
      const timeInPoiMap = this.poiTrackingService.getSpentTimeInPoi(license, pois, vehiclePositions);
      const matchingPositions = vehiclePositions.filter((position) => position.license === license);

      pois.forEach((poi: PointOfInterest) => {
        const time = timeInPoiMap.get(poi.name) || 0;
        const matchingPosition = matchingPositions.find((position) => this.isInPoiArea(position, poi));

        if (matchingPosition) {
          const vehicleTimeInPOI: VehicleTimeInPOI = {
            license,
            poiName: poi.name,
            timeSpent: time,
            latitude: poi.latitude,
            longitude: poi.longitude,
            date_position: matchingPosition.date_position
          };
          this.vehicleTimeInPOIList.push(vehicleTimeInPOI);
        }
      });
    });
  }

  isInPoiArea(position: VehiclePositionData, poi: PointOfInterest): boolean {
    const distance = this.poiTrackingService.haversine(position.latitude, position.longitude, poi.latitude, poi.longitude);
    return distance <= poi.radius;
  }
}