import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  password = new FormControl('', [Validators.required]);
  nev = new FormControl('', [Validators.required]);
  nem = new FormControl('', [Validators.required]);
  hide: boolean | undefined; //Jelszó megjelenítő
  foglalt: boolean | undefined //E-mail foglalt-e
  ErrorMessage_foglalt = "Ez az e-mail cím már foglalt";

  constructor(private router: Router,  private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.foglalt=false;
    this.hide = true; //E-mail foglalt-e
  }

  register() {
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
      this.foglalt=true;
    });
  }

  getErrorMessage_email() {
    if (this.email.hasError('required')) {
      return '';
    }

    return this.email.hasError('email') ? 'Az e-mail cím nem helyes' : '';
  }

}
