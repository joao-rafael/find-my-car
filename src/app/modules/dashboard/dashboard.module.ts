import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { DataTableComponent } from './data-table/data-table.component';
import { DataMapComponent } from './data-map/data-map.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DataTableComponent,
    DataMapComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTableModule
  ]
})
export class DashboardModule { }
