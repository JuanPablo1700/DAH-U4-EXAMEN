import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReservacionPage } from './new-reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: NewReservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewReservacionPageRoutingModule {}
