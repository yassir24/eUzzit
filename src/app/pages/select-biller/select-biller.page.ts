import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BillerService } from 'src/app/services/biller.service';
import { EventsService } from 'src/app/services/events.service';
import { ChooseWalletPage } from '../choose-wallet/choose-wallet.page';
import { ConfirmTransactionPage } from '../confirm-transaction/confirm-transaction.page';
import { SelectBillerAirtimePage } from '../select-biller-airtime/select-biller-airtime.page';
import { SelectBillersPage } from '../select-billers/select-billers.page';
import { SelectProductCablePage } from '../select-product-cable/select-product-cable.page';
import { SelectProductPage } from '../select-product/select-product.page';
import { SuccessPage } from '../success/success.page';

@Component({
  selector: 'app-select-biller',
  templateUrl: './select-biller.page.html',
  styleUrls: ['./select-biller.page.scss'],
})
export class SelectBillerPage implements OnInit {

  providername = 'Select biller'
  productname = 'Select product'
  productamount;
  cableid: any;
  products: any;
  service: any;
  error: string;
  successheader: string;
  successmessages: string;
  success: boolean = false;
  coins: any;
  shortname;
  cabledata: any;
  CableTVForm: FormGroup;
  submitted: boolean = false;
  accountNameValid: boolean = false;
  service_id: any;
  type: any;
  buttontitle = 'Choose Account'

  constructor(public modalController: ModalController,
    private events:EventsService,
    private currencyPipe: CurrencyPipe,
    public formBuilder: FormBuilder,
    public toastController: AlertController,
    private billerService: BillerService
    
    ) { 
      this.CableTVForm = formBuilder.group({
        account: ["", Validators.compose([Validators.required])],
        customername: ["", Validators.compose([Validators.required])],
        wallet: ["", Validators.compose([Validators.required])],
        amount: ["", Validators.compose([Validators.required])],
        customernumber: [""],
        invoicePeriod: ["1"],
        customeraddress: ["Lagos"],
      });
    this.events.subscribe('setcableprovider', (data: any) => {
      console.log('this is the data id', data.service.id)
      this.cableid = data.service.id
      this.cabledata = data.service;
      this.type = data.service.category_type
      this.providername = data.service.name;

  });
    this.events.subscribe('setcableproduct', (data: any) => {
      this.productname = data.product.name
      this.productamount = data.product.Amount
      this.shortname = data.product.shortnamel
     
      console.log('this is the product data', data.product.name)
      this.CableTVForm.patchValue({
        amount: data.product.Amount,
      });
  });

  this.events.subscribe('selectwallet', (data: any) => {
    console.log('this is the wallet data', data.wallet.slug)
    // this.pageTitle = data.title
    this.buttontitle = data.wallet.slug + ' Account'
    this.CableTVForm.patchValue({
      wallet: data.wallet.slug,
    });
});
  }

  ngOnInit() {
    // this.billerService.getCableProducts(this.cabledata.id).subscribe((res) => {
    //   console.log(res.data.products);
    //   console.log(res.data.service);
    //   this.products = res.data.products;
    //   this.service = res.data.service;
    //   this.service_id = this.cabledata.id;
    //   // for (const iterator of data.wallets) {
    //   //   if (iterator.slug !== 'shoppy') {
    //   //     this.wallets.push(iterator);
    //   //   }
    //   // }
    // });
  }

  change(value) {
    console.log(value);
    if (value.length == 10) {
      this.verifyUser2(value);
    } else {
      this.submitted = true;
      this.accountNameValid = false;
    }
  }

  get p() {
    return this.CableTVForm.value;
  }


  verifyUser() {
    console.log("this is calling");
    if (this.p.account.length < 1) {
      return;
    }
    this.submitted = true;
    this.billerService
      .verifyElectricity(this.cableid, this.p.account)
      .subscribe(
        (payload) => {
          console.log(payload);
          this.CableTVForm.patchValue({
            customername: payload.data.name,
            customernumber: payload.data.customernumber,
          });
          this.accountNameValid = true;
          // this.accountNumber = this.p.account_no;
          this.submitted = false;
          // this.retry = false;
        },
        (error) => {
          console.log(error);
          this.presentToast(
            "Could not verify Decoder number. Check that your Decoder number is correct or check your internet connection"
          );
          this.CableTVForm.patchValue({
            customername: "",
            customernumber: "",
          });

          this.accountNameValid = false;
          this.submitted = false;
        }
      );
  }

  verifyUser2(value) {
    console.log("this is calling");
    if (value.length < 1) {
      return;
    }
    this.submitted = true;
    this.billerService.verifyElectricity(this.cableid, value).subscribe(
      (payload) => {
        console.log(payload);
        this.CableTVForm.patchValue({
          customername: payload.data.name,
          customernumber: payload.data.customernumber,
        });
        this.accountNameValid = true;
        // this.accountNumber = value_no;
        this.submitted = false;
        // this.retry = false;
      },
      (error) => {
        console.log(error);
        this.presentToast(
          "Could not verify Decoder number. Check that your Decoder number is correct or check your internet connection"
        );
        this.CableTVForm.patchValue({
          customername: "",
          customernumber: "",
        });

        this.accountNameValid = false;
        this.submitted = false;
      }
    );
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      mode: "ios",
      // animated: true,
      // color: "dark",
      // duration: 5000,
    });
    await toast.present();
  }

  async selectBiller() {
    const modal = await this.modalController.create({
      component: SelectBillerAirtimePage,
      // cssClass: 'alert-modal',
      componentProps: { 
        message: 'test message'
      }
    });
    return await modal.present();
  }
  async selectproduct() {
    if ( this.providername === 'Select biller' ) {
      const toast = await this.toastController.create({
        message: 'Select a biller',
        mode: "ios",
        // animated: true,
        // color: "dark",
        // duration: 5000,
      });
      await toast.present();


    } else {
      const modal = await this.modalController.create({
        component: SelectProductCablePage,
        // cssClass: 'alert-modal',
        componentProps: { 
          cableid: this.cabledata.id
        }
      });
      return await modal.present();
    }
  }


  async chooseWallet() {
    const modal = await this.modalController.create({
    component: ChooseWalletPage,
    // componentProps: input,
    cssClass: 'bottom-model',
    
    });
  
    await modal.present();
  
  }


  async confirmModal(u) {
    const modal = await this.modalController.create({
      component: ConfirmTransactionPage,
      componentProps: { 
        // bankname: this.bank, bankaccountnumber: this.accountnumber, amount: this.amount, narration: this.narration
      }
    });
    return await modal.present();
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


  async onRequestCable() {
    if (!this.CableTVForm.valid) {
      return;
    } else {
      this.submitted = true;
      this.billerService
        .buyCable({ ...this.p, service_id: this.cableid })
        .then(
          async (res) => {
            console.log(res);
            if (res.status == "success") {
              let date = new Date();
              this.successmessages = `${res.message}`;
              this.successheader = `SUCCESS`;
              this.coins = `${res.data.coin_earned}`;
              this.success = true;
              this.submitted = false;

              this.showSuccess(res.message, res.data.coin_earned )


            } else {
              this.presentToast(res.message);
            }
          },
          (error) => {
            console.log(JSON.parse(JSON.stringify(error)));
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

}
