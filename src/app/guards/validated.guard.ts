import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatedGuard implements CanActivate {

  userstageObj: Promise<boolean>;
  userState: any;
  phoneForm: FormGroup;
  
  constructor(private router: Router, public storage: Storage, public auth: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.storage.get('rstate').then((val) => {
        if( val == 0)
        this.router.navigateByUrl('/login');

        if( val == 2 )
        this.router.navigateByUrl('/complete-profile');

        if(val == 3)
        this.router.navigateByUrl('/dashboard');

        if(val == 4)
        this.router.navigateByUrl('/dashboard/dashboard/merchant');



        return (val > 0) ? true : false;      
      }, (error) => {
        this.router.navigateByUrl('/login');
        return false;
      });

  }


  
}
