import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/services/admin.guard';
import { MainComponent } from '../main/main.component';
import { RendelesekComponent } from './rendelesek/rendelesek.component';
import { TermekekComponent } from './termekek/termekek.component';

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AdminGuard]},
  {path: 'termekek', component: TermekekComponent, canActivate: [AdminGuard]},
  {path: 'rendelesek', component: RendelesekComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
