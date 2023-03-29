import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.scss']
})
export class RegisztracioComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('');
  nev = new FormControl('', [Validators.required, Validators.email]);
  nem = new FormControl('');
  hide = true;
  foglalt=true;

  constructor(private router: Router) { }
  login() {
    if (this.email.value === 'test@gmail.com' && this.password.value === 'testpw') {
      //this.router.navigateByUrl('/main');
      console.log("Sikeres bejelentkezés")
    } else {
      console.error('Hibás jelszó vagy email');
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessage_foglalt() {
    if (this.email.hasError('required')) {
      return 'Ez az email cím már foglalt!';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
