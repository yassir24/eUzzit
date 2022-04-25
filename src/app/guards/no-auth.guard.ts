import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  userstate:any;

  constructor( public auth: AuthenticationService, public router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ){
    let nextroute: any = await this.auth.authState();
    //console.log(this.auth.isLoggedIn);
    if (!this.auth.isLoggedIn) {
      // redirect to some view explaining what happened
      return true;
     
    } else {
      console.log(nextroute);
      return this.router.parseUrl(nextroute);
   }
  }

  // : Observable<boolean> | Promise<boolean> | boolean 

}
