import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collectionName = 'Products';

  constructor(private afs: AngularFirestore,  private storage: AngularFireStorage) { }

  create(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
  }

  getAll(): Observable<Array<Product>> {
    return this.afs.collection<Product>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();

  }

  uploadImage(image: File, filename: string){
    let metadata = { contentType: 'image/jpeg', }
    const filePath = `images/products/${filename}`;
    const fileRef = this.storage.ref(filePath);
    return this.storage.upload(filePath, image, metadata);
  }

  getById(id: string) {
    return this.afs.collection<Product>(this.collectionName).doc(id).valueChanges();
  }

  update(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
  }

  delete(id: string) {
    return this.afs.collection<Product>(this.collectionName).doc(id).delete();
  }
}


