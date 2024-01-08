import { SnackbarMessages } from './../shared/enums/snackbar.enums';
import { Component, OnInit } from '@angular/core';
import { Mobi7Service } from '../../services/mobi7.service';
import { VehiclePositionData, VehicleTimeInPOIData } from '../shared/interfaces/vehicle-position.interface';
import { PointOfInterest } from '../shared/interfaces/poi.interface';
import { POITrackingService } from 'src/app/services/poitracking.service';
import { FormFilter } from '../shared/interfaces/form-filter.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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

      this.mobi7Service.getRegisteredPositions(filter).subscribe({next: (positionsData: VehiclePositionData[]) => {
        vehiclePositions = positionsData;

        if (pois && vehiclePositions) {
          this.positionInPOIList = this.poiTrackingService.associatePOI(vehiclePositions, pois);
          this.vehicleTimeInPOIList = this.poiTrackingService.calculateTimePerPOI(this.positionInPOIList);
          
          if(this.vehicleTimeInPOIList.length === 0) {
            this.openSnackBar(SnackbarMessages.empty);
          } else {
            this.openSnackBar(SnackbarMessages.success);
          }
        }
      }, error: () => {
        this.openSnackBar(SnackbarMessages.fail);
      }});
    });
  }

  /**
   * Applies filter from the form (via event)
   * @param filter emitted form filter
   */
  onFilterChange(filter: FormFilter): void {
    this.loadData(filter);
  }

  onFilterClear(): void {
    this.loadData();
    this.openSnackBar(SnackbarMessages.clear);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 10000
    });
  }
}