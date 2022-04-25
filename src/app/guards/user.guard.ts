import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {


  constructor( public auth: AuthenticationService, public router: Router) { }


  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      let nextroute: any = await this.auth.authState();
      console.log(this.auth.isLoggedIn);
      if (this.auth.isLoggedIn) {

        console.log('you\'re free to pass')
        // redirect to some view explaining what happened
      return true
         
      } else {
        return this.router.navigateByUrl('/login');
     }
  }
}
