import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckpinService } from '../services/checkpin.service';

@Injectable({
  providedIn: 'root'
})

export class PinChildGuard implements CanActivateChild {

  constructor( public pinService: CheckpinService) {

  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {

        return this.pinService.runCheck();

  }
}
 