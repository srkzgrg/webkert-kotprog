import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BejelentkezesComponent } from './pages/bejelentkezes/bejelentkezes.component';
import { KosarComponent } from './pages/kosar/kosar.component';
import { MainComponent } from './pages/main/main.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { RegisztracioComponent } from './pages/regisztracio/regisztracio.component';
import { TermekekComponent } from './pages/termekek/termekek.component';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  
  {path: '', component: MainComponent},
  {path: 'admin', 
  loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
  canActivate: [AdminGuard]},
  {path: 'termekek', component: TermekekComponent},
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  {path: 'kosar', component: KosarComponent, canActivate: [AuthGuard]},
  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: 'regisztracio', component: RegisztracioComponent},
  {path: '**', component: MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
