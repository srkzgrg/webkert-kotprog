import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.scss']
})
export class BejelentkezesComponent {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    hide = true;

    constructor(private router: Router,  private authService: AuthService, private _snackBar: MatSnackBar) { }
    login() {
      if(this.email.hasError('required') || this.password.hasError('required')){
        this._snackBar.open("A mező értéke nem lehet üres", "OK");
      }else if(this.email.hasError('email')){
        this._snackBar.open("Nem megfelelő e-mail formátum", "OK");
      }else{
        this.authService.login(this.email.value!, this.password.value!).then(cred => {
  
          this.router.navigateByUrl('/main');
        }).catch(error => {
          this._snackBar.open("Nincs ilyen fiók", "OK");
        });
      }
    }

}
