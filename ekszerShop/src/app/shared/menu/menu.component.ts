import { Component, OnInit} from '@angular/core';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    loggedInUser?: firebase.default.User | null;
    constructor(private authService: AuthService, private userServie: UserService){}
    
  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
      if(user == null){
        localStorage.setItem('admin', JSON.stringify(null));
      }else{
        this.userServie.getById(user!.uid).pipe(take(1)).subscribe(data=>{
          localStorage.setItem('admin', data!.admin);
        });
      }
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      
    }, error => {
      console.error(error);
      localStorage.setItem('admin', JSON.stringify('null'));
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }
   

    logout(_?: boolean) {
      this.authService.logout().then(() => {
        console.log('Logged out successfully.');
        localStorage.setItem('user', JSON.stringify('null'));
        localStorage.setItem('admin', JSON.stringify('null'));
      }).catch(error => {
        console.error(error);
      });
    }
}
