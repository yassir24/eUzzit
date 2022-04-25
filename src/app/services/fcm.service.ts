import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  token;

  constructor(private router: Router,
    private toastController: ToastController, 
    private fun: AngularFireFunctions) { }

  
    initPush() {
      this.registerPush();
    }
 
  private registerPush() {
   // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
 
    PushNotifications.addListener('registration', (token: Token) => {
      this.token = token.value
    });
 
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });
 
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      },
    );

   
 
    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   async (notification: ActionPerformed) => {
    //     const data = notification.notification.data;
    //     console.log('Action performed: ' + JSON.stringify(notification.notification));
    //     if (data.detailsId) {
    //       this.router.navigateByUrl(`/home/${data.detailsId}`);
    //     }
    //   }
    // );
  }

  async makeToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top'
    });
    toast.present();
  }


  sub(topic) {
    this.fun
      .httpsCallable('subscribeToFeed')({ topic, token: this.token })
      .pipe(tap(_ => console.log('Subscribed to feed')))
      .subscribe();
  }

  unsub(topic) {
    this.fun
      .httpsCallable('unsubscribeFromFeed')({ topic, token: this.token })
      .pipe(tap(_ => console.log('Unsubscribed from feed')))
      .subscribe();
  }
  
}
