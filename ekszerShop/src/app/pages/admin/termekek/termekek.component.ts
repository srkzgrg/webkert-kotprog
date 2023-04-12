import { Component, Input, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { take } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { DialogComponent } from './dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-termekek',
  templateUrl: './termekek.component.html',
  styleUrls: ['./termekek.component.scss']
})

export class TermekekComponent implements OnInit{

  product?: Product;
  loggedInUser?: firebase.default.User | null;
  termekek?: Array<Product>;
  displayedColumns: string[] = ['nev', 'ar', 'modositas'];

  constructor(private productService: ProductService, public dialog: MatDialog){}
  
  ngOnInit(): void {
    this.productService.getAll().pipe(take(1)).subscribe((data: Array<Product>) => {
      this.termekek = data;
    });
    this.loggedInUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
}

  refresh(){
    this.productService.getAll().pipe(take(1)).subscribe((data: Array<Product>) => {
      this.termekek = data;
    });
  }

  
  remove(id: string){
      this.productService.delete(id);
      this.refresh();
  }

  update(id: string){
    this.productService.getById(id).pipe(take(1)).subscribe(data => {
      this.product = data
      this.openDialog()
    })
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '650px',
      data: this.product,
    });
 }

}