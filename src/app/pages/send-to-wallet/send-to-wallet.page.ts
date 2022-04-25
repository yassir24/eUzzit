import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { ChooseWalletPage } from '../choose-wallet/choose-wallet.page';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { TransactionService } from 'src/app/services/transaction.service';
import { SuccessPage } from '../success/success.page';


@Component({
  selector: 'app-send-to-wallet',
  templateUrl: './send-to-wallet.page.html',
  styleUrls: ['./send-to-wallet.page.scss'],
})
export class SendToWalletPage implements OnInit {

  buttontitle = 'Choose Account';
  sendMoneyForm: FormGroup;

  submitSend = false;
  walletHolder: any;


  error: string;
  validated: boolean = false;

  successheader: string;
  successmessages: string;
  success: boolean = false;
  coins: any;

  constructor(private modalController: ModalController,  
    private toastController: AlertController,
     public transactionService: TransactionService,   public formBuilder: FormBuilder,
    private events: EventsService ) { 
    this.sendMoneyForm = formBuilder.group({
      to_user: ["", Validators.compose([Validators.required])],
      // userName: ['', Validators.compose([Validators.required])],
      amount: ["", Validators.compose([Validators.required])],
      wallet: ["", Validators.compose([Validators.required])],
    });

    this.events.subscribe('selectwallet', (data: any) => {
      console.log('this is the wallet data', data.wallet.slug)
      // this.pageTitle = data.title
      this.buttontitle = data.wallet.slug + ' Account'
      this.sendMoneyForm.patchValue({
        wallet: data.wallet.slug,
      });
  });
  }

  ngOnInit() {
  }

  async chooseWallet() {
    const modal = await this.modalController.create({
    component: ChooseWalletPage,
    // componentProps: input,
    cssClass: 'bottom-model',
    
    });
  
    await modal.present();
  
  }

  get p() {
    return this.sendMoneyForm.controls;
  }


  validateSend() {
    if (!this.sendMoneyForm.valid) {
      this.submitSend = false;
      console.log(
        "%c this is where the payload for submit is",
        "color: red; font-size: 1.7em"
      );
      return;
    } else {
      this.submitSend = true;
      this.transactionService
        .makeWalletTransfer(
          this.p.to_user.value,
          this.p.wallet.value,
          this.p.amount.value
        )
        .then(
          (res) => {
            console.log(
              "%c this is where the payload for submit is",
              "color: red; font-size: 1.7em"
            );
            if ((res.status = "success")) {
              this.successmessages = res.message;
              this.successheader = "SUCCESS";
              this.submitSend = false;
              this.coins = res.data.coin_earned;
              this.success = true;

              this.showSuccess(res.message, res.data.coin_earned )


            }
          },
          async (error) => {
            this.error = "";
            this.submitSend = false;

            console.log(error);

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
              await this.presentToast(this.error);
            }
          }
        )
        .finally(() => (this.submitSend = false));
    }
  }
  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      // duration: 5000,
    });
    toast.present();
  }

  verifyWallet() {
    console.log("working");
    if (this.p.to_user.value.length < 1) {
      return;
    }

    this.submitSend = true;

    this.transactionService
      .verifyWallet({ user_identifier: this.p.to_user.value })
      .subscribe(
        (data) => {
          console.log(data);
          if (data.status === "success") {
            this.walletHolder =
              data.data.first_name + " " + data.data.last_name;
            this.submitSend = false;
          }
        },
        (error) => {
          console.log(error);
          this.presentToast(error.error.message);
          this.submitSend = false;
        }
      );
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

}
