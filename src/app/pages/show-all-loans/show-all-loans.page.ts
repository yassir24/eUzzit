import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Config } from '../../providers/config';


@Component({
  selector: 'app-show-all-loans',
  templateUrl: './show-all-loans.page.html',
  styleUrls: ['./show-all-loans.page.scss'],
})
export class ShowAllLoansPage implements OnInit {

  res: any;

  constructor(private http: HttpClient, 
    private toastController: AlertController,
    public config: Config) { }

   ngOnInit() {
    // console.log('this is the res');
    return this.http.get<any>(`${this.config.api_url}/user/loans`).subscribe(res=>{
     
      this.res = res
      console.log('this is the res',this.res)
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
