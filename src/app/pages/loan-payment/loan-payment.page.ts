import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { AlertController, ModalController } from '@ionic/angular';
import { CheckpinService } from 'src/app/services/checkpin.service';
import { EventsService } from 'src/app/services/events.service';
import { Config } from '../../providers/config';
import { ChooseWalletPage } from '../choose-wallet/choose-wallet.page';

@Component({
  selector: 'app-loan-payment',
  templateUrl: './loan-payment.page.html',
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./loan-payment.page.scss'],
})
export class LoanPaymentPage implements OnInit {

  res: any;
  shownumberofdays = false
  choosepayment = false
  fullpayment = false
  installmentpayment = false
  paymentselected = false
  paymentmethod;
  buttontitle = 'Choose Account';
  walletchosen;
  daysleft: any
  method = 'Payment Method'
  installmentamount: any;
  repaymentinstallment: any;
  newdaysleft: any
  test;
  loaded = false
  config: CountdownConfig = {
    leftTime: 60,
    format: 'HH:mm:ss',
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  constructor(private http: HttpClient, 
    private toastController: AlertController,
    public pinService: CheckpinService,
    private modalController: ModalController,
    public events: EventsService,
    public conf: Config) { 
      this.events.subscribe('selectwallet', (data: any) => {
        console.log('this is the wallet data', data.wallet.slug)
        // this.pageTitle = data.title
       this.buttontitle = data.wallet.slug + ' Account'
        this.walletchosen = data.wallet.slug
    });
    }

   ngOnInit() {
    this.calculateData()
  }

  

  calculateData() {
     // console.log('this is the res');
     return this.http.get<any>(`${this.conf.api_url}/user/loans/active-loan`).subscribe(res=>{
      this.loaded = true
     
      this.daysleft = res.message[0].no_of_days_left
      this.newdaysleft = res.message[0].no_of_days_left
      this.res = res.message[0].loan_amount;
      this.repaymentinstallment = res.message[0].repayment_installment;
      let temp = parseInt(this.repaymentinstallment)
      this.installmentamount =  this.repaymentinstallment * this.daysleft
      console.log( this.installmentamount , 'this is it')
      console.log('this is the res',this.res)
      
    }, error =>{
      this.loaded = false
      return this.presentToast(error)
    } )
  }

  handleEvent(e: CountdownEvent) {
    console.log('Actions', e);
  }
  calculatenewData(days) {
     // console.log('this is the res');
     return this.http.get<any>(`${this.conf.api_url}/user/loans/active-loan`).subscribe(res=>{
     
      this.daysleft = days
      this.res = res.message[0].loan_amount;
      this.repaymentinstallment = res.message[0].repayment_installment;
      let temp = parseInt(this.repaymentinstallment)
      this.installmentamount =  this.repaymentinstallment * this.daysleft
      console.log(temp,  this.repaymentinstallment, 'this is it')
      console.log('this is the res',this.res)
      
    }, error =>{
      return this.presentToast(error)
    } )
  }

  doSometing(amount) {
    console.log(amount, this.newdaysleft)
    if (amount <= 0 || amount> this.newdaysleft) {
      this.presentnewToast('Numer of days cannot be 0 or greater than the day left')
    } else {
       this.daysleft = amount
    this.calculatenewData( this.daysleft)
    }
  }

  selectPayment(payment) {
    if(payment === 'full') {
      this.paymentselected = true
      this.method = 'Full Payment'
      this.paymentmethod = payment;
      this.shownumberofdays = !this.shownumberofdays

    } else if(payment === 'installment'){
      this.paymentselected = true;
      this.method = 'Installment Payment'
      this.paymentmethod = payment;
      this.shownumberofdays = !this.shownumberofdays
    }
  }

  async presentToast(error: any) {
    const toast = await this.toastController.create({
      header: 'Oops',
      message: error.error.message,
      // buttons: ['Disagree', 'Agree'],
    });
    toast.present();
  }
  async presentnewToast(error: any) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: error,
      // buttons: ['Disagree', 'Agree'],
    });
    toast.present();
  }

  showP() {
    this.shownumberofdays = !this.shownumberofdays
  }

  async chooseWallet() {
    const modal = await this.modalController.create({
    component: ChooseWalletPage,
    // componentProps: input,
    cssClass: 'bottom-model',
    });
    await modal.present();
  }

   async payLoan() {
    if (this.paymentmethod === 'full') {
      const pin = await this.pinService.runCheck('loanpayment', 'full');
      if (pin) {
          return this.http.post<any>(`${this.conf.api_url}/user/loans/offset-all`, {wallet: this.walletchosen}, {
            headers: new HttpHeaders({ pin: pin }),
          }).subscribe(res=>{
           
            this.res = res
            console.log('offset all repayment was successful',this.res)
          }, error =>{
            console.log('oops', error.error.message )
            this.presentToast(error);
          } )
      }
    

   
    } else if(this.paymentmethod === 'installment') {
      const pin = await this.pinService.runCheck('loanpayment', 'installment');
      if (pin) {
          return this.http.post<any>(`${this.conf.api_url}/user/loans/offset-some`, {wallet: this.walletchosen, num_of_days: this.daysleft }, {
            headers: new HttpHeaders({ pin: pin }),
          }).subscribe(res=>{
           
            this.res = res
            console.log('offset all repayment was successful',this.res)
          }, error =>{
            console.log('oops', error.error.message )
            this.presentToast(error);
          } )
      }
    }
  }

  addDays() {
     this.daysleft = this.daysleft+1
  }
  removeDays() {
     this.daysleft = this.daysleft-1
  }
}
