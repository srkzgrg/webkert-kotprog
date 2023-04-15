import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Rendeles } from 'src/app/models/Rendeles';
import { RendelesService } from 'src/app/services/rendeles.service';

@Component({
  selector: 'app-rendelesek',
  templateUrl: './rendelesek.component.html',
  styleUrls: ['./rendelesek.component.scss']
})
export class RendelesekComponent implements OnInit {
  loggedInUser?: firebase.default.User | null;
  rendelesekFeldolg?: Array<Rendeles>;
  rendelesekDelivey?: Array<Rendeles>;
  rendelesekDone?: Array<Rendeles>;
  constructor(private rendelesService: RendelesService){}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

    const userid = this.loggedInUser?.uid;

    this.rendelesService.getByOrderStatus("Feldolgozás alatt").pipe(take(1)).subscribe(data => {
      this.rendelesekFeldolg = data;
    });
    this.rendelesService.getByOrderStatus("Kiszállítás alatt").pipe(take(1)).subscribe(data => {
      this.rendelesekDelivey = data;
    });
    this.rendelesService.getByOrderStatus("Kiszállítva").pipe(take(1)).subscribe(data => {
      this.rendelesekDone = data;
    });
  }

  statuschange(id: string, status: string): void{
      this.rendelesService.updateStatus(id, status).then(() => location.reload());
  }
}
