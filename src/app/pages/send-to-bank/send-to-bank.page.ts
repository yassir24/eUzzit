import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { ChooseWalletPage } from '../choose-wallet/choose-wallet.page';
import { ConfirmTransactionPage } from '../confirm-transaction/confirm-transaction.page';
import { SelectBankPage } from '../select-bank/select-bank.page';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { TransactionService } from 'src/app/services/transaction.service';
import { SuccessPage } from '../success/success.page';

@Component({
  selector: 'app-send-to-bank',
  templateUrl: './send-to-bank.page.html',
  styleUrls: ['./send-to-bank.page.scss'],
})
export class SendToBankPage implements OnInit {
  sendMoneyForm: FormGroup;

  bank = 'Select bank';
  accountnumber: number;
  amount: number;
  narration: string;

  pickedcontact: any;
  wallets: any = [];
  userinfo: any;
  loaded: boolean = false;
  error: string;
  submitSend: boolean = false;
  banks: any;
  accountnamevalid: boolean = false;
  retry: boolean = false;
  accountNumber: any;
  account_name: any;
  bank_id: any;
  userprofile: any;
  successheader: string;
  successmessages: string;
  success: boolean = false;
  submitted: boolean = false;
  coins: any;
  buttontitle = 'Choose Account';
  bankcode: any

 constructor(
     public modalController: ModalController,
     public toastController: AlertController,
     public alertController: AlertController,
     public storage: Storage,
     public transactionService: TransactionService,
     public formBuilder: FormBuilder,
     private events: EventsService) { 
      this.sendMoneyForm = formBuilder.group({
        amount: ["", Validators.compose([Validators.required])],
        bank_id: ["", Validators.compose([Validators.required])],
        // entitycode: ['', Validators.compose([Validators.required])],
        account_no: ["", Validators.compose([Validators.required])],
        account_name: ["", Validators.compose([Validators.required])],
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
      this.events.subscribe('selectbank', (data: any) => {
        console.log('this is the bank data', data.bank.id)
        this.bank = data.bank.bank_name;
        this.bankcode = data.bank.bank_code;
        this.sendMoneyForm.patchValue({
          bank_id: data.bank.id
        });
    });

    this.getUser()
  

    
     }

     async getUser() {
      this.userprofile = await this.storage.get("user");
     }

  ngOnInit() {
  }

  async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: msg.head,
      message: msg.body,
      buttons: ["OK"],
    });
    await alert.present();
  }

  validateSend() {
    if (!this.sendMoneyForm.valid) {
      this.submitSend = false;
      return;
    } else {
      this.presentAlertConfirm();
      return;
    }

  }

  
  async presentAlertConfirm() {
    let wallet = this.wallets.find(
      (x: { slug: any }) => x.slug == this.p.wallet
    );

    let messageBody: string = "Account Name: " + this.p.account_name + "<br />";
    messageBody += "Account Number: " + this.p.account_no + "<br />";
    messageBody += "Amount: &#8358;" + this.p.amount + "<br />";
    // messageBody += "Total: &#8358;" + this.p.amount;

    const alert = await this.alertController.create({
      header: "Confirm Transaction!",
      message: messageBody,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.submitSend = false;
          },
        },
        {
          text: "Okay",
          handler: async () => {
            this.submitSend = true;
            this.transactionService
              .sendMoney(this.p)
              .then(
                (res) => {
                  this.submitSend = false;
                  console.log(res);
                  // Object { mac: "5F708A33C5D838C6B12347F4EE7F7D1ACC3145E99EB62409423E599BBFD1668E9CABAFBC827DA80002205E1867692A40BC88117A56D4927BB6DB594C125151B6", transactionDate: "20/Sep/2019 12:21:46", transferCode: "14531568978544", pin: "", responseCode: "90000", responseCodeGrouping: "SUCCESSFUL", coins: 1000, message: "Bank Transfer to GTB|048XXXX461|OGHENEKARO  ORAKPOYOVWURU Successful!" }
                  if (res.status == "success") {
                    let s = this.p.account_no.split("");

                    this.successmessages = res.message;
                    this.successheader = "SUCCESS";
                    this.submitSend = false;
                    this.coins = res.data.coin_earned;
                    this.success = true;
                    this.showSuccess(res.message, res.data.coin_earned )

                    console.log(res.message);
                  } else if (res.responseCodeGrouping == "PENDING") {
                    this.presentAlert({
                      head: "Bank Transfer Pending!",
                      body: res.message,
                    });
                  } else if (res.responseCodeGrouping == "FAILED") {
                    this.presentAlert({
                      head: "Bank Transfer Failed!",
                      body: res.message,
                    });
                  }

                  console.log(res);
                },
                (error) => {
                  this.error = "";
                  this.submitSend = false;

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

                    this.presentToast(this.error);
                  }
                }
              )
              .finally(() => (this.submitSend = false));
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmBank() {
    await this.events.publish('confirmbank', {});
  }

  get p() {
    return this.sendMoneyForm.value;
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
      message: error,
      // duration: 5000,
      mode: "ios",
      // animated: true,
      // color: "dark",
    });
    toast.present();
  }

  async presentErrorAlert(head: any, bodymessage: any) {
    const alert = await this.alertController.create({
      subHeader: head,
      message: bodymessage,
      buttons: ["OK"],
    });
    this.submitSend = false;

    await alert.present();
  }


  loadAccountName() {
    console.log("Account", this.p);
    // if account is not 10 digit, return false
    if (this.p.account_no.length != 10) {
      console.log("account number is short", this.p.account_no.length);
      this.accountnamevalid = false;
      return;
    }

    // if account is not 10 digit, return false
    if (this.p.bank_id.length == 0) {
      console.log("bank code issues");
      this.accountnamevalid = false;
      return;
    }

    if (
      this.accountNumber === this.p.account_no &&
      this.bank_id === this.p.bank_id
    ) {
      return;
    }

    this.submitSend = true;
    this.retry = false;
    this.accountnamevalid = false;

    this.transactionService
      .getAccountName(this.p.bank_id, this.p.account_no)
      .subscribe(
        (data) => {
          console.log(data);
          this.accountNumber = this.p.account_no;
          if (data == null) {
            this.presentToast(
              "Account Name could not be retrieved. Try again!"
            );
            this.submitSend = false;
            this.retry = true;
            console.log("Account Name could not be retrieved. Try again!");
          } else if (data.error !== undefined) {
            this.presentErrorAlert(
              "Error code " + data.error.code,
              data.error.message + " "
            );
            this.retry = true;
            console.log(
              "Error code " + data.error.code,
              data.error.message + " "
            );
          } else {
            console.log(data.data.accountName);
            this.sendMoneyForm.patchValue({
              account_name: data.data.accountName,
            });
            this.accountnamevalid = true;
            // this.accountNumber = this.p.account_no;
            this.submitSend = false;
            this.retry = false;
          }
        },
        (error) => {
          console.log("this is the error here", error.error);
          this.presentToast(error.error.message);
          this.accountNumber = this.p.account_no;
          this.submitSend = false;
          this.retry = false;
        }
      );
  }

  async presentModal(u) {
    const modal = await this.modalController.create({
      component: SelectBankPage,
      // cssClass: 'alert-modal',
      componentProps: { 
        message: u
      }
    });
    return await modal.present();
  }
  async confirmModal(u) {
    const modal = await this.modalController.create({
      component: ConfirmTransactionPage,
      componentProps: { 
        bankname: this.bank, bankaccountnumber: this.accountnumber, amount: this.amount, narration: this.narration
      }
    });
    return await modal.present();
  }

  async chooseWallet() {
    const modal = await this.modalController.create({
    component: ChooseWalletPage,
    // componentProps: input,
    cssClass: 'bottom-model',
    
    });
  
    await modal.present();
  
  }

  

}
