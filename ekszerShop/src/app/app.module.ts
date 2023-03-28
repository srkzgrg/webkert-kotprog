import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MainComponent } from './pages/main/main.component';
import { TermekekComponent } from './pages/termekek/termekek.component';
import { BejelentkezesComponent } from './pages/bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './pages/regisztracio/regisztracio.component';
import { KosarComponent } from './pages/kosar/kosar.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    TermekekComponent,
    BejelentkezesComponent,
    RegisztracioComponent,
    KosarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSidenavModule,
    FormsModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
