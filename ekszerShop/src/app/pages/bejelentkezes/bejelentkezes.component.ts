import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.scss']
})
export class BejelentkezesComponent {
    email = new FormControl('');
    password = new FormControl('');
    hide = true;

    constructor(private router: Router,  private authService: AuthService) { }
    login() {
       this.authService.login(this.email.value!, this.password.value!).then(cred => {
        //TODO bejelentkezes
        this.router.navigateByUrl('/main');
      }).catch(error => {
        //TODO error
      });

    }

}
