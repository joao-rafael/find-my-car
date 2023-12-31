import { Component, Input, SimpleChanges } from '@angular/core';
import { TABLE_COLUMNS } from 'src/app/modules/shared/constants/table.constants';
import { VehiclePositionData, VehicleTimeInPOIData } from '../../../shared/interfaces/vehicle-position.interface';
import { DatePipe } from '@angular/common';

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
  @Input() dataList: VehicleTimeInPOIData[] = [];

  /**
   * Displayed table columns
   * @type {string}
   */
  displayedColumns: string[] = TABLE_COLUMNS;

  /**
   * Date pipe instance
   * @type {DatePipe}
   */
  datePipe: DatePipe = new DatePipe('en-US');

  /**
   * Gets cell data 
   * @param element array element
   * @param column  element table column
   * @returns table cell content
   */
  getElementData(element: VehicleTimeInPOIData, column: string): string | number | null {
    switch (column) {
      case 'license':
        return element.license;
      case 'entryTime':
        return this.datePipe.transform(element.entryTime, 'medium');
      case 'exitTime':
        return element.exitTime ? this.datePipe.transform(element.exitTime, 'medium') : 'Not Available';
      case 'timeSpent':
        return element.timeSpent ? this.convertSecondsToHours(element.timeSpent) : 'N/A';
      case 'poiName':
        return element.poiName;
      default:
        return '';
    }
  }

  /**
   * Converts the spent time (which is given in seconds) to hours
   * @param seconds spent time
   * @returns a string containing the final ammount of time
   */
  convertSecondsToHours(seconds: number): string {
    const hours = Math.floor(seconds / 3600); 
    const remainingSeconds = seconds % 3600; 
    const minutes = Math.floor(remainingSeconds / 60); 

    return `${hours}h ${minutes}m`;
  }
}
