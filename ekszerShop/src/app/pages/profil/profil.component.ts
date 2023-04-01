import { Component, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take, VirtualTimeScheduler } from 'rxjs';
import { Rendeles } from '../../models/Rendeles';
import { RendelesService } from '../../services/rendeles.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  loggedInUser?: firebase.default.User | null;
  rendelesek?: Array<Rendeles>;
  
  constructor(private rendelesService: RendelesService){}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

    const userid = this.loggedInUser?.uid;

    this.rendelesService.getByUserId(userid).pipe(take(1)).subscribe(data => {
      this.rendelesek = data;
    });
  }

}
