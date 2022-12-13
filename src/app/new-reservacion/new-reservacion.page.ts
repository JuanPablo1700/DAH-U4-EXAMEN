import { ClienteService } from './../services/cliente.service';
import { Cliente } from './../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { ReservacionService } from '../services/reservacion.service';
import { FormGroup,FormBuilder,Validators, RequiredValidator } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-reservacion',
  templateUrl: './new-reservacion.page.html',
  styleUrls: ['./new-reservacion.page.scss'],
})
export class NewReservacionPage implements OnInit {

  public valMessage: Object;
  public resForm: FormGroup;

  public valorAlberca: number;
  public valorBrincolin: number;
  public valorMesa: number;
  public valorFutbolito: number;

  public total: number;

  public clientes: Cliente[];
  public cliente: Cliente;

  public reservaciones: Reservacion[];
  public reservacion: Reservacion;


  constructor(
    private reserService: ReservacionService, 
    private fb: FormBuilder,
    private tC: ToastController,
    private router: Router,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {

    this.valorAlberca = 0;
    this.valorBrincolin = 0;
    this.valorMesa = 0;
    this.valorFutbolito = 0;

    this.total = 1000;

    this.reservacion={
      nombre:"",
      fecha: "",
      telefono:"",
      monto: 0
    }
  }

  ngOnInit() {

    this.reserService.getReservaciones().subscribe( res => {
      this.reservaciones = res;
    })

    this.clienteService.getClientes().subscribe( res => {
      this.clientes = res;
      this.activatedRoute.queryParams.subscribe( (params) => {
        for(var i = 0; i < this.clientes.length; i++){
          
          if(this.clientes[i].telefono == params['phoneNumber']){
            this.cliente = this.clientes[i];
          }
        }
      })
    });

    this.resForm =  this.fb.group({
      fechaF:['',Validators.compose([
        Validators.required
      ])]
    });

    this.valMessage = {
      fechaF: [
        {
          type: 'required',
          message: 'Fecha obligatoria'
        }
      ]
    }
    
  }

  public onChange(event){
    if(event.target.value === 100){
      this.valorAlberca = 500;
    }else{
      if(event.target.value === 80){
        this.valorAlberca = 400;
      }else{
        if(event.target.value === 60){
          this.valorAlberca = 300;
        }else{
          if(event.target.value === 40){
            this.valorAlberca = 200;
          }else{
            if(event.target.value === 20){
              this.valorAlberca = 100;
            }else{
              this.valorAlberca = 0;
            }
          }
        }
      }
    }
    this.calcular();
  }

  public brincolin(event){
    if (event.detail.checked === true) {
      this.valorBrincolin = 200;
    } else {
      this.valorBrincolin = 0;
    }
    this.calcular();
  }

  public mesa(event){
    if (event.detail.checked === true) {
      this.valorMesa = 150;
    } else {
      this.valorMesa = 0;
    }
    this.calcular();
  }

  public futbolito(event){
    if (event.detail.checked === true) {
      this.valorFutbolito = 100;
    } else {
      this.valorFutbolito = 0;
    }
    this.calcular();
  }

  public calcular(){
    this.total = 1000 + this.valorBrincolin + this.valorMesa + this.valorFutbolito + this.valorAlberca;
  }

  public async addReservacion() {
    if (this.resForm.valid) {
      let fechaF = this.newDate(this.resForm.get('fechaF').value)
      let hoy = new Date();
      
      if (fechaF <= hoy) {
        let toast = await this.tC.create({
          message: 'La fecha debe ser de mañana en adelante.',
          duration: 2000
        });
        toast.present();
      } else {
        let fechaInvalida = false;
        
        for (let i = 0; i < this.reservaciones.length; i++) {
          let fecha = this.newDate(this.reservaciones[i].fecha);
          if (this.comparaFechas(fecha,fechaF)) {
            fechaInvalida = true;
          }
        }
        if (fechaInvalida) {
          let toast = await this.tC.create({
            message: 'Ya existe una reservacion para dicha fecha.',
            duration: 2000
          });
          toast.present();
        } else {
          let reservacion: Reservacion = {
            fecha: this.resForm.get('fechaF').value,
            nombre: this.cliente.nombre,
            telefono: this.cliente.telefono,
            monto: this.total
          }
          this.reserService.addReservacion(reservacion);
          let toast = await this.tC.create({
            message: 'Reservación creada',
            duration: 2000
          });
          toast.present();
          this.salir();
        }
      }
    }
  }

  public newDate(d: string): Date {
    return new Date(d);
  }

  public salir(){
    this.router.navigate(['..']);
  }

  public formatDate(fecha) {
    let fechas = fecha.split('T');
    return fechas[0];
  }

  public comparaFechas(fechaRes: Date,fechaForm: Date): boolean {
    let FechaRes = this.formatDate(fechaRes.toISOString());
    let FechaForm = this.formatDate(fechaForm.toISOString());
    if (FechaRes === FechaForm) {
      return true;
    } else { 
      return false;
    }
  }
}
