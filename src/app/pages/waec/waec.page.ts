import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ToastController,
  AlertController,
  // Events,
} from "@ionic/angular";
import { NavigationExtras } from "@angular/router";
import { BillerService } from "../../services/biller.service";
import { WalletService } from "../../services/wallet.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { first } from "rxjs/internal/operators/first";
import {
  Contacts,
  Contact,
  ContactField,
  ContactName,
} from "@ionic-native/contacts/ngx";
import { CheckpinService } from "../../services/checkpin.service";
import { AlertInput, AlertOptions } from "@ionic/core";
import { JsonPipe, CurrencyPipe } from "@angular/common";
import { EventsService } from "src/app/services/events.service";

import { ModalController } from '@ionic/angular';
import { ChooseWalletPage } from '../choose-wallet/choose-wallet.page';
import { ConfirmTransactionPage } from '../confirm-transaction/confirm-transaction.page';
import { SelectBillersPage } from '../select-billers/select-billers.page';
import { SuccessPage } from '../success/success.page';
import { ChooseWaecCardPage } from '../choose-waec-card/choose-waec-card.page';

@Component({
  selector: 'app-waec',
  templateUrl: './waec.page.html',
  styleUrls: ['./waec.page.scss'],
})
export class WaecPage implements OnInit {

  airtimeData: [];
  loaded = false;
  category: any = "airtime";
  pageTitle: string;
  service_id: any;
  jambForm: FormGroup;
  wallets: any = [];
  userinfo: any;
  submitted = false;
  showLoader: boolean = false;
  // tslint:disable-next-line:variable-name
  other_select = true;
  error: any;
  itemsloaded = false;
  paymentitems: any;
  paymentCode: any;
  successmessages: any;
  successheader: any;
  success = false;
  userprofile: any;
  coins: any;
  amount=0;
  myInputs: any;
  networkid: any;
  walletActionSheetOptions: any;
  buttontitle = 'Choose Account';
  sBiller: any;

  constructor(
    private modalController: ModalController,  
    public billerService: BillerService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe,
    public pinService: CheckpinService,
    public storage: Storage,
    public toastController: AlertController,
    public walletService: WalletService,
    // tslint:disable-next-line: deprecation
    public contacts: Contacts,
    public events: EventsService,) { 
      this.jambForm = formBuilder.group({
        account: ["", Validators.compose([Validators.required])],
        wallet: ["", Validators.compose([Validators.required])],
      });
      this.events.subscribe('setwaecprovider', (data: any) => {
        console.log('this is the waec data', data)
        this.showBiller(data.service_id)
        this.pageTitle = `${data.service_id.name}, ${data.service_id.amount} `
        this.jambForm.patchValue({
          service_id: data.service_id,
        });
    });
      this.events.subscribe('selectwallet', (data: any) => {
        console.log('this is the wallet data', data.wallet.slug)
        // this.pageTitle = data.title
       this.buttontitle = data.wallet.slug + ' Account'
        this.jambForm.patchValue({
          wallet: data.wallet.slug,
        });
    });
    this.getUser()

    

    
     }

     async getUser() {
      this.userprofile = await this.storage.get("user");
     }

     showBiller(data) {
      this.sBiller = data;
    }

  ngOnInit() {

  
    this.pageTitle = "Choose Biller";

    this.userinfo = this.storage.get("user");

    // compute first call to airvend 4 is mobile recharge
    this.billerService.getAirtimeBillers().subscribe((res) => {
      console.log(res);
      this.airtimeData = res.data;
      this.airtimeData.pop();
      this.loaded = true;
    });

    this.walletService.getMyWallets().then((res) => {
      this.wallets = res;
    });
  }


  buyAirtime() {
    this.modalController.dismiss()
   this.submitted = true;
   this.billerService
     .recharge('waec',this.p, this.p)
     .then(
       (res) => {
         console.log(res);
         if (res.status === "success") {
           this.submitted = false;
           this.successheader = "SUCCESS";
           this.showSuccess(res.message, res.data.coin_earned )
           // this.successmessages = `&#8358;${this.p.amount} Internet Recharge for ${this.p.phone_no} Successful!`;
           this.successmessages = res.message;
           this.success = true;
           this.coins = res.data.coin_earned;
         } else if (res.error.responseCodeGrouping === "PENDING") {
           this.presentToast(res.message);
           this.submitted = false;
         } else {
           this.presentToast(res.message);
           this.submitted = false;
         }
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

           this.presentToast(this.error);
           this.submitted = false;
         }
       }
     )
     .finally(() => (this.submitted = false));
  }

  async selectBiller() {
    const modal = await this.modalController.create({
      component: ChooseWaecCardPage,
      // cssClass: 'alert-modal',
      componentProps: { 
        message: ''
      }
    });
    return await modal.present();
  }

  

  async chooseWallet() {
    const modal = await this.modalController.create({
    component: ChooseWalletPage,
    // componentProps: input,
    cssClass: 'bottom-model',
    });
    await modal.present();
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


  createInputs(contacts: any) {
    const theNewInputs = [];
    for (let i = 0; i < contacts.length; i++) {
      theNewInputs.push({
        name: "phone",
        type: "radio",
        label: JSON.stringify(contacts[i]),
        value: JSON.stringify(contacts[i]),
        checked: i === 0 ? true : false,
      });
    }

    return theNewInputs;
  }

  get p() {
    return this.jambForm.value;
  }

  async onRequestAirtime() {
    console.log(this.p);


    const modal = await this.modalController.create({
      component: ConfirmTransactionPage,
      componentProps: { 
        data: this.p,
        provider: this.pageTitle
      }
    });
    return await modal.present();

    // if (!this.buyAirtimeForm.valid) {
    //   this.submitted = false;
    //   return;
    // } else {
    //   this.submitted = true;
    //   this.billerService
    //     .recharge(this.p)
    //     .then(
    //       (res) => {
    //         console.log(res);
    //         if (res.status === "success") {
    //           this.submitted = false;
    //           this.successheader = "SUCCESS";
    //           // this.successmessages = `&#8358;${this.p.amount} Internet Recharge for ${this.p.phone_no} Successful!`;
    //           this.successmessages = res.message;
    //           this.success = true;
    //           this.coins = res.data.coin_earned;
    //         } else if (res.error.responseCodeGrouping === "PENDING") {
    //           this.presentToast(res.message);
    //           this.submitted = false;
    //         } else {
    //           this.presentToast(res.message);
    //           this.submitted = false;
    //         }
    //       },
    //       (error) => {
    //         this.error = "";
    //         this.submitted = false;

    //         if (error.status >= 400 && error.status < 500) {
    //           const errorData = error.error.errors;
    //           if (errorData !== null && typeof errorData !== "object") {
    //             this.error += error.error.errors;
    //           } else {
    //             for (let key in errorData) {
    //               console.log(key);
    //               this.error += errorData[key] + "\n";
    //             }
    //           }

    //           this.presentToast(this.error);
    //           this.submitted = false;
    //         }
    //       }
    //     )
    //     .finally(() => (this.submitted = false));
    // }
  }

  abs(n: number) {
    return Math.abs(n).toLocaleString("en-US");
  }

  changeTitle(title: string, service_id: number) {
    this.pageTitle = title;
    this.jambForm.patchValue({
      service_id: service_id,
    });

    // this.billerService.getISAirtimePaymentItems(billerid).subscribe(data => {
    //   //  console.log(data);
    //   this.paymentitems = data.paymentitems;
    //   this.itemsloaded = true;
    //   // get payment code of specify amount as default
    //   let payitem: any;
    //   payitem = data.paymentitems.find((x: { paymentitemname: any; }) => x.paymentitemname.includes('Top up'));
    //   if (billerid === 901) {
    //     /// Airtel(901) has a different default...
    //     payitem = data.paymentitems.find((x: { paymentitemname: any; }) => x.paymentitemname.includes('Top-up'));
    //   }

    //   this.buyAirtimeForm.patchValue({
    //     networkid: billerid,
    //     paymentcode: payitem.paymentCode
    //   });

    // });
  }

  async buyJamb() {
    console.log(this.jambForm);
    if (!this.jambForm.valid) {
      this.showLoader = false;
      return;
    } else {
      this.showLoader = true;
      this.billerService
        .buyJamb({
          service_id: 25,
          code: "waec",
          amount: this.sBiller.amount,
          wallet: this.jambForm.value.wallet,
          account: this.jambForm.value.account,
        })
        .then(
          (res) => {
            if (res.status == "success") {
              this.successheader = "SUCCESS";
              this.successmessages = `${res.message} <br><br> Credit token is:${res.data.credit_token.creditToken}`;
              // "Credit token is: " + res.data.credit_token.creditToken;
              this.coins = res.data.coin_earned;
              this.success = true;
              this.showSuccess(res.message, res.data.coin_earned )
            }
            this.showLoader = false;
          },
          (error) => {
            let thisError = "";
            this.showLoader = false;

            if (error.status >= 400 && error.status < 500) {
              const errorData = error.error.errors;
              if (errorData !== null && typeof errorData !== "object") {
                thisError += error.error.errors;
              } else {
                for (let key in errorData) {
                  console.log(key);
                  thisError += errorData[key] + "\n";
                }
              }
            }
            this.presentToast(thisError);
          }
        )
        .finally(() => (this.showLoader = false));
    }
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  loadAirtime(airtime: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        airtime: JSON.stringify(airtime),
      },
    };
    this.navCtrl.navigateForward(["buyairtime"], navigationExtras);
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

        this.jambForm.patchValue({
          phone_no: phone,
        });
      },
      (err) => {}
    );
  }

  // pickContact() {
  //   this.contacts.pickContact().then((con) => {
  //     this.buyAirtimeForm.patchValue({
  //       msisdn: con.phoneNumbers[0].value
  //     });
  //   }, (err) => {

  //   });
  // }

  insertDecimal(num: number) {
    return (num / 100).toFixed(2);
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      // duration: 5000,
    });
    toast.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: "Success!",
      message: msg,
      buttons: ["OK"],
    });
    await alert.present();
  }

  otherSelect() {
    this.other_select = true;
  }

  aTmount(item: any) {
    this.paymentCode = item.paymentCode;
    const newamount = this.insertDecimal(item.amount);
    this.jambForm.patchValue({
      amount: newamount,
    });
  }

  segmentButtonClicked(ev: any) {
    this.category = ev;
    console.log("Segment changed", ev);
  }


}
