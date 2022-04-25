import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import {
  Platform,
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { AuthenticationService } from "src/app/services/authentication.service";
import { CheckpinService } from "src/app/services/checkpin.service";
import { UserService } from "src/app/services/user.service";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";


export class Config {
  inputStyles?: {[key: string]: any};
  containerStyles?: {[key: string]: any};
  allowKeyCodes?: string[];
  length: number;
  allowNumbersOnly?: boolean;
  inputClass?: string;
  containerClass?: string;
  isPasswordInput?: boolean;
  disableAutoFocus?: boolean;
  placeholder?: string;
  letterCase?: 'Upper'| 'Lower';
}


@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

   //user info
   userinfo: any;

   phone: any;
 
   loading: any;
 
   code: number;
 
   successheader: any;
 
   phonePage: boolean = false;
 
   page: any;
   coins;
   success;
   error: string;
 
   submitted: boolean = false;

  otp: string;

  config : Config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '-',
    inputStyles: {
      'width': '64px',
      'height': '64px',
      'border': '0.699999988079071px solid #C7CAD9',
        'border-radius': '4px',
        'background': '#F5F4F4'
    }
  };

  constructor(
    public storage: Storage,
    public router: Router,
    public route: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public platform: Platform,
    public user: UserService,
    private iab: InAppBrowser,
    private pinService: CheckpinService,
    public authService: AuthenticationService
  ) { 
    this.route.queryParams.subscribe((params) => {
      (this.phone = params.phone), (this.page = params.page);
    });
  }

  ngOnInit() {
    if (this.page == "login") this.resendCode();
  }
  terms() {
    console.log("ll");
    this.iab.create("https://euzzit.com/terms");
  }
  resendCode() {
    this.authService.resendActivationCode({ phone: this.phone }).subscribe(
      (res) => {
        this.presentLoading();
        if ((res.status = "success")) {
          this.presentAlert(
            "Verification code sent",
            "Enter the activation code"
          );
        }
      },
      (error) => {
        this.error = "";

        if (error.status >= 400 && error.status < 500) {
          const errorData = error.error.errors;
          if (errorData !== null && typeof errorData !== "object") {
            this.error += error.error.errors;
          } else {
            for (let key in errorData) {
              console.log(key);
              this.error += errorData[key] + "\n";
            }
          }

          this.presentToast(this.error);
        }
      }
    );
  }
  verifyOTP() {
    console.log(this.code);
    this.submitted = true;
    console.log(
      "%c this is the phone" + this.phone,
      "color: red, font-size: 1.5em"
    );
    this.authService
      .activate_account({ phone: this.phone, code: this.code })
      .subscribe(
        async (res) => {
          console.log(res);
          this.presentLoading();
          if ((res.status = "success")) {
            this.submitted = false;
            // this.successmessages = `&#8358;${this.p.amount} Internet Recharge for ${this.p.phone_no} Successful!`;
            this.successheader = res.message;
            this.success = true;
            this.coins = "";
            this.presentAlert("Success", "kindly login to your account");
            // this.presentToast(
            //   "Account activation successful. Please log in ......."
            // );
            //  await this.pinService.createPin();
            this.router.navigate(["/login"]);
            this.submitted = false;
          }
        },
        (error) => {
          this.error = "";

          if (error.status >= 400 && error.status < 500) {
            const errorData = error.error.errors;
            if (errorData !== null && typeof errorData !== "object") {
              this.error += error.error.errors;
            } else {
              for (let key in errorData) {
                console.log(key);
                this.error += errorData[key] + "\n";
              }
            }

            this.presentAlert("Error", this.error);
            this.submitted = false;
          }
        }
      );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    await toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please wait",
      duration: 2500,
    });
    return await this.loading.present();
  }

  async presentAlert(header: string, message) {
    const alert = await this.alertController.create({
      header: header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  signup() {
    this.router.navigate(["/signup"]);
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

}
