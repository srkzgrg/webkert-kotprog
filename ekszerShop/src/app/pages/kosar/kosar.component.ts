import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { KosarService } from '../../services/kosar.service';
import { AuthService } from '../../services/auth.service';
import { Kosar } from 'src/app/models/Kosar';
import { ProductService } from 'src/app/services/product.service';
import { RendelesService } from 'src/app/services/rendeles.service';
import { Subscription, take } from 'rxjs';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Rendeles } from 'src/app/models/Rendeles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kosar',
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class KosarComponent implements OnInit {
  kosar?: Array<Kosar>;
  loggedInUser?: firebase.default.User | null;
  ErrorMessage_hianyzik?: string;
  hiba?: boolean;
  @Input() elfogadva: any;
  ures?: boolean;
  vegosszeg?: number;

  displayedColumns: string[] = ['nev', 'mennyiseg', 'ar', 'modositas'];

  firstFormGroup = this._formBuilder.group({});

  secondFormGroup = this._formBuilder.group({
    cim: ['', Validators.required],
    telefonszam: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private kosarService: KosarService,
    private rendelesService: RendelesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vegosszeg = 0;
    this.ures = false;
    this.hiba = false;
    this.elfogadva = false;
    this.loggedInUser = JSON.parse(
      localStorage.getItem('user') as string
    ) as firebase.default.User;

    this.kosarService
      .getByUserId(this.loggedInUser.uid)
      .subscribe((data: Array<Kosar>) => {
        this.kosar = data;
        this.vegosszeg = 0;
        if (this.kosar?.length == 0) {
          this.ures = true;
        }else{
          this.kosar?.forEach(item =>{
            this.vegosszeg! += item.ar;
          })
        }
      });

      
  }

  leadas() {
    let userid = this.loggedInUser?.uid;
    if (
      this.secondFormGroup.get('cim')?.value == '' ||
      this.secondFormGroup.get('telefonszam')?.value == ''
    ) {
      this.ErrorMessage_hianyzik = 'Hiányzó adatok a szállítás fülön';
      this.hiba = true;
    } else if (this.elfogadva === false) {
      this.ErrorMessage_hianyzik = 'ÁSZF elfogadása kötelező';
      this.hiba = true;
    } else {
      let vegosszeg = 0;
      this.kosar!.forEach((element) => {
        vegosszeg += element.ar;
      });

      let rendeles: Rendeles = {
        id: '',
        user_id: userid!,
        termekek: this.kosar!,
        datum: new Date().getTime(),
        cim: this.secondFormGroup.get('cim')?.value!,
        telefon: this.secondFormGroup.get('cim')?.value!,
        osszar: vegosszeg,
        statusz: "Feldolgozás alatt"
      };
      this.rendelesService.create(rendeles);

      //Kosár törlése
      this.kosar!.forEach((element) => {
        this.kosarService.delete(element.id);
      });

      this.router.navigateByUrl('/main');
    }
  }

  plus(id: string) {
    this.kosar?.forEach((element) => {
      if (element.id == id) {
        let mennyiseg = element.mennyiseg + 1;
        let ar: number = element.ar as number;
        ar += element.termek.ar;
        this.kosarService.updateMennyiseg(id, mennyiseg, ar); //UPDATE
      }
    });
  }

  minus(id: string) {
    this.kosar?.forEach((element) => {
      if (element.id == id) {
        let mennyiseg = element.mennyiseg - 1;
        let ar= element.ar;
        if(mennyiseg == 0){
          this.kosarService.delete(element.id);
        }else{
          ar -= element.termek.ar;
          this.kosarService.updateMennyiseg(id, mennyiseg, ar);
        }
      }
    });
  }
}
