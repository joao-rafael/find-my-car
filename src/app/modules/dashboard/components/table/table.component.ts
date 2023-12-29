import { Component } from '@angular/core';
import { VehiclePositionData } from '../../../shared/interfaces/vehicle-position.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  licenseControl: FormControl = new FormControl(); 
  dateControl: FormControl = new FormControl(); 
  
  vehicleDataList: VehiclePositionData[] = [
    {
      license: 'ABC1234',
      date_position: new Date('2023-01-01T08:00:00'),
      speed: 60,
      longitude: -45.123456,
      latitude: 35.678912,
      ignited: true,
    },
    {
      license: 'DEF5678',
      date_position: new Date('2023-01-01T10:30:00'),
      speed: 45,
      longitude: -46.987654,
      latitude: 36.789012,
      ignited: false,
    },
    {
      license: 'GHI9012',
      date_position: new Date('2023-01-02T12:15:00'),
      speed: 70,
      longitude: -47.135790,
      latitude: 37.890123,
      ignited: true,
    },
    {
      license: 'JKL3456',
      date_position: new Date('2023-01-02T14:45:00'),
      speed: 55,
      longitude: -48.246801,
      latitude: 38.901234,
      ignited: false,
    },
    {
      license: 'MNO7890',
      date_position: new Date('2023-01-03T09:20:00'),
      speed: 68,
      longitude: -49.987654,
      latitude: 39.012345,
      ignited: true,
    },
    {
      license: 'PQR1234',
      date_position: new Date('2023-01-03T11:00:00'),
      speed: 40,
      longitude: -50.876543,
      latitude: 40.123456,
      ignited: false,
    },
    {
      license: 'STU5678',
      date_position: new Date('2023-01-04T13:10:00'),
      speed: 75,
      longitude: -51.234567,
      latitude: 41.234567,
      ignited: true,
    },
    {
      license: 'VWX9012',
      date_position: new Date('2023-01-04T15:30:00'),
      speed: 50,
      longitude: -52.345678,
      latitude: 42.345678,
      ignited: false,
    },
    {
      license: 'YZA3456',
      date_position: new Date('2023-01-05T10:45:00'),
      speed: 62,
      longitude: -53.456789,
      latitude: 43.456789,
      ignited: true,
    },
    {
      license: 'BCD7890',
      date_position: new Date('2023-01-05T12:20:00'),
      speed: 48,
      longitude: -54.567890,
      latitude: 44.567890,
      ignited: false,
    },
  ];
  displayedColumns: string[] = ['placa', 'data_posicao', 'velocidade'];
}
