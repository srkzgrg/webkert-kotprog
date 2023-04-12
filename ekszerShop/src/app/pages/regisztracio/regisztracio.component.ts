import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.scss']
})
export class RegisztracioComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  nev = new FormControl('', [Validators.required]);
  nem = new FormControl('', [Validators.required]);
  hide: boolean | undefined; //Jelszó megjelenítő

  constructor(private router: Router,  private authService: AuthService, private userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.hide = true;
  }

  register() {
    if(this.email.hasError('required') || this.password.hasError('required') || this.nev.hasError('required') || this.nem.hasError('required')){
      this._snackBar.open("Az összes mező kitöltése kötelező!", "OK");
    }else if(this.email.hasError('email')){
      this._snackBar.open("Nem megfelelő e-mail formátum!", "OK");
    }else if(this.password.hasError('minlength')){
      this._snackBar.open("A jelszónak legalább 6 karakter hosszúnak kell lennie!", "OK");
    }
    else{
    this.authService.signup(this.email.value!, this.password.value!).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: this.email.value as string,
        nem: this.nem.value as string,
        nev: this.nev.value as string
      };
      this.userService.create(user).then(_ => {
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      this._snackBar.open("A megadott e-mail címmel már van fiók!", "OK");
    });
  }
  }

  getErrorMessage_email() {
    if (this.email.hasError('required')) {
      return '';
    }

    return this.email.hasError('email') ? 'Az e-mail cím nem helyes' : '';
  }

}
