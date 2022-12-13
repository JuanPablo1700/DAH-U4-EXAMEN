import { Router } from '@angular/router';
import { ReservacionService } from './../services/reservacion.service';
import { Reservacion } from './../models/reservacion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {

  public reservaciones: Reservacion[];

  constructor(
    private reservacionService: ReservacionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reservacionService.getReservaciones().subscribe(res => {
      this.reservaciones = res;
    })
  }

  public formatDate(fecha) {
    let fechas = fecha.split('T');
    return fechas[0];
  }

  public salir(){
    this.router.navigate(['..']);
  }

  public prox(event){
    if (event.detail.checked === true) {
      this.reservacionService.getProximasReservaciones().subscribe( res => {
        this.reservaciones = res;
        console.log(this.reservaciones);
        
      });
    } else {
      this.reservacionService.getReservaciones().subscribe(res => {
        this.reservaciones = res;
      })
    }
  }

  public refresh(){
    
  }

}
