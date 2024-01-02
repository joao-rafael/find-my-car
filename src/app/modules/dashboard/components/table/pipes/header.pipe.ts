import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description
 * This pipes convert raw array strings into presentable header titles
 */
@Pipe({
  name: 'header'
})
export class HeaderPipe implements PipeTransform {
  transform(column: string): string {
    switch (column) {
      case 'license':
        return 'License';
      case 'speed':
        return 'Speed';
      case 'poiName':
        return 'POI';
      case 'entryTime':
        return 'Entry Time';
      case 'exitTime':
        return 'Exit Time';
      case 'timeSpent':
        return 'Time Spent';
      default:
        return '';
    }
  }
}