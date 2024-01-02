import { Component, OnInit } from '@angular/core';
import { Mobi7Service } from '../../services/mobi7.service';
import { VehiclePositionData, VehicleTimeInPOIData } from '../shared/interfaces/vehicle-position.interface';
import { PointOfInterest } from '../shared/interfaces/poi.interface';
import { POITrackingService } from 'src/app/services/poitracking.service';
import { FormFilter } from '../shared/interfaces/form-filter.interface';

/**
 * @description 
 * This component represents the dashboard web page and has 3 sub-components
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   * Is the dashboard currently loading?
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * Vehicle positions with associated poi
   * @type {VehicleTimeInPOIData}
   */
  positionInPOIList: VehiclePositionData[] = [];

  /**
   * Consolidated table data (time spent in each poi per vehicle)
   * @type {VehicleTimeInPOIData}
   */
  vehicleTimeInPOIList: VehicleTimeInPOIData[]  = [];

  constructor(
    private poiTrackingService: POITrackingService,
    private mobi7Service: Mobi7Service,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Gets the necessary data by using the services
   * @returns {void}
   */
  loadData(filter?: FormFilter): void {
    let pois: PointOfInterest[];
    let vehiclePositions: VehiclePositionData[];

    this.mobi7Service.getPois().subscribe((poisData: PointOfInterest[]) => {
      pois = poisData;

        this.mobi7Service.getRegisteredPositions(filter).subscribe((positionsData: VehiclePositionData[]) => {
          vehiclePositions = positionsData;

          if (pois && vehiclePositions) {
            this.positionInPOIList = this.poiTrackingService.associatePOI(vehiclePositions, pois);
            this.vehicleTimeInPOIList = this.poiTrackingService.calculateTimePerPOI(this.positionInPOIList);
          }
        });
      });
  }

  /**
   * Applies filter from the form (via event)
   * @param filter emitted form filter
   */
  onFilterChange(filter: FormFilter): void {
    this.loadData(filter);
  }
}