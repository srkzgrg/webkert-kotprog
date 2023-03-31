import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { KosarService } from '../../services/kosar.service';
import { Kosar } from 'src/app/models/Kosar';
import { Subscription, take } from 'rxjs';

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

  constructor(private productService: ProductService, private authService: AuthService, private kosarService: KosarService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: Array<Product>) => {
      this.termekek = data;
    });

    this.loggedInUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  }

  addKosar(product: Product){
      let productid = product.id;
      let userid = this.loggedInUser?.uid;
      let productnev = product.nev;
      let productar = product.ar;
      this.kosarService.getByUserAndProductId(userid!, productid).pipe(take(1)).subscribe(kosar => {
        this.ks = kosar
        if(typeof this.ks![0] === "undefined"){
          let ksUj: Kosar = {
            id: "",
            user_id: userid!,
            ekszer_id: productid,
            mennyiseg: 1,
            nev: productnev,
            ar: productar
          }
          this.kosarService.create(ksUj); //INSERT
        }else{
          console.log("van már ilyen")
          let ksUpdate: Kosar = {
            id: this.ks![0].id,
            user_id: this.ks![0].user_id,
            ekszer_id: this.ks![0].ekszer_id,
            mennyiseg: this.ks![0].mennyiseg,
            nev: this.ks![0].nev,
            ar: this.ks![0].ar
          };
          ksUpdate.mennyiseg++;
          ksUpdate.ar*=ksUpdate.mennyiseg;
          this.kosarService.update(ksUpdate); //UPDATE
        }
      }); 

      
    }

    OnDestroy(){
      this.subscription?.unsubscribe;
    }
}
