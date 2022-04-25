import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ChooseWalletPage } from '../choose-wallet/choose-wallet.page';
import { ZitPricesPage } from '../zit-prices/zit-prices.page';
import { Config } from '../../providers/config';
import { map } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.page.html',
  styleUrls: ['./view-loan.page.scss'],
})
export class ViewLoanPage implements OnInit {

  boostedzit = 1000;
  userprofile: any;
  amount = 1000;
  buttontitle = 'Choose Wallet'
  price: any;
  zitid: any;
  zit ='Select Zit';
  wallet: any;
  buyingzit = false;

  constructor(public storage: Storage, 
    private modalController: ModalController, 
    private router: Router,
    public events: EventsService,
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


  ngOnInit() {
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
    cssClass: 'bottom-model',
    
    });
  
    await modal.present();
  
  }

  accessLoan(){
    this.router.navigateByUrl('/access-loan')
  }

  buyZit() {
    this.buyingzit = true
    return this.http.post<any>(`${this.config.api_url}/user/zit-purchase/payment` , {
      zit_sale_id: this.zitid,
      wallet: this.wallet
    }).subscribe(res =>{
      console.log('this is the res', res)
    })
  }

}
