import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './modules/shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { DataMapService } from './services/data-map.service';
import { Mobi7Service } from './services/mobi7.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
    DashboardModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  providers: [ GoogleMapsModule, DataMapService, Mobi7Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
