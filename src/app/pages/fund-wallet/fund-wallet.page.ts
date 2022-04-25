import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";

import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  ToastController,
  NavController,
  AlertController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { BillerService } from "../../services/biller.service";
import { WalletService } from "../../services/wallet.service";
import { DomSanitizer } from "@angular/platform-browser";
import { IframePage } from "src/app/modal/iframe/iframe.page";
import { InfoComponent } from "../../components/info/info.component";
import { CheckpinService } from "../../services/checkpin.service";
import { first } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.page.html',
  styleUrls: ['./fund-wallet.page.scss'],
})
export class FundWalletPage implements OnInit {

  userprofile: any;
  fundWalletForm: FormGroup;
  submitted: boolean = false;
  rand: any = "6167" + Math.floor(Math.random() * 100000000000 + 1);
  amount: any;
  user: any;
  externalLink: any;
  openlink: boolean = false;
  success: boolean = false;
  successheader: any;
  successmessages: any;
  coins: any;
  profile: any;
  plt: any

  bankNo;
  bankName;
  error;
  constructor(
    public storage: Storage,
    public billerService: BillerService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public platform: Platform,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public modalController: ModalController,
    private sanitizer: DomSanitizer,
    private popoverCtrl: PopoverController,
    private checkpinService: CheckpinService,
    private walletService: WalletService,
    private route: ActivatedRoute,
    private iab: InAppBrowser
  ) { 
    this.route.params.subscribe((val) => {
      this.amount = null;
    });
    this.fundWalletForm = formBuilder.group({
      amount: ["", Validators.compose([Validators.required])],
    });

    this.getUser()
    
     }

     async getUser() {
      this.userprofile = await this.storage.get("user");
     }

  ngOnInit() {
    if (this.platform.is('ios')) {
      this.plt = 'ios'
    }

    this.bankName = localStorage.getItem("bankName");
    this.bankNo = localStorage.getItem("accountNumber");
    this.amount = null;
    this.storage.get("user").then((val) => {
      this.user = val;
    });

    this.storage.get("profile").then((data) => {
      this.profile = data;
    });
  }

  async shareWallet() {
    await Share.share({
      title: 'eUzzit',
      text: `${this.userprofile?.full_name} Fidelity Bank. Account Number${this.userprofile?.virtual_account.account_number}`,
      url: 'https://www.euzzit.com/',
      dialogTitle: 'Share Account details',
    })
  }


  generateRand() {
    this.rand = "6167" + Math.floor(Math.random() * 100000000000 + 1);
  }

  async help() {
    const header = `<h3>Add Money to your Wallet</h3>`;
    const content = `<ion-label color="primary"><p>Fund your wallet using your ATM card or receive bank transfer with your (Euzzit) Fidelity Bank Account Number.</p><ion-label>`;
    const pop = await this.popoverCtrl.create({
      component: InfoComponent,
      cssClass: "popover",
      mode: "ios",
      componentProps: {
        content,
        header,
      },
    });
    await pop.present();
  }

  async sendPostRequest() {
    this.submitted = true;
    this.openlink = true;
    this.storage.get("user").then((val) => {
      this.walletService
        .getTransactionRef({
          amount: this.p.amount.value,
          type: "deposit",
          deposit_wallet: "main",
        })
        .pipe(first())
        .subscribe(async (res) => {
          if (res.status == "success") {
            // console.log(val.phone, this.user);
            const modal = await this.modalController.create({
              component: IframePage,
              animated: true,
              showBackdrop: true,
              backdropDismiss: true,
              cssClass: "confirm-modal",
              componentProps: {
                externalLink: this.sanitizer.bypassSecurityTrustResourceUrl(
                  "https://paywith.quickteller.com?paymentCode=04372101&amount=" +
                    res.data.amount * 100 +
                    "&customerId=" +
                    this.user.phone +
                    "&mobileNumber=" +
                    this.user.phone +
                    "&emailAddress=euzzit@euzzit.com&requestReference=" +
                    res.data.transaction_ref
                ),
                transactionRef: res.data.transaction_ref,
              },
            });
            await modal.present();
            this.submitted = false;
            const { data } = await modal.onWillDismiss();

            if (data.dismissed) {
              this.navCtrl.navigateForward("/tabs/tab1");
              this.submitted = false;
              const data2 = {
                transaction_ref: res.data.transaction_ref,
                processor_response: {},
              };

              this.walletService.fundWallet(data2).subscribe(
                (res) => {
                  this.submitted = false;

                  // if (res.status === "success") {
                  //   this.presentAlert({
                  //     head: "Funding of Wallet successfull!",
                  //     body: data.message,
                  //   });
                  // } else {
                  //   this.presentAlert({
                  //     head: "Funding of Wallet Failed!",
                  //     body: data.message,
                  //   });
                  // }
                },
                (error) => {
                  this.error = "";
                  this.submitted = false;

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

                    // this.presentAlert({
                    //   head: "Funding of Wallet Failed!",
                    //   body: this.error,
                    // });
                    this.submitted = false;
                  }
                }
              );

              // this.generateRand();
              // this.submitted = false;
              // if (data.message.length > 0) {
              //   console.log("kk");
              //   this.presentAlert({
              //     head: "Funding of Wallet Failed!",
              //     body: data.message,
              //   });
              // }
            }
          }
        });
    });
  }

  get p() {
    return this.fundWalletForm.controls;
  }

  async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: msg.head,
      message: msg.body,
      buttons: ["OK"],
    });
    await alert.present();
  }

}
