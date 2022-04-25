import { Component } from "@angular/core";
import { Platform, NavController, ModalController } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { PusherServiceProvider } from "./providers/pusher-service.service";
import { Device } from "@ionic-native/device/ngx";
import { Socket } from "ngx-socket-io";
import { Storage } from "@ionic/storage";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/internal/operators/map";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { CheckpinService } from "./services/checkpin.service";
import { AuthenticationService } from "./services/authentication.service";
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";

import { Keepalive } from "@ng-idle/keepalive";
import { FcmService } from "./services/fcm.service";
import { LogoutPage } from "./pages/logout/logout.page";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: any;
  idleState = "Not started.";
  timedOut = false;
  lastPing?: Date = null;
  date = Date.now()

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private modalController: ModalController,
    private statusBar: StatusBar,
    private device: Device,
    private iab: InAppBrowser,
    private storage: Storage,
    public navController: NavController,
    private fcmService: FcmService,
    private socket: Socket,
    private androidPermissions: AndroidPermissions,
    public router: Router,
    // private screenOrientation: ScreenOrientation,
    public auth: AuthenticationService,
    // private pusher : PusherServiceProvider,
    private pinService: CheckpinService,
    private localNotifications: LocalNotifications,
    private idle: Idle,
    private keepalive: Keepalive,
    public nav: NavController
  ) {
    // // sets an idle timeout of 10 seconds.
    // idle.setIdle(600);

    // // sets a timeout period of 10 seconds. after 20 seconds of inactivity, the user will timed out.
    // idle.setTimeout(10);

    // // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => (this.idleState = "No longer idle."));

    // idle.onTimeout.subscribe(() => {
    //   this.idleState = "Timed out!";
    //   this.timedOut = true;
    // });
    // idle.onIdleStart.subscribe(() => (this.idleState = "idle state"));

    // idle.onTimeoutWarning.subscribe((countdown) => {
    //   this.idleState = "You will time out in " + countdown + " seconds!";
    //   console.log("login-out");
    //   this.router.navigateByUrl("/login");
    //   return this.auth.logout();
    // }); // sets the ping interval to 15 seconds

    // // keepalive.interval(15);

    // this.runlogout();

    this.reset();
    this.initializeApp();
    platform.ready().then(() => {
      splashScreen.hide();
      this.platform.pause.subscribe(() => {
        const date = new Date(Date.now());
        localStorage.setItem("date", date.toString());
        console.log("[INFO] App paused");
      });
    });
  }

  async runlogout() {
    console.log("login-out2");
    this.router.navigateByUrl("/login");
    return await this.auth.logout();
  }


  async confirmModal(u) {
    const modal = await this.modalController.create({
      component: LogoutPage,
      componentProps: { 
        // bankname: this.bank, bankaccountnumber: this.accountnumber, amount: this.amount, narration: this.narration
      },
      cssClass: 'bottom-model',
    
    });
    return await modal.present();
  }

  reset() {
    this.idle.watch();
    this.idleState = "Started.";
    this.timedOut = false;
  }

  async setUpListener() {
    this.user = await this.storage.get("user");

    console.log('user onject from app component', this.user)
    this.socket.fromEvent("notify" + this.user.id).subscribe((data) => {
      console.log(data + "");
      if (JSON.parse(data + "").user_id === this.user.id) {
        this.localNotifications.schedule({
          id: this.user.id,
          text: JSON.parse(data + "").message,
          title: "Transfer Received!",
          foreground: false,
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fcmService.initPush();
   
      this.statusBar.overlaysWebView(false);
      this.setUpListener();

      // tslint:disable-next-line:radix
      if (parseInt(this.device.version) > 7) {
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByName("white");

        // cordova.plugins.backgroundMode.enable();
        // cordova.plugins.backgroundMode.on('activate', () => {
        //   console.log('ACTIVATE background mode');
        //   cordova.plugins.backgroundMode.disableWebViewOptimizations();
        //   cordova.plugins.backgroundMode.disableBatteryOptimizations(); // <- HERE
        //   this.notify();
        // });
      } else {
        this.statusBar.styleBlackTranslucent();
        this.statusBar.backgroundColorByHexString("#673ab7");
      
      }

      // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.FOREGROUND_SERVICE).then(
      //   result => console.log('Has permission?', result.hasPermission),
      //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.FOREGROUND_SERVICE)
      // );

      // this.backgroundMode.on('activate').pipe(map(()=> {
      //   // this.backgroundMode.disableWebViewOptimizations();
      //    this.notify();
      // }));

      // this.platform.pause.subscribe(() => {
      //   this.backgroundMode.disableWebViewOptimizations();
      //   this.backgroundMode.moveToBackground();
      // });

      //  this.platform.resume.subscribe(() =>{
      //   this.backgroundMode.moveToForeground();
      //   //ask for saved pin once app resumes if(this.pinCheck()){
      //  });

      // const channel = this.pusher.init();
      // channel.bind('my-event', (data) => {
      //   this.localNotifications.schedule({
      //     id: data.id,
      //     text: data.title,
      //     title: data.text,
      //     foreground: true
      //   });
      // });

      // channel.bind('send-money', (data) => {
      //   console.log(data);
      //   this.localNotifications.schedule({
      //     id: data.id,
      //     text: data.title,
      //     title: data.text,
      //     foreground: true
      //   });
      // });

      // // Schedule a single notification
      // this.localNotifications.schedule({
      //   id: 3,
      //   text: 'Transfer Received',
      //   title: 'You just received #2400.00 on your Main Account',
      //   foreground: true
      // });
     
    });
  }

  notify() {
    if (this.user != null) {
      this.socket.connect();
      this.socket.emit("notifyHandShake", this.user.id);
    }
  }
  datedifference(date) {
    const date1: any = new Date(date);
    const date2: any = new Date();
    const diffTime: any = Math.abs(date2 - date1);
    const diffDays: any = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      timeDif: diffTime,
      dateDif: diffDays,
    };
  }


  Pages = [
    {
      title: 'History',
      url: '/history',
      icon: 'timer'
    },
    {
      title: 'Zit Booster',
      url: '/zit-booster',
      icon: 'diamond'
    },
   
    {
      title: 'Access Loan',
      url: '/loan',
      icon: 'cash'
    },
    {
      title: 'Education',
      url: '/education',
      icon: 'school'
    },
   
    {
      title: 'Bill Payments',
      url: '/bill-payments',
      icon: 'card'
    },
    {
      title: 'Pay Merchant',
      url: '/send-to-merchantid',
      icon: 'person'
    },
    {
      title: 'User Settings',
      url: '/user-settings',
      icon: 'cog'
    },
    {
      title: 'Merchant Settings',
      url: '/merchant-settings',
      icon: 'cog'
    },
    {
      title: 'Customer Service',
      url: '/help',
      icon: 'chatbubbles'
    },
   
  ];

  goIg(){
    // window.open('https://www.instagram.com/euzzit')
    this.iab.create('https://www.instagram.com/euzzit');
  }

  goTwitter(){
    window.open('https://wa.me/message/FQNDY23FKTVUA1')
    // this.iab.create('https://wa.me/message/FQNDY23FKTVUA1');
  }
  goFacebook(){
    // window.open('https://www.facebook.com/euzzit')
    this.iab.create('https://www.facebook.com/euzzit');

  }

  goRoute(page) {
    console.log(page)
    this.router.navigateByUrl(page.url)
  }
}
