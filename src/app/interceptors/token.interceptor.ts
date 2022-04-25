import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { throwError } from "rxjs";
import { catchError, mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

    constructor(public _storage: Storage, private router: Router,
        public toastController: ToastController) {}
        
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');

        //const token = this._storage.get('token');
      
        if (token) {
          request = request.clone({
            setHeaders: {
              'Authorization': token
            }
          });
        }
      
        if (!request.headers.has('Content-Type')) {
          request = request.clone({
            setHeaders: {
              'content-type': 'application/json'
            }
          });
        }
      
        request = request.clone({
          headers: request.headers.set('Accept', 'application/json')
        });
      
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              console.log('event--->>>', event);
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              if (error.error.success === false) {
                this.presentToast('Login failed');
              } else {
                this.router.navigate(['login']);
              }
            }
            return throwError(error);
          }));
      }

      async presentToast(msg) {
        const toast = await this.toastController.create({
          message: msg,
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
}