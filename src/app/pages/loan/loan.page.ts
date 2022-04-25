import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Config } from '../../providers/config';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.page.html',
  styleUrls: ['./loan.page.scss'],
})
export class LoanPage implements OnInit {

  res: any;
  isloan = false;

  constructor(private http: HttpClient,
    private router:Router, 
    private toastController: AlertController,
    public config: Config) { }

   ngOnInit() {
    // console.log('this is the res');
    return this.http.get<any>(`${this.config.api_url}/user/loans/active-loan`).subscribe(res=>{
     
      this.res = res.message
      if (this.res.length > 0) {
        this.isloan = true
      } else {
        this.isloan = false
      }
      console.log('this is the res',this.res)
    } )
    // return this.http.post<any>(`${this.config.api_url}/user/loans/apply`, {amount: 1000, loan_tenure: 400, agreed: true}).subscribe(res=>{
     
    //   this.res = res
    //   console.log('this is the res',this.res)
    // } )

    // , error =>{
    //   console.log('oops', error.error.message )
    //   this.presentToast(error.error.message);
    // }
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: error,
      // buttons: ['Disagree', 'Agree'],
    });
    toast.present();
  }

  accessLoan() {
    this.router.navigateByUrl('/access-loan')
  }
  viewLoan() {
    this.router.navigateByUrl('/loan-payment')
  }
  hisroryLoan() {
    this.router.navigateByUrl('/prev-loans')
  }

}
