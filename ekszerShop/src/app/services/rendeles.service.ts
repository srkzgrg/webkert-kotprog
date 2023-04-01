import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Rendeles } from '../models/Rendeles';

@Injectable({
  providedIn: 'root'
})
export class RendelesService {

  collectionName = 'Rendelesek';

  constructor(private afs: AngularFirestore) { }

  create(rendeles: Rendeles) {
    rendeles.id = this.afs.createId();
    return this.afs.collection<Rendeles>(this.collectionName).doc(rendeles.id).set(rendeles);
  }

  getByUserId(id: string) {
    return this.afs.collection<Rendeles>(this.collectionName, ref => ref.where('user_id','==',id).orderBy('datum', 'desc')).valueChanges();
  }

}
