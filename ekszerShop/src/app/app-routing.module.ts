import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BejelentkezesComponent } from './pages/bejelentkezes/bejelentkezes.component';
import { MainComponent } from './pages/main/main.component';
import { RegisztracioComponent } from './pages/regisztracio/regisztracio.component';
import { TermekekComponent } from './pages/termekek/termekek.component';

const routes: Routes = [
  
  {path: '', component: MainComponent},
  {path: 'termekek', component: TermekekComponent},
  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: 'regisztracio', component: RegisztracioComponent},
  {path: '**', component: MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
