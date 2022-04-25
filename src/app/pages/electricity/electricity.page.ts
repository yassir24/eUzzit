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
import { ElectricityBillersPage } from '../electricity-billers/electricity-billers.page';
import { ChooseServicidPage } from '../choose-servicid/choose-servicid.page';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.page.html',
  styleUrls: ['./electricity.page.scss'],
})
export class ElectricityPage implements OnInit {

  airtimeData: [];
  loaded = false;
  category: any = "airtime";
  pageTitle: string;
  img:any;
  service_id: any;
  electricityForm: FormGroup;
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
  pagesubTitle2 = 'Choose Service'
  itemsdata: any;
  showError: boolean;
  selectedproduct;
  submitSend = false;
  accountNameValid: boolean;
  sbiller: any;
  show=false;

  successHeader: any;
  successMessage: any;
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
      this.electricityForm = formBuilder.group({
        account: ["", Validators.compose([Validators.required])],
        wallet: ["", Validators.compose([Validators.required])],
        phone_no: ["080000000", Validators.compose([Validators.required])],
        account_name: ["", Validators.compose([Validators.required])],
        amount: [
          "",
          Validators.compose([Validators.required, Validators.min(100)]),
        ],
        service_id: ["", Validators.compose([Validators.required])],
      });
      this.events.subscribe('setelectricityprovider', (data: any) => {
        console.log('this is the electricity data', data)
        this.show=true
        this.showBiller(data.service_id)
        this.pageTitle = data.service_id.name;
        this.img = data.service_id.image
        this.service_id = data.service_id
    });
      this.events.subscribe('setinternetproduct', (data: any) => {
        console.log('this is the selected product data', data)
        this.pagesubTitle = `${data.product.description} for ${data.product.Amount} valid for ${data.product.validity}`;
         this.electricityForm.patchValue({
          amount: `${data.product.Amount}-${data.product.code}`
        });
 
    });
      this.events.subscribe('selectwallet', (data: any) => {
        console.log('this is the wallet data', data.wallet.slug)
        // this.pageTitle = data.title
       this.buttontitle = data.wallet.slug + ' Account'
        this.electricityForm.patchValue({
          wallet: data.wallet.slug,
        });
    });
    this.getUser()

    

    
     }

     get f() {
      return this.electricityForm.value;
    }

    async presentAlertConfirm() {
      let wallet = this.wallets.find(
        (x: { slug: any }) => x.slug == this.p.wallet
      );
  
      let messageBody: string = "Service: " + this.sbiller.name + "<br />";
      messageBody += "Meter No: " + this.f.account + "<br />";
      messageBody += "Owner: " + this.f.account_name + "<br />";
      messageBody += "Amount: &#8358;" + this.f.amount + "<br />";
      // messageBody += "Total: &#8358;" + this.p.amount;
  
      const alert = await this.alertController.create({
        header: "Confirm Transaction!",
        message: messageBody,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              this.submitSend = false;
            },
          },
          {
            text: "Okay",
            handler: async () => {
              this.buyElectricity();
            },
          },
        ],
      });
      await alert.present();
    }


    async buyElectricity() {
      if (!this.electricityForm.valid) {
        this.submitSend = false;
        return;
      } else {
        this.submitSend = true;
  
        this.billerService
          .buyElectricity( 'electricity', { ...this.f })
          .then(
            (res) => {
              console.log(res);
              // this.presentToast(JSON.stringify(res));
              let date = new Date();
  
              if (res.status === "success") {
                this.successHeader = res.data.transaction_status;
                this.successMessage =
                  res.data.transaction_message +
                  " successful <br> " +
                  " <br><br>Token: " +
                  (res.data.credit_token
                    ? res.data.credit_token.creditToken
                    : "");
                this.coins = res.data.coin_earned;
                this.success = true;
                this.submitSend = false;
              } else {
                this.presentToast(res.message);
              }
            },
            (err) => {
              let error = "";
              this.submitSend = false;
  
              if (err.status >= 400 && err.status < 500) {
                const errorData = err.error.errors;
                if (errorData !== null && typeof errorData !== "object") {
                  error += err.error.errors;
                } else {
                  for (let key in errorData) {
                    console.log(key);
                    error += errorData[key] + "\n";
                  }
                }
  
                this.presentToast(error);
              }
            }
          )
          .finally(() => (this.submitSend = false));
      }
    }
  

    showBiller(biller: any) {
      // if (!biller.active) {
      //   this.presentToast(biller.name + ' coming soon!');
      //   return;
      // }
  
      this.sbiller = biller;
  
      console.log('this is the issue',this.sbiller['postpaid']);
    }

     verifyUser() {
      if (this.f.account.length < 1) {
        return;
      }
      console.log("this is calling");
      this.submitSend = true;
      this.billerService
        .verifyElectricity(this.f.service_id, this.f.account)
        .subscribe(
          (payload) => {
            console.log(payload);
            this.electricityForm.patchValue({
              account_name: payload.data.name,
            });
            this.accountNameValid = true;
            // this.accountNumber = this.p.account_no;
            this.submitSend = false;
            // this.retry = false;
          },
          (error) => {
            console.log("this is the ", error);
            this.presentToast(
              "Could not verify meter number. Choose the correct service or check internet connection"
            );
            this.submitSend = false;
            this.accountNameValid = false;
            this.electricityForm.patchValue({
              account_name: "",
            });
          }
        );
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
  
    this.pageTitle = "Choose Biller";
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


  buyAirtime() {
    this.modalController.dismiss()
   this.submitted = true;
   this.billerService
     .recharge('electricity',this.p, this.p)
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
      component: ElectricityBillersPage,
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
  async chooseServiceid() {
    const modal = await this.modalController.create({
    component: ChooseServicidPage,
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
    return this.electricityForm.value;
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
    this.electricityForm.patchValue({
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

        this.electricityForm.patchValue({
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
    this.electricityForm.patchValue({
      amount: newamount,
    });
  }

  segmentButtonClicked(ev: any) {
    this.category = ev;
    console.log("Segment changed", ev);
  }

}
