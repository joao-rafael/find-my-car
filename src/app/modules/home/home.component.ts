import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from './../shared/constants/routes.constants';
import { RouteObject } from '../shared/interfaces/routes.interface';

/**
 * @description
 * Home page component (mostly UI, no implemented logic aside from navigating to other components)
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /**
   * Routes property for usage in template
   * @type {RouteObject}
   */
  routes: RouteObject = ROUTES;

  constructor(private router: Router) {}

  /**
   * Navigates to other page
   * @returns {void}
   */
  navigate(route: string): void {
    this.router.navigateByUrl(route);
  }
}
