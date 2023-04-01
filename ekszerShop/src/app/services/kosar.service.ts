import { Injectable } from '@angular/core';
import { Kosar } from '../models/Kosar';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class KosarService {

  collectionName = 'Kosarak';

  constructor(private afs: AngularFirestore) { }

  create(kosar: Kosar) {
    kosar.id = this.afs.createId();
    return this.afs.collection<Kosar>(this.collectionName).doc(kosar.id).set(kosar);
  }

  getByUserId(id: string) {
    return this.afs.collection<Kosar>(this.collectionName, ref => ref.where('user_id','==',id)).valueChanges();
  }

  getByUserAndProductId(userid: string, productid: string) {
    return this.afs.collection<Kosar>(this.collectionName, ref => ref.where('user_id','==',userid).where('termek.id','==',productid)).valueChanges();
  }

  update(kosar: Kosar) {
    return this.afs.collection<Kosar>(this.collectionName).doc(kosar.id).set(kosar);
  }

  updateMennyiseg(kosarid: string, mennyiseg: number, ar: number){
    return this.afs.collection<Kosar>(this.collectionName).doc(kosarid).update({"mennyiseg": mennyiseg, "ar": ar});
  }

  delete(id: string) {
    return this.afs.collection<Kosar>(this.collectionName).doc(id).delete();
  }
}
