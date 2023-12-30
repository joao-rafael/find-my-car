import { Component, Input } from '@angular/core';
import { TABLE_COLUMNS } from 'src/app/modules/shared/constants/table.constants';
import { VehicleTimeInPOI } from '../../../shared/interfaces/vehicle-position.interface';

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
  @Input() dataList: VehicleTimeInPOI[] = [];

  /**
   * Displayed table columns
   * @type {string}
   */
  displayedColumns: string[] = TABLE_COLUMNS;

  
  getElementData(element: VehicleTimeInPOI, column: string): any {
    switch (column) {
      case 'license':
        return element.license;
      case 'date_position':
        return element.date_position;
      case 'timeSpent':
        return element.timeSpent;
      default:
        return '';
    }
  }
}
