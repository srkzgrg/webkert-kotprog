import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.scss']
})
export class RegisztracioComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  nev = new FormControl('', [Validators.required]);
  nem = new FormControl('');

  hide = true; //Jelszó megjelenítő
  foglalt: boolean | undefined //E-mail foglalt-e

  constructor(private router: Router,  private authService: AuthService) { }

  ngOnInit(): void {
    this.foglalt=false; //E-mail foglalt-e
  }

  register() {
    this.authService.signup(this.email.value!, this.password.value!).then(cred => {
      //TODO
    }).catch(error => {
      //TODO
    });
  }

  getErrorMessage_email() {
    if (this.email.hasError('required')) {
      return '';
    }

    return this.email.hasError('email') ? 'Az e-mail cím nem helyes' : '';
  }
  getErrorMessage_foglalt() {
    if (this.email.hasError('required')) {
      return 'Ez az email cím már foglalt!';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
