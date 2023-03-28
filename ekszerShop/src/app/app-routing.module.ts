import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BejelentkezesComponent } from './pages/bejelentkezes/bejelentkezes.component';
import { MainComponent } from './pages/main/main.component';
import { TermekekComponent } from './pages/termekek/termekek.component';

const routes: Routes = [
  
  {path: '', component: MainComponent},
  {path: 'termekek', component: TermekekComponent},
  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: '**', component: MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
