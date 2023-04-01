import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { KosarService } from '../../services/kosar.service';
import { Kosar } from 'src/app/models/Kosar';
import { Subscription, take } from 'rxjs';
import { MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-termekek',
  templateUrl: './termekek.component.html',
  styleUrls: ['./termekek.component.scss'],
})
export class TermekekComponent {

  loggedInUser?: firebase.default.User | null;
  
  termekek?: Array<Product>;
  loadedImage?: string;
  image_url?: string;
  ks?: Array<Kosar>;
  subscription?: Subscription;
  durationInSeconds=3;

  constructor(
    private productService: ProductService, 
    private kosarService: KosarService, 
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: Array<Product>) => {
      this.termekek = data;
    });

    this.loggedInUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  }

  addKosar(product: Product){
      let productid = product.id;
      let userid = this.loggedInUser?.uid;
      let productar = product.ar;
      this.kosarService.getByUserAndProductId(userid!, productid).pipe(take(1)).subscribe(kosar => {
        this.ks = kosar
        if(typeof this.ks![0] === "undefined"){
          let ksUj: Kosar = {
            id: "",
            user_id: userid!,
            termek: product,
            mennyiseg: 1,
            ar: productar as number
          }
          this.kosarService.create(ksUj); //INSERT
        }else{
          console.log("van már ilyen")
          let ksUpdate: Kosar = {
            id: this.ks![0].id,
            termek: product,
            user_id: this.ks![0].user_id,
            mennyiseg: this.ks![0].mennyiseg,
            ar: this.ks![0].ar
          };
          ksUpdate.mennyiseg++;
          ksUpdate.ar =ksUpdate.termek.ar as number * ksUpdate.mennyiseg as number;
          this.kosarService.update(ksUpdate); //UPDATE
        }
      }); 
        this._snackBar.open("Hozzáadva a kosárhoz", "OK", {duration: this.durationInSeconds * 1000});
    }

    OnDestroy(){
      this.subscription?.unsubscribe;
    }
}
