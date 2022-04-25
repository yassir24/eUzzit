import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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

export class JwtInterceptor implements HttpInterceptor {
    token: any;
    checked: boolean = false;
    constructor(public _storage: Storage, public alert: AlertController, public toastController: AlertController, 	private router: Router) {
        _storage.get('token').then((token) => {
            this.token = token;
            this.checked = true;
        });
   }

   async presentAlert( header:any, error: string, error_2: string ) {
    const alertbox = await this.alert.create({
      header: header,
      subHeader: error_2,
      message: error,
      buttons: ['OK']
    });

    this.router.navigate(['login']);

    await alertbox.present();
  }

  async presentToast( error: string ) {
    const toast = await this.toastController.create({
      message: error,
    //   duration: 5000
    });
    toast.present();
  }


   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {

        let promise = this._storage.get('token');
        
        return from(promise).pipe(
        mergeMap(token => {
            let clonedReq = this.addToken(request, token);

            return next.handle(clonedReq).pipe(
                catchError(error => {
                    // Perhaps display an error for specific status codes here already?
                    
                    if(error.status == 401 ){
                        let msg = error.error.message;
                        this.presentAlert(error.name, msg, error.statusText);
                        // Pass the error to the caller of the function
                    }

                    if(error.status == 0) {
                        let msg = 'Check your internet Connection';
                        this.presentToast( msg );
                    }
                   
                    return throwError(error);

                })
            );
            
        }));

    }

    // Adds the token to your headers if it exists
    addToken(request: HttpRequest<any>, token: any) {
        // console.log(token)
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`
                }
            });            
            return clone;
        }
        return request;
    }


}




