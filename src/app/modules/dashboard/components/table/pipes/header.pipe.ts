import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'header'
})
export class HeaderPipe implements PipeTransform {
  transform(column: string): string {
    switch (column) {
      case 'license':
        return 'License';
      case 'date_position':
        return 'Registered Date';
      case 'speed':
        return 'Speed';
      case 'latitude':
        return 'Latitude';
      case 'longitude':
        return 'Longitude';
      case 'poiName':
        return 'Point of Interest (POI)'
      default:
        return '';
    }
  }
}