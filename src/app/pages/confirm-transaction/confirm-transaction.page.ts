import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BillerService } from 'src/app/services/biller.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-confirm-transaction',
  templateUrl: './confirm-transaction.page.html',
  styleUrls: ['./confirm-transaction.page.scss'],
})
export class ConfirmTransactionPage implements OnInit {


  bankname; 
  bankaccountnumber; 
  amount; 
  error: any;
  narration;
  submitted = false;
  successheader: any;
  successmessages: any;
  success = false;
  coins: any;
  data;
  provider;
  constructor(private events: EventsService, 
    public billerService: BillerService,
    public toastController: ToastController,
    private modalController: ModalController) { 
  //   this.events.subscribe('confirmbank', (data: any) => {
  //     console.log('this is the data', data)
  // });
  }

  ngOnInit() {
    console.log(this.bankname, this.bankaccountnumber, this.amount, this.narration)
    console.log( 'from confirm transaction page', this.data)
  }

  close(){
    this.modalController.dismiss()
   }


  //  buyAirtime() {
  //    this.close()
  //   this.submitted = true;
  //   this.billerService
  //     .recharge(this.data)
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
  //  }


   async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
    });
    toast.present();
  }

}
