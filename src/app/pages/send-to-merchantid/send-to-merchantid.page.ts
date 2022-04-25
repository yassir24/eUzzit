import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import {
  ToastController,
  AlertController,
  NavController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import {
  Contacts,
  Contact,
  ContactField,
  ContactName,
} from "@ionic-native/contacts/ngx";
import { Storage } from "@ionic/storage";
import { WalletService } from "../../services/wallet.service";
import { BillerService } from "../../services/biller.service";
import { TransactionService } from "../../services/transaction.service";
import { InfoComponent } from "../../components/info/info.component";
import { error } from "protractor";
import { SuccessPage } from "../success/success.page";
import { EventsService } from "src/app/services/events.service";
import { ChooseWalletPage } from "../choose-wallet/choose-wallet.page";

@Component({
  selector: 'app-send-to-merchantid',
  templateUrl: './send-to-merchantid.page.html',
  styleUrls: ['./send-to-merchantid.page.scss'],
})
export class SendToMerchantidPage implements OnInit {

 
  customActionSheetOptions;

  sucsess;
  constructor(
    public billerService: BillerService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public toastController: ToastController,
    public walletService: WalletService,
    public transactionService: TransactionService,
    public modalController: ModalController,
    private popoverCtrl: PopoverController,
    public contacts: Contacts,
    public events: EventsService
  ) {
    this.sendMoneyForm = formBuilder.group({
      to_user: ["", Validators.compose([Validators.required])],
      // userName: ['', Validators.compose([Validators.required])],
      amount: ["", Validators.compose([Validators.required])],
      wallet: ["", Validators.compose([Validators.required])],
      merchantid: ["", Validators.compose([Validators.required])],
    });

    this.events.subscribe('selectwallet', (data: any) => {
      console.log('this is the wallet data', data.wallet.slug)
      // this.pageTitle = data.title
     this.buttontitle = data.wallet.slug + ' Account'
      this.sendMoneyForm.patchValue({
        wallet: data.wallet.slug,
      });
  });
  }

  get p() {
    return this.sendMoneyForm.controls;
  }

  sendMoneyForm: FormGroup;
  pageTitle: string;
  category: any;
  pickedcontact: any;
  wallets: any = [];
  userinfo: any;
  history: any = [];
  loaded = true;
  error: string;
  submitSend = false;
  walletHolder: any;
  validated: boolean = false;
  buttontitle = 'Choose Account'

  services = [];

  successheader: string;
  successmessages: string;
  success: boolean = false;
  coins: any;

  // customActionSheetOptions: any = {
  //   header: 'Choose Wallet',
  //   subHeader: 'Select wallet to pay from'
  // };

  // compareWith = this.compareWithFn;

  compareWithFn = (o1: any, o2: any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  abs(n: number) {
    return Math.abs(n).toLocaleString("en-US");
  }

  async chooseWallet() {
    const modal = await this.modalController.create({
    component: ChooseWalletPage,
    // componentProps: input,
    cssClass: 'bottom-model',
    });
    await modal.present();
  }

  ngOnInit() {
    this.pageTitle = "Send Money";
    this.category = "send";

    this.userinfo = this.storage.get("user");

    this.walletService.getMyWallets().then((data) => {
      this.wallets = data;
    });

    this.transactionService.getHistory().subscribe((data) => {
      console.log(data);
      for (const iterator of data.wallets) {
        if (iterator.slug !== "shoppy") {
          this.wallets.push(iterator);
        }
      }
      this.history = data.history;
      this.loaded = true;
    });
  }

  async help() {
    const header = `<h3>Send Money to Merchant</h3>`;
    const content = `<ion-label color="primary"><p>Make payment or donation to Merchant ID and earn Zit reward.</p><ion-label>`;
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

  segmentButtonClicked(ev: any) {
    this.category = ev;
    if (ev === "send") {
      this.pageTitle = "Send Money";
    }
    if (ev === "saved") {
      this.pageTitle = "Sent History";
    }
    console.log("Segment changed", ev);
  }

  verifyWallet() {
    console.log("working");
    if (this.p.to_user.value.length < 1) {
      return;
    }

    this.submitSend = true;

    this.transactionService
      .verifyMerchant({ identifier: this.p.to_user.value })
      .subscribe(
        (data) => {
          console.log(data);
          if (data.status === "success") {
            this.transactionService
              .getServices({
                identifier: this.p.to_user.value,
              })
              .subscribe((data2) => {
                console.log(data2);
                this.services = data2.data;
                this.walletHolder = data.data.name;
                this.submitSend = false;
              });
          }
        },
        (error) => {
          console.log(error);
          this.presentToast(error.error.message);
          this.submitSend = false;
        }
      );
  }

  validateSend() {
    if (!this.sendMoneyForm.valid) {
      this.submitSend = false;
      console.log(
        "%c this is where the payload for submit is",
        "color: red; font-size: 1.7em"
      );
      return;
    } else {
      this.submitSend = true;
      const payMerchant = {
        euzzit_service_id: this.p.merchantid.value,
        wallet: this.p.wallet.value,
        amount: this.p.amount.value,
        description: "payment",
      };
      console.log(payMerchant);

      this.transactionService
        .makeMerchantTransfer(payMerchant)
        .then(
          (res) => {
            console.log(res);
            console.log(
              "%c this is where the payload for submit is",
              "color: red; font-size: 1.7em"
            );
            if ((res.status = "success")) {
              this.showSuccess(res.message, res.data.coin_earned )
              this.successmessages = res.message;
              this.successheader = "SUCCESS";
              this.submitSend = false;
              this.coins = res.data.coin_earned;
              this.success = true;
            }
          },
          async (error) => {
            this.error = "";
            this.submitSend = false;

            console.log(error);

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
              console.log();
              await this.presentToast(error.error.message);
            }
          }
        )
        .finally(() => (this.submitSend = false));
    }
  }

  changeTitle(title: string) {
    this.pageTitle = title;
  }

  async showSuccess(message, coins) {
    const modal = await this.modalController.create({
      component: SuccessPage,
      componentProps: { 
        message, coins
      }
    });
    return await modal.present();
  }

  pickContact() {
    this.contacts.pickContact().then(
      async (con) => {
        console.log("Contact touched is ", con);
        //const refinedInputs = this.createInputs( con );
        // const alert = await this.alertController.create({
        //   header: 'Pick a Phone Number',
        //   inputs: refinedInputs,
        //   buttons: [
        //     {
        //       text: 'Cancel',
        //       role: 'cancel',
        //       cssClass: 'secondary',
        //       handler: () => {
        //         console.log('Confirm Cancel');
        //       }
        //     }, {
        //       text: 'Ok',
        //       handler: (data) => {

        //         console.log('Confirm Ok');
        //       }
        //     }
        //   ]
        // });

        //await alert.present();

        let phone = con.phoneNumbers[0].value;
        phone = phone.split(" ").join("");

        if (phone.length > 11) {
          let split = phone.split("+234");
          phone = "0" + split[1];
        }

        this.sendMoneyForm.patchValue({
          to_user: phone,
        });
      },
      (err) => {}
    );
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
    });
    toast.present();
  }

  // async presentModal(wallet: any, amount: string, data: any, numbers: any) {
  //   const modal = await this.modalController.create({
  //     component: ConfirmSendPage,
  //     animated: true,
  //     showBackdrop: true,
  //     backdropDismiss: true,
  //     cssClass: "confirm-modal",
  //     componentProps: {
  //       wallet,
  //       amount,
  //       receiver: data,
  //       transfernumbers: numbers,
  //     },
  //   });

  //   this.submitSend = false;
  //   return await modal.present();
  // }

}
