import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ChooseWalletPage } from '../choose-wallet/choose-wallet.page';
import { ZitPricesPage } from '../zit-prices/zit-prices.page';
import { Config } from '../../providers/config';
import { map } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';
import { CheckpinService } from 'src/app/services/checkpin.service';
import { SuccessPage } from '../success/success.page';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-zit-booster',
  templateUrl: './zit-booster.page.html',
  styleUrls: ['./zit-booster.page.scss'],
})
export class ZitBoosterPage implements OnInit {

  boostedzit = 1000;
  userprofile: any;
  amount = 1000;
  buttontitle = 'Choose Wallet'
  price: any;
  zitid: any;
  zit ='Select Zit';
  wallet: any;
  buyingzit = false;
  coin: any;

  constructor(public storage: Storage,
    private toastController: AlertController,
    private walletService: WalletService,
    public pinService: CheckpinService, private modalController: ModalController, public events: EventsService,
     private http: HttpClient, public config: Config) {
      this.events.subscribe('selectwallet', (data: any) => {
        console.log('this is the wallet data', data.wallet.slug)
        // this.pageTitle = data.title
        this.wallet = data.wallet.slug;
       this.buttontitle = data.wallet.slug + ' Wallet'
    }); 
      this.events.subscribe('selectprice', (data: any) => {
        console.log('this is the price data', data)
        // this.pageTitle = data.title
       this.price = data.price.price;
       this.zitid = data.price.id;
       this.zit = data.price.name
    }); 
    this.getUser()
  }

  async getUser() {
    this.userprofile = await this.storage.get("user");
   }


  async ngOnInit() {
    let coin = await this.walletService.getMyCoin();
    console.log(this.coin);
    let x=[];x.push(coin);
    this.coin=Number(x[0].balance);
  }

  amountChanged(e) {
    this.amount = e.detail.value
    console.log(e.detail.value)
  }

  boostedZitChange(e) {
    this.boostedzit = e.detail.value
    console.log(e.detail.value)
  }

  async chooseWallet() {
    const modal = await this.modalController.create({
    component: ChooseWalletPage,
    // componentProps: input,
    cssClass: 'bottom-model',
    
    });
  
    await modal.present();
  
  }
  async choosePrices() {
    const modal = await this.modalController.create({
    component: ZitPricesPage,
    // componentProps: input,
    // cssClass: 'bottom-model',
    
    });
  
    await modal.present();
  
  }

  // buyZit() {
  //   this.buyingzit = true
  //   return this.http.post<any>(`${this.config.api_url}/user/zit-purchase/payment` , {
  //     zit_sale_id: this.zitid,
  //     wallet: this.wallet
  //   }).subscribe(res =>{
  //     console.log('this is the res', res)
  //   })
  // }

  async buyZit() {
    if (!this.price || !this.zitid || !this.wallet) {
      return
    } else {
      const pin = await this.pinService.runCheck();
      if (pin) {
        return this.http.post<any>(`${this.config.api_url}/user/zit-purchase/payment` , {
          zit_sale_id: this.zitid,
          wallet: this.wallet
        }).subscribe(res =>{
          console.log('this is the res', res);
          if (res.status === "success") {
            this.showSuccess(res.message, res.data.coin_earned )
            // this.successmessages = `&#8358;${this.p.amount} Internet Recharge for ${this.p.phone_no} Successful!`;
            // this.successmessages = res.message;
            // this.success = true;
            // this.coins = res.data.coin_earned;
          } else if (res.error.responseCodeGrouping === "PENDING") {
            this.presentToast(res.message);
            // this.submitted = false;
          } else {
            this.presentToast(res.message);
            // this.submitted = false;
          }
        })
      }
    }
   
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

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: error,
      // buttons: ['Disagree', 'Agree'],
    });
    toast.present();
  }

}
