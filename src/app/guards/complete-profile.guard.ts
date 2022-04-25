import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class CompleteProfileGuard implements CanActivate {
  constructor(private router: Router, public storage: Storage) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.storage.get('rstate').then((val) => {
        if(val == 2)
        return true;
        else if(val == 3)
        this.router.navigateByUrl('/dashboard');
        else
        this.router.navigateByUrl('/validate-phone');
         return false;        
      }, (error) => {
        console.error(error);
        this.router.navigateByUrl('/login');
        return false;
      }); 
  }
}

/*
  airtime
  buyairtime
  cable
  electricity
  internet
  


*/