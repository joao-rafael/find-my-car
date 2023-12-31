import { Component, Input, SimpleChanges } from '@angular/core';
import { TABLE_COLUMNS } from 'src/app/modules/shared/constants/table.constants';
import { VehiclePositionData, VehicleTimeInPOIData } from '../../../shared/interfaces/vehicle-position.interface';

/**
 * @description
 * This table component is responsible to present final
 * vehicle data to the user after processing 
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  /**
   * Data for the table
   * @type {VehicleTimeInPOI}
   */
  @Input() dataList: any[] = [];

  /**
   * Displayed table columns
   * @type {string}
   */
  displayedColumns: string[] = TABLE_COLUMNS;

  ngOnChanges(changes: SimpleChanges) {
    if(changes) {
      console.log(changes);
    }
  }
  getElementData(element: VehiclePositionData, column: string): any {

    switch (column) {
      case 'license':
        return element.license;
      case 'date_position':
        return element.date_position;
      case 'longitude':
        return element.longitude;
      case 'latitude':
        return element.latitude;
      case 'poiName':
        return element.poi;
      default:
        return '';
    }
  }
}
