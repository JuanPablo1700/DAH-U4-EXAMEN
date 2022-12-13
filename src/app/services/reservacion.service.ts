import { Injectable } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  constructor(private firestore: AngularFirestore) { 

  }

  public getReservaciones(): Observable<Reservacion[]>{
    return this.firestore.collection('reservacion')
      .snapshotChanges()
      .pipe(
        map(actions=> {
          return actions.map(a=>{
            const data = a.payload.doc.data() as Reservacion;
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );
  }

  public getProximasReservaciones(): Observable<Reservacion[]>{
    let hoy = new Date();
    let reservacionesOrdenadas = this.firestore.collection('reservacion', ref => ref.where('fecha','>=', hoy.toISOString()).orderBy('fecha','asc').limit(2));
    return reservacionesOrdenadas.snapshotChanges().pipe(
      map( actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data() as Reservacion;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  public addReservacion(reservacion: Reservacion){
    this.firestore.collection('reservacion').add(reservacion);
  }

}
