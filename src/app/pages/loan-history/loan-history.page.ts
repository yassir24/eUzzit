import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Config } from '../../providers/config';

@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.page.html',
  styleUrls: ['./loan-history.page.scss'],
})
export class LoanHistoryPage implements OnInit {

  res: any;

  constructor(private http: HttpClient, 
    private toastController: AlertController,
    public config: Config) { }

   ngOnInit() {
    // console.log('this is the res');
    return this.http.post<any>(`${this.config.api_url}/user/loans/transactions`, {loan_id: 93454319873}).subscribe(res=>{
     
      this.res = res
      console.log('this is the res',this.res)
    }, error =>{
      console.log('oops', error.error.message )
      this.presentToast(error.error.message);
    } )
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
