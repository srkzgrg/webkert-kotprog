import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/services/admin.guard';
import { TermekekComponent } from './termekek/termekek.component';

const routes: Routes = [
  {path: '', component: TermekekComponent, canActivate: [AdminGuard]},
  {path: 'termekek', component: TermekekComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
