import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.scss']
})
export class ProductAddDialogComponent{
  
  ar: FormControl = new FormControl('', [Validators.required]);
  nev: FormControl = new FormControl('', [Validators.required]);
  tipus: FormControl = new FormControl('', [Validators.required]);
  display: FormControl = new FormControl('', [Validators.required]);
  upload?: File;
  product?: Product;

  constructor(private dialogRef: MatDialogRef<ProductAddDialogComponent>, 
    private productService: ProductService,
    private _snackBar: MatSnackBar, 
    private router: Router){}

  save(){
    if(this.ar.hasError('required') || this.tipus.hasError('required') || this.tipus.hasError('required') || this.display.hasError('required')){
      this._snackBar.open("Az összes mező kitöltése kötelező!", "OK");
    }else{
      this.close()
      const filename = this.upload?.name
      this.product = {
        ar: this.ar!.value,
        id: "",
        tipus: this.tipus!.value,
        image_url: "images/products/" + filename,
        download_url: "",
        nev: this.nev!.value
      }
      this.productService.create(this.product);
      this.productService.uploadImage(this.upload!, filename!).then((snapshot) => {
        location.reload();
      });
      
    }
  }

  close(){
    this.dialogRef.close();
  }

  handleFileInputChange($event: any): void {
    this.upload = $event.target.files[0];
    if (typeof this.upload !== "undefined") {
      this.display.patchValue("Fájl sikeresen feltöltve");
    } else {
      this.display.patchValue("");
    }
  }
}
