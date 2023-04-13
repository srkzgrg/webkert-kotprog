import { Component, Inject, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  ar?: number
  nev?: string
  tipus?: string
  display: FormControl = new FormControl("");
  upload?: File;
  product?: Product;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productServie: ProductService
  ) {}

  ngOnInit(): void{
    this.ar = this.data.ar;
    this.nev = this.data.nev;
    this.tipus = this.data.tipus;
  }
  save(): void{
    this.dialogRef.close();
    
    const path = "images/products/" + this.upload?.name;
    if(typeof this.upload === "undefined"){
      this.product = {
        id: this.data.id,
        ar: this.ar!,
        image_url: this.data.image_url,
        download_url: "",
        tipus: this.tipus!,
        nev: this.nev!,
      };
    }else{
      this.productServie.uploadImage(this.upload!, this.upload!.name).snapshotChanges().pipe().subscribe();
      this.product = {
        id: this.data.id,
        ar: this.ar!,
        image_url: path,
        download_url: "",
        tipus: this.tipus!,
        nev: this.nev!,
      };
    }
    this.productServie.update(this.product).finally(() => {location.reload();});

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
