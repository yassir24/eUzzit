import { AfterContentChecked, Component, ViewChild } from "@angular/core";
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import {
  NavController,
  ModalController,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { WalletService } from "../services/wallet.service";
import { PusherServiceProvider } from "../providers/pusher-service.service";
import { Platform,  } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
// import { PinComponent } from "../../components/pin/pin.component";
import { CheckpinService } from "../services/checkpin.service";
import { Socket } from "ngx-socket-io";
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
import { Keepalive } from "@ng-idle/keepalive";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user.service";
// import { AlertModalPage } from "../alert-modal/alert-modal.page";
import { AngularFirestore } from "@angular/fire/firestore";
import { EventsService } from "../services/events.service";
import { SwiperComponent } from "swiper/angular";
import { SwiperOptions } from "swiper";
import SwiperCore, {Pagination} from 'swiper/core';




SwiperCore.use([Pagination])
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterContentChecked {

  @ViewChild('slides', {static: true}) slides: IonSlides;
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    pagination: true
  }
  currentslideIndex = 0;

  mainbalance: number;
  userprofile: any;
  zit: any;
  user: any;
  showmodal: any;
  transactions: any;
  wallets: any;


  showballance = false;

  accountdata: any

  account_status;
  account_upgrade;

  ShowPin: boolean = false;
  securedlocation: string;
  modal: any;
  notification: number;

  idleState = "Not started.";
  timedOut = false;
  min: any;
  sec;
  any;

  constructor(
    private router: Router,
    public storage: Storage,
    private socket: Socket,
    public walletService: WalletService,
    private db: AngularFirestore,
    public nav: NavController,
    public toastController: ToastController,
    private platform: Platform,
    private userService: UserService,
    private events: EventsService,
    public auth: AuthenticationService,
    public modalController: ModalController,
    public alertController: AlertController,
    private pinService: CheckpinService,
    private statusBar: StatusBar,
    private route: ActivatedRoute
  ) {
    // this.auth.user
   
    // console.log('this is the zit from  auth ', this.auth.zit)
    this.route.params.subscribe(async (val) => {
      if (localStorage.getItem("pinstats") == "false") {
        // await this.pinService.createPin();
      }
      // await this.pinService.createPin();

      // this.notify();

      this.userprofile = await this.storage.get("user");
      this.walletService.getstates().subscribe((data) => {
        console.log(data);
      });
      console.log(this.userprofile);
      this.account_status = this.userprofile.type;
      this.account_upgrade = this.userprofile.account_upgrade;
    });

    this.initializeApp();
    this.walletService.getMyWallets().then((data) => {
      // var main = data.filter
      data.forEach((element) => {
        if (element.slug == "main") {
          this.mainbalance = parseInt(element.balance);
          console.log("Main balance is", this.mainbalance);
        }
      });
    });
  }

  ngAfterContentChecked() {
    if(this.swiper) {
      this.swiper.updateSwiper({})
    }
  }

  swiperSliderChanged(e) {
    // console.log(e)
  }

  slideProfileOpts = {
    effect: "flip",
    autoHeight: true,
    speed: 1000,
    spaceBetween: 4,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 2,
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.statusBar.backgroundColorByHexString("#673ab7");
      let pin = this.storage.get("passcode");
    });

    // this.storage.get('savedpin').then( pin => {
    //   console.log(pin);
    //   if(pin == null) {
    //       //Create Pin
    //       console.log('create pin');
    //       this.pinService.createPin()
    //   }
    //   else{
    //     this.storage.remove('savedpin');
    //   }
    // });
  }

  ionViewWillEnter() {
    this.callWallet()
    this.showballance = false
    try {
      this.userService.accountNo().subscribe((data) => {
        this.userService.setUserdata(data)
        this.accountdata = data.data
        console.log('this is the account data', data )
        localStorage.setItem("bankName", data.data.bank_name);
        localStorage.setItem("accountNumber", data.data.account_number);        

      });
    } catch (error) { // if error
      console.log('something went wront tring to get account details', error); // return error
    }
  }

  callWallet() {
    this.walletService.getMyWallets().then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        data[i].balance = Number(data[i].balance).toFixed(2);
      }
      data.map((item) => {
        if (item.slug == "main") {
          this.wallets = item.balance;
        }
      });
    });
  }


  

  do_getActiveSlide(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
      this.currentslideIndex = index
      console.log("Current active slide index", this.currentslideIndex);
    });
  }

  showBalToggle() {
    this.showballance = !this.showballance;
  }

  async ngOnInit() {
    console.log("olol");
 
    // if (localStorage.getItem("pinstats") == "false") {
    //   await this.pinService.createPin();
    // }

    try {
      this.userService.accountNo().subscribe((data) => {
        this.userService.setUserdata(data)
  
        console.log('this is the account data', data )
        localStorage.setItem("bankName", data.data.bank_name);
        localStorage.setItem("accountNumber", data.data.account_number);
      });
    } catch (error) { // if error
      console.log('something went wront tring to get account details', error); // return error
    }

   

    this.walletService.getstates().subscribe((data) => {
      console.log(data);
    });

    // await this.pinService.createPin();

    // this.notify();

    this.userprofile = await this.storage.get("user");
    console.log('this is the blah',this.userprofile);
    this.account_status = this.userprofile.type;
    this.account_upgrade = this.userprofile.account_upgrade;
    //this.pinService.createPin()
    // this.presentModal()
    // this.checkMaintenencemessage()

    this.zit = await this.storage.get("zit");
    console.log('this is the zit', this.zit)
  }

  goMail() {
    this.router.navigateByUrl('/history')
  }

  goExtra() {
    this.router.navigateByUrl('/extra-wallet')
  }

  // checkMaintenencemessage() {
  //   this.db.collection('appcontrol').snapshotChanges().subscribe(res =>{
  //     const u:any=res[0]
  //     this.showmodal = u.payload.doc.data().showmaintenancemodal;
  //     if (this.showmodal) {
  //       this.presentModal(u)
  //     }
  //   })

    
  // }


  // async presentModal(u) {
  //   const modal = await this.modalController.create({
  //     component: AlertModalPage,
  //     cssClass: 'alert-modal',
  //     componentProps: { 
  //       message: u
  //     }
  //   });
  //   return await modal.present();
  // }


  // ionViewDidLoad() {
  //   console.log("lll");
  //   this.idle.setIdle(1);
  //   this.idle.setTimeout(1 * 60);
  //   this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  //   this.idle.onIdleEnd.subscribe(() => (this.idleState = "No longer idle."));
  //   this.idle.onTimeout.subscribe(() => {
  //     console.log("opop:timeout");
  //     this.idleState = "Timed out!";
  //     this.timedOut = true;
  //     this.runlogout();
  //   });
  // }

  scan2Pay() {
    this.nav.navigateForward("/scan2pay");
  }

  sendMoney() {
    this.nav.navigateForward("/sendmoney");
  }

  withdraw() {
    this.nav.navigateForward("/scan2pay");
  }

  coinPage() {
    this.nav.navigateForward("/coins");
  }

  openPage(page: string) {
    this.nav.navigateForward("/" + page);
  }
  // end of newly added

  fundWallet() {
    this.nav.navigateRoot("/dashboard/fundwallet");
  }

  merchantPage() {
    this.nav.navigateRoot("/dashboard/merchant");
  }

  walletBalances() {
    this.nav.navigateRoot("/dashboard/wallet");
  }

  async presentAlert(errorMsg: any) {
    const alert = await this.alertController.create({
      header: errorMsg.head,
      message: errorMsg.body,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
    });
    toast.present();
  }

  async upgrade() {
    this.nav.navigateForward("upgrade-account");
  }
  async activate() {
    this.nav.navigateForward("activate-wallet");
  }
  async protect() {
    this.nav.navigateForward("profile-settings");
  }


}
