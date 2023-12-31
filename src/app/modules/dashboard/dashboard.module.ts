import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapInfoWindow, GoogleMap } from '@angular/google-maps';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderPipe } from './components/table/pipes/header.pipe';
import { FormComponent } from './components/form/form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    TableComponent,
    FormComponent,
    MapComponent,
    HeaderPipe
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatRippleModule
  ],
  providers:[
    MapInfoWindow,
    GoogleMap
  ]
})
export class DashboardModule { }
