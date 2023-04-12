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
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatListModule } from "@angular/material/list";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TermekekComponent,
    DialogComponent
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
    ReactiveFormsModule
  ]
})
export class AdminModule { }
