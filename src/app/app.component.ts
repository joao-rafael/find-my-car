import { Component } from '@angular/core';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'find-my-car';

  constructor(private mapService: MapService) {
    this.mapService.loadGoogleMapsAPI();
  }
}
