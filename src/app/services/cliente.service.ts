import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore: AngularFirestore) {

   }
   public getClientes(): Observable<Cliente[]>{
    return this.firestore.collection('cliente')
      .snapshotChanges()
      .pipe(
        map(actions=>{
          return actions.map(a=>{
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            console.log({id,...data})
            return {id,...data}}
            )
        })
      );
   }

}
