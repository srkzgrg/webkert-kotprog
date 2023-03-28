import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.scss']
})
export class BejelentkezesComponent {
    email = new FormControl('');
    password = new FormControl('');
    hide = true;

    constructor(private router: Router) { }
    login() {
      if (this.email.value === 'test@gmail.com' && this.password.value === 'testpw') {
        //this.router.navigateByUrl('/main');
        console.log("Sikeres bejelentkezés")
      } else {
        console.error('Hibás jelszó vagy email');
      }
    }

}
