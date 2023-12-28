import { Component } from '@angular/core';
import { VehicleData } from '../../shared/interfaces/vehicle.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  vehicleDataList: VehicleData[] = [
    {
      placa: 'ABC1234',
      data_posicao: new Date('2023-01-01T08:00:00'),
      velocidade: 60,
      longitude: -45.123456,
      latitude: 35.678912,
      ignicao: true,
    },
    {
      placa: 'DEF5678',
      data_posicao: new Date('2023-01-01T10:30:00'),
      velocidade: 45,
      longitude: -46.987654,
      latitude: 36.789012,
      ignicao: false,
    },
    {
      placa: 'GHI9012',
      data_posicao: new Date('2023-01-02T12:15:00'),
      velocidade: 70,
      longitude: -47.135790,
      latitude: 37.890123,
      ignicao: true,
    },
    {
      placa: 'JKL3456',
      data_posicao: new Date('2023-01-02T14:45:00'),
      velocidade: 55,
      longitude: -48.246801,
      latitude: 38.901234,
      ignicao: false,
    },
    {
      placa: 'MNO7890',
      data_posicao: new Date('2023-01-03T09:20:00'),
      velocidade: 68,
      longitude: -49.987654,
      latitude: 39.012345,
      ignicao: true,
    },
    {
      placa: 'PQR1234',
      data_posicao: new Date('2023-01-03T11:00:00'),
      velocidade: 40,
      longitude: -50.876543,
      latitude: 40.123456,
      ignicao: false,
    },
    {
      placa: 'STU5678',
      data_posicao: new Date('2023-01-04T13:10:00'),
      velocidade: 75,
      longitude: -51.234567,
      latitude: 41.234567,
      ignicao: true,
    },
    {
      placa: 'VWX9012',
      data_posicao: new Date('2023-01-04T15:30:00'),
      velocidade: 50,
      longitude: -52.345678,
      latitude: 42.345678,
      ignicao: false,
    },
    {
      placa: 'YZA3456',
      data_posicao: new Date('2023-01-05T10:45:00'),
      velocidade: 62,
      longitude: -53.456789,
      latitude: 43.456789,
      ignicao: true,
    },
    {
      placa: 'BCD7890',
      data_posicao: new Date('2023-01-05T12:20:00'),
      velocidade: 48,
      longitude: -54.567890,
      latitude: 44.567890,
      ignicao: false,
    },
  ];
  displayedColumns: string[] = ['placa', 'data_posicao', 'velocidade'];
}
