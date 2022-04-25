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
import { InternetBillersPage } from '../internet-billers/internet-billers.page';
import { InternetPlansPage } from '../internet-plans/internet-plans.page';
@Component({
  selector: 'app-internet',
  templateUrl: './internet.page.html',
  styleUrls: ['./internet.page.scss'],
})
export class InternetPage implements OnInit {

  airtimeData: [];
  loaded = false;
  category: any = "airtime";
  pageTitle: string;
  service_id: any;
  internetForm: FormGroup;
  wallets: any = [];
  userinfo: any;
  submitted = false;
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
  is_success: boolean = false;
  myInputs: any;
  networkid: any;
  walletActionSheetOptions: any;
  buttontitle = 'Choose Account'
  pagesubTitle: any;

  itemsdata: any;
  showError: boolean;
  selectedproduct;
  cat ='';

  error_msg: any;

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
      this.internetForm = formBuilder.group({
        wallet: ["", Validators.compose([Validators.required])],
        phone_no: ["", Validators.compose([Validators.required])],
        amount: ["", Validators.compose([Validators.required])],
      });
      this.events.subscribe('setdataprovider', (data: any) => {
        console.log('this is the internet data', data.title, data.service_id)
        this.cat = data.cat
        this.pageTitle = data.title
        this.service_id = data.service_id
    });
      this.events.subscribe('setinternetproduct', (data: any) => {
        console.log('this is the selected product data', data)
        this.pagesubTitle = `${data.product.description} for ${data.product.Amount} valid for ${data.product.validity}`;
         this.internetForm.patchValue({
          amount: `${data.product.Amount}-${data.product.code}`
        });
 
    });
      this.events.subscribe('selectwallet', (data: any) => {
        console.log('this is the wallet data', data.wallet.slug)
        // this.pageTitle = data.title
       this.buttontitle = data.wallet.slug + ' Account'
        this.internetForm.patchValue({
          wallet: data.wallet.slug,
        });
    });
    this.getUser()

    

    
     }

     async getUser() {
      this.userprofile = await this.storage.get("user");
     }

  ngOnInit() {
    // this.buyAirtimeForm.valueChanges.subscribe(form =>{
    //   if(form.amount) {
    //     this.buyAirtimeForm.patchValue({
    //       amount: this.currencyPipe.transform(form.amount.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0')
    //     }, {emitEvent: false})
    //   }
    // })
  
    this.pageTitle = "Choose Network";
    this.pagesubTitle = "Choose Plan";



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


  async onRequestInternet() {
    if (!this.internetForm.valid) {
      this.submitted = false;

      return;
    } else {
      const reqData = {
        amount: this.p.amount.split("-")[0],
        phone_no: this.p.phone_no,
        service_id: this.service_id,
        wallet: this.p.wallet,
        code: this.p.amount.split("-")[1],
      };
      console.log(reqData);

      this.submitted = true;

      this.billerService
        .internetRecharge('internet', this.cat, reqData)
        .then(
          (data) => {
            if (data.status == "success") {
              this.submitted = false;
              this.successmessages = data.message;
              this.successheader = "SUCCESS";
              this.is_success = true;
              this.coins = data.data.coin_earned;

              this.showSuccess(data.message, data.data.coin_earned )



            } else {
              this.presentToast(data.message);
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
            }
          }
        )
        .finally(() => (this.submitted = false));
    }
  }

  



  buyAirtime() {
    this.modalController.dismiss()
   this.submitted = true;
   this.billerService
     .recharge('internet', this.p, this.p)
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
      component: InternetBillersPage,
      // cssClass: 'alert-modal',
      componentProps: { 
        message: ''
      }
    });
    return await modal.present();
  }
  async selectPlan() {
    const modal = await this.modalController.create({
      component: InternetPlansPage,
      // cssClass: 'alert-modal',
      componentProps: { 
        id: this.service_id
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
    return this.internetForm.value;
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
    this.internetForm.patchValue({
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

        this.internetForm.patchValue({
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
    this.internetForm.patchValue({
      amount: newamount,
    });
  }

  segmentButtonClicked(ev: any) {
    this.category = ev;
    console.log("Segment changed", ev);
  }

}
