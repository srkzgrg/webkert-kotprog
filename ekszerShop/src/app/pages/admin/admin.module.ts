import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { AdminRoutingModule } from './admin-routing.module';
import { TermekekComponent } from './termekek/termekek.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from './termekek/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";
import { ProductAddDialogComponent } from './termekek/product-add-dialog/product-add-dialog.component';
import { RendelesekComponent } from './rendelesek/rendelesek.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    TermekekComponent,
    DialogComponent,
    ProductAddDialogComponent,
    RendelesekComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule, 
    ReactiveFormsModule,
    MatDividerModule,
    MatExpansionModule
  ]
})
export class AdminModule { }
