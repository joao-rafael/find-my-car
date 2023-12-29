import { Component, OnInit } from '@angular/core';
import { Mobi7Service } from '../../services/mobi7.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private Mobi7Service: Mobi7Service) {

  }

  ngOnInit() {
    this.Mobi7Service.getLicenses().subscribe((val) => console.log(val));
    this.Mobi7Service.getPois().subscribe((val) => console.log(val));
  }
}
