import { ClienteService } from './../services/cliente.service';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public myForm: FormGroup;
  public validationMessage: Object;
  public clientes: Cliente[];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe( res => {
      this.clientes = res;
      console.log(this.clientes);
      
    });

    this.myForm = this.formBuilder.group({
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$')
        ])
      ]
    })

    this.validationMessage = {
      phone: [
        {
          type: 'required',
          message: 'Número de telefono obligatorio'
        },
        {
          type: 'minlength',
          message: 'El numero de telefono debe ser de 10 dígitos'
        },
        {
          type: 'maxlength',
          message: 'El numero de telefono debe ser de 10 dígitos'
        },
        {
          type: 'pattern',
          message: 'El numero de telefono esta mal formado'
        }
      ]
    }
  }

  async login(){
    if(this.myForm.get('phone').value === "1111111111"){
      this.router.navigate(
        ['/admin-page']
      );
      this.myForm.reset();
    }

    if(this.myForm.valid) {
      if (this.clienteValido()) {
        this.router.navigate(['/new-reservacion'], {
          queryParams: {
            phoneNumber: this.myForm.get('phone').value
          }
        })
        this.myForm.reset()
      } else {
        let toast = await this.toastController.create({
          message: 'Credenciales no válidas',
          duration: 2000
        });
        toast.present();
      }
    }
  }

  public clienteValido(): boolean {
    let valido = false;
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].telefono.toString() === this.myForm.get('phone').value) {
        valido = true;
      }
    }
    return valido;
  }

}
