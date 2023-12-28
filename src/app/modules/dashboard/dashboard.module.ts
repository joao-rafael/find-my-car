import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { DataTableComponent } from './data-table/data-table.component';
import { DataMapComponent } from './data-map/data-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapInfoWindow, GoogleMap } from '@angular/google-maps';

@NgModule({
  declarations: [
    DashboardComponent,
    DataTableComponent,
    DataMapComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTableModule,
    GoogleMapsModule
  ],
  providers:[
    MapInfoWindow,
    GoogleMap
  ]
})
export class DashboardModule { }
