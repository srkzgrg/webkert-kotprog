import { Component, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { KosarService } from '../../services/kosar.service';
import { AuthService } from '../../services/auth.service';
import { Kosar } from 'src/app/models/Kosar';
import { ProductService } from 'src/app/services/product.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-kosar',
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.scss'],
})
export class KosarComponent implements OnInit{
    kosar?: Array<Kosar>;
    termek?: Product;
    loggedInUser?: firebase.default.User | null;
    ar?: Number;
    sub?: Subscription;

    displayedColumns: string[] = ['nev', 'mennyiseg', 'ar'];
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private kosarService: KosarService, private authService: AuthService, private productService: ProductService) {}

  ngOnInit(): void{
    this.ar = 0;
    this.loggedInUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

    this.kosarService.getByUserId(this.loggedInUser.uid).subscribe((data: Array<Kosar>) => {
      this.kosar = data;
    });

    
  }
  

  getProduct(id: string){
    this.sub = this.productService.getById(id).pipe(take(1)).subscribe(data => {
      this.termek = data;
    });

  }

  ngAfterViewChecked(){
      this.sub?.unsubscribe;
  }
  

}
