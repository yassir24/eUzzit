import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

import { BillerService } from "../../services/biller.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AlertController,
  NavController,
  ToastController,
  ModalController,
  // Events,
  PopoverController,
} from "@ionic/angular";
import { WalletService } from "../../services/wallet.service";
import { TransactionService } from "../../services/transaction.service";

import {
  Contacts,
  Contact,
  ContactField,
  ContactName,
} from "@ionic-native/contacts/ngx";
import { Storage } from "@ionic/storage";
import { formatCurrency } from "@angular/common";
import { CheckpinService } from "../../services/checkpin.service";
import { InfoComponent } from "../../components/info/info.component";

@Component({
  selector: 'app-select-bank',
  templateUrl: './select-bank.page.html',
  styleUrls: ['./select-bank.page.scss'],
})
export class SelectBankPage implements OnInit {
  message;

  sendMoneyForm: FormGroup;
  pageTitle: string;
  category: any;
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

  successheader: string;
  successmessages: string;
  success: boolean = false;
  submitted: boolean = false;
  coins: any;

  constructor(
    private modalController: ModalController,
     private events: EventsService,
     public billerService: BillerService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public toastController: ToastController,
    public walletService: WalletService,
    public pinService: CheckpinService,
    public transactionService: TransactionService,
    private popoverCtrl: PopoverController,
    public contacts: Contacts) { 
      this.sendMoneyForm = formBuilder.group({
        amount: ["", Validators.compose([Validators.required])],
        bank_id: ["", Validators.compose([Validators.required])],
        // entitycode: ['', Validators.compose([Validators.required])],
        account_no: ["", Validators.compose([Validators.required])],
        account_name: ["", Validators.compose([Validators.required])],
        wallet: ["", Validators.compose([Validators.required])],
      });
    console.log(this.message)
  }

  async ngOnInit() {
    this.pageTitle = "Send Money";
    this.category = "send";

    this.userinfo = this.storage.get("user");

    this.getLoadedData();
    this.wallets = await this.walletService.getMyWallets();
    console.log(this.wallets);
  }

  chooseBank(name) {
    // console.log(name.bank_name)
    return this.selectBank(name).then(()=>{
      this.modalController.dismiss()
    })
  }

  async selectBank(bank) {
    await this.events.publish('selectbank', {bank});
  }

  close(){
    this.modalController.dismiss()
   }

   getLoadedData() {
    this.loaded = false;

    this.transactionService.getBanks().subscribe((res) => {
      if ((res.status = "success")) {
        this.banks = res.data;
        console.log(this.banks)
        this.loaded = true;
      }
    });

    // this.transactionService.getBankHistory().subscribe(data => {
    //   this.banks = data.banks;
    //   for (const iterator of data.wallets) {
    //     if (iterator.slug !== 'main') {
    //       this.wallets.push(iterator);
    //     }
    //   }
    //   this.loaded = true;
    //  });
  }

  async help() {
    const header = `<h3>Send Money to Bank Account</h3>`;
    const content = `<ion-label color="primary"><p>Transfer money from your Extra Wallet to any Nigeria Bank Account and get Zit reward for it</p><ion-label>`;
    const pop = await this.popoverCtrl.create({
      component: InfoComponent,
      cssClass: "popover",
      componentProps: {
        content,
        header,
      },
    });
    await pop.present();
  }

  get p() {
    return this.sendMoneyForm.value;
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

  //0232990277
  //0237207500
  //2265353862
  //0241201885
  //0052232551

  getEntityCode(value: any): void {
    console.log(JSON.stringify(value));

    let bank = this.banks.find((x: { cbnCode: any }) => x.cbnCode == value);

    console.log(bank);

    this.sendMoneyForm.patchValue({
      entitycode: bank.bankCode,
    });
  }

  segmentButtonClicked(ev: any) {
    this.category = ev;
    if (ev == "send") {
      this.pageTitle = "Send Money";
    }
    if (ev == "saved") {
      this.pageTitle = "Sent History";
    }
    console.log("Segment changed", ev);
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

  changeTitle(title: string) {
    this.pageTitle = title;
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
      mode: "ios",
      animated: true,
      color: "dark",
    });
    toast.present();
  }

  // async presentModal(wallet: any, amount: string, data: any, numbers: any) {
  //   const modal = await this.modalController.create({
  //     component: ConfirmSendPage,
  //     animated: true,
  //     showBackdrop: true,
  //     backdropDismiss: true,
  //     cssClass: 'confirm-modal',
  //     componentProps: {
  //       wallet: wallet,
  //       amount: amount,
  //       receiver: data,
  //       transfernumbers: numbers
  //     }
  //   });
  //   return await modal.present();
  // }

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

  abs(n: number) {
    return Math.abs(n).toLocaleString("en-US");
  }

  async pinCheck() {
    console.log("LL");
    const result = await this.pinService.runCheck();
    return result === true;
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

  async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: msg.head,
      message: msg.body,
      buttons: ["OK"],
    });
    await alert.present();
  }

}
