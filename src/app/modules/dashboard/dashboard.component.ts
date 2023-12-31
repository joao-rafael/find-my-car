import { Component, OnInit } from '@angular/core';
import { Mobi7Service } from '../../services/mobi7.service';
import { VehiclePositionData, VehicleTimeInPOIData } from '../shared/interfaces/vehicle-position.interface';
import { PointOfInterest } from '../shared/interfaces/poi.interface';
import { POITrackingService } from 'src/app/services/poitracking.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = false;
  vehicleTimeInPOIList: any = [];

  constructor(
    private poiTrackingService: POITrackingService,
    private mobi7Service: Mobi7Service,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Gets the necessary data by using the services
   * @returns {void}
   */
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
            this.vehicleTimeInPOIList = this.poiTrackingService.associatePOI(vehiclePositions, pois);
            console.log(this.poiTrackingService.calculateTimePerPOI(this.vehicleTimeInPOIList))
          }
        });
      });
    });
  }
}