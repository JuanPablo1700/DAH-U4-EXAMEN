import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewReservacionPageRoutingModule } from './new-reservacion-routing.module';

import { NewReservacionPage } from './new-reservacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewReservacionPageRoutingModule
  ],
  declarations: [NewReservacionPage]
})
export class NewReservacionPageModule {}
