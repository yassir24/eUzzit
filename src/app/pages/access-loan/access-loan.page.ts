import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { CheckpinService } from 'src/app/services/checkpin.service';
import { LoanService } from 'src/app/services/loan.service';
import { Config } from '../../providers/config';
import { DaysSelectPage } from '../days-select/days-select.page';

@Component({
  selector: 'app-access-loan',
  templateUrl: './access-loan.page.html',
  styleUrls: ['./access-loan.page.scss'],
})
export class AccessLoanPage implements OnInit {
  res: any;
  reso: any;
  euzzitextras: any;
  amount: number;
  loandisbursement:any;
  dailyrepayment: any;
  totalrepayment: any;
  newamount: string;
  termsagreed = false
  check = false;
  currentbalance: any;
  upfrontpayment: any


  constructor(private http: HttpClient, 
    protected loanService: LoanService,
    public pinService: CheckpinService,
    private iab:InAppBrowser,
    private modalController: ModalController,
    private toastController: AlertController,
    public config: Config) { }

    ngOnInit() {

   this.calculateAmount()

  }

  terms() {
    console.log("ll");
    this.iab.create("https://www.euzzit.com/terms");
  }


  checkbox() {
    this.check = !this.check;
    console.log(this.check);
  }




  calNew() { 
    if (this.amount > this.euzzitextras) {
        this.amount = this.euzzitextras
    } else {
      this.calculatenewAmount()
    }
   
  }

  calculatenewAmount() {
    this.loanService.getLoanInformation().subscribe(async res => {
      console.log(res);
      this.euzzitextras = res.data[1].benefit;
     
      let p = 0.1
      // this.loandisbursement = (p * this.amount) - this.amount

     
    
      console.log('cccc', this.loandisbursement, ' and' , 'bbb ')

     
   
      console.log('this is the res data', this.euzzitextras)

      this.http.get<any>(`${this.config.api_url}/user/loans/loan-tenure`).subscribe(response=>{

     
        this.res = response.message[0]
        console.log('thi ', this.res)
        this.loandisbursement = this.amount -(10/100*this.amount)
  
        let principalpayment = this.amount/this.res.num_of_days
        // let dailyinterest = (this.res.rate/100) * this.amount

        let dailyinterest = (this.res.rate/100*this.amount)/this.res.num_of_days
        this.dailyrepayment = principalpayment + dailyinterest
        console.log('this is the res blob ',principalpayment, dailyinterest, this.dailyrepayment)

        let total = (this.res.rate/100)*this.amount
        let newloanballance = total + this.loandisbursement
        this.upfrontpayment = (10/100)*this.amount

        // let totalinterest = total * this.res.num_of_days
        console.log('ph', total)
        this.currentbalance = total + this.loandisbursement
        this.totalrepayment = this.amount + total
        console.log('total repayment',this.totalrepayment)
      }, error =>{
        console.log('oops', error.error.message )
        this.presentToast(error);
      } )
      });
    // console.log('this is the res');
  }

  async selectDays() {
    const modal = await this.modalController.create({
      component: DaysSelectPage,
      // cssClass: 'alert-modal',
      componentProps: { 
        message: ''
      }
    });
    return await modal.present();
  }





  
  calculateAmount() {
    this.loanService.getLoanInformation().subscribe(async res => {
      console.log(res);
      this.euzzitextras = res.data[1].benefit;
      this.amount = await res.data[1].benefit;
      let p = 0.1
      // this.loandisbursement = (p * this.amount) - this.amount

     
    
      console.log('cccc', this.loandisbursement, ' and' , 'bbb ')

      let iconArray = ["las la-wallet", "las la-clipboard-list", "las la-ambulance"]
      res.data.forEach((element, i) => {
        element.icon = iconArray[i];
      });
   
      console.log('this is the res data', this.euzzitextras)

      this.http.get<any>(`${this.config.api_url}/user/loans/loan-tenure`).subscribe(response=>{

     
        this.res = response.message[0]
        console.log('thi ', this.res)
        this.loandisbursement = this.amount -(10/100*this.amount)
  
        let principalpayment = this.amount/this.res.num_of_days
        // let dailyinterest = (this.res.rate/100) * this.amount

        let dailyinterest = (this.res.rate/100*this.amount)/this.res.num_of_days
        this.dailyrepayment = principalpayment + dailyinterest
        console.log('this is the res blob ',principalpayment, dailyinterest, this.dailyrepayment)

        let total = (this.res.rate/100)*this.amount
        let newloanballance = total + this.loandisbursement
        this.upfrontpayment = (10/100)*this.amount

        // let totalinterest = total * this.res.num_of_days
        console.log('ph', total)
        this.currentbalance = total + this.loandisbursement
        this.totalrepayment = this.amount + total
        console.log('total repayment',this.totalrepayment)
      }, error =>{
        console.log('oops', error.error.message )
        this.presentToast(error);
      } )
      });
    // console.log('this is the res');
  }

  agreeTerms(){
    this.termsagreed = !this.termsagreed
    console.log(this.termsagreed)
  }

  async applyLoan() {
    const pin = await this.pinService.runCheck('loanapply', 'full');
    if (pin) {
      return this.http.post<any>(`${this.config.api_url}/user/loans/apply`, {amount: this.amount, loan_tenure: this.res.num_of_days, agreed: this.termsagreed}, {
        headers: new HttpHeaders({ pin: pin }),
      }).subscribe(res=>{
       
        this.reso = res
        console.log('this is the loan success res',this.res)
      },  error =>{
        console.log('oops', error.error.message )
        this.presentToast(error);
      } )
    }
     

   
  }

  async presentToast(error) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: error.error.message,
      // buttons: ['Disagree', 'Agree'],
    });
    toast.present();
  }

}
