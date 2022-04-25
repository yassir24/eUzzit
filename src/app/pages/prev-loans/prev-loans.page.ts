import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Config } from '../../providers/config';
import { TransactionHistoryPage } from '../transaction-history/transaction-history.page';


@Component({
  selector: 'app-prev-loans',
  templateUrl: './prev-loans.page.html',
  styleUrls: ['./prev-loans.page.scss'],
})
export class PrevLoansPage implements OnInit {

  res: any;

  constructor(private http: HttpClient, 
    private modalController: ModalController,
    private toastController: AlertController,
    public config: Config) { }

   ngOnInit() {
    // console.log('this is the res');
    return this.http.get<any>(`${this.config.api_url}/user/loans`).subscribe(res=>{
     
      this.res = res.message
      console.log('this is the res',this.res)
    }, error =>{
      return this.presentToast(error)
    } )
  }

  async presentToast(error: any) {
    const toast = await this.toastController.create({
      header: 'Oops',
      message: error.error.message,
      // buttons: ['Disagree', 'Agree'],
    });
    toast.present();
  }


  async downloadPDR(item) {
    const modal = await this.modalController.create({
      component: TransactionHistoryPage,
      componentProps: { 
        item
      }
    });
    return await modal.present();
  }


}
