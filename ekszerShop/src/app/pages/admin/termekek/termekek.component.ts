import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { take } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-termekek',
  templateUrl: './termekek.component.html',
  styleUrls: ['./termekek.component.scss']
})

export class TermekekComponent implements OnInit{
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
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(Dialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

 }

 @Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
})
export class Dialog {}
