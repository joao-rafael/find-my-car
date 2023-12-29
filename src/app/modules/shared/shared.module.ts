import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { Mobi7Service } from '../../services/mobi7.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    SnackbarComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
