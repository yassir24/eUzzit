import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TransactionService } from "src/app/services/transaction.service";
import {
  AlertController,
  NavController,
  // Events,
  ToastController,
  PopoverController,
} from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import {
  Contacts,
  Contact,
  ContactField,
  ContactName,
} from "@ionic-native/contacts/ngx";
import { Storage } from "@ionic/storage";
import { CheckpinService } from "../../services/checkpin.service";
import { CurrencyPipe } from "@angular/common";
import { InfoComponent } from "../../components/info/info.component";
import { WalletService } from "../../services/wallet.service";
import { async } from "@angular/core/testing";
import { EventsService } from "src/app/services/events.service";
@Component({
  selector: 'app-upgrade-account',
  templateUrl: './upgrade-account.page.html',
  styleUrls: ['./upgrade-account.page.scss'],
})
export class UpgradeAccountPage implements OnInit {

  upgradeAccountForm: FormGroup;
  upgradeAccountLifelineForm: FormGroup;
  submitted = false;
  rand: any = "9999" + Math.floor(Math.random() * 100000000000 + 1);
  amount: any;
  user: any;
  wallets: any = [];
  upgrademethod: any;
  expression;
  invalid;
  walletActionSheetOptions;
  successheader: string;
  successmessages: string;
  coins: any;
  success = false;
  selectedtype: string;

  constructor(
    public transactionService: TransactionService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public events: EventsService,
    private iab: InAppBrowser,
    public toastController: ToastController,
    // tslint:disable-next-line: deprecation
    public contacts: Contacts,
    private checkPinService: CheckpinService,
    private cp: CurrencyPipe,
    private popCtrl: PopoverController,
    private walletService: WalletService
  ) {
    this.upgradeAccountForm = formBuilder.group({
      wallet: ["", Validators.compose([Validators.required])],
      referrer_code: [""],
    });

    this.upgradeAccountLifelineForm = formBuilder.group({
      wallet: "main",
      lifeline: ["", Validators.compose([Validators.required])],
    });
  }

  async ngOnInit() {
    this.wallets = await this.walletService
      .getMyWallets()
      .then((wallets) => wallets);
    this.selectedtype = "walletupgrade";

    this.transactionService.getUpgradeData().subscribe((data) => {
      this.upgradeAccountForm.patchValue({
        amount: data.upgradeamount,
      });

      this.upgradeAccountLifelineForm.patchValue({
        amount: data.upgradeamount,
      });
    });

    this.upgrademethod = "walletupgrade";
  }

  terms() {
    console.log("ll");
    this.iab.create("https://euzzit.com/terms.html");
  }

  abs(n: number) {
    return Math.abs(n).toLocaleString("en-US");
  }

  async help() {
    let header = null;
    if (this.upgrademethod === "walletupgrade") {
      header = "<h3>Account Upgrade (&#8358;18,000)</h3>";
    } else {
      header = "<h3>Account Upgrade (LifeLine)</h3>";
    }
    const content = `<ul>
      <li>Earn 400,000 Zit after upgrade.</li>
      <li>Your Zit becomes an investment.</li>
      <li>Enjoy up to 3 years loan repayment plan with less than 1% monthly interest rate.</li>
      <li>Get free Upgrade Code called "LifeLine" to share with friends and family.</li>
    </ul>`;
    const pop = await this.popCtrl.create({
      component: InfoComponent,
      cssClass: "popover",
      componentProps: {
        content,
        header,
      },
    });
    await pop.present();
  }

  sendPostRequest() {}

  get p() {
    return this.upgradeAccountForm.value;
  }

  get f() {
    return this.upgradeAccountLifelineForm.value;
  }

  async onUpgradeAccount() {
    console.log(this.p.wallet);
    this.submitted = true;

    if (!this.upgradeAccountForm.valid) {
      this.submitted = false;
      return;
    } else {
      // tslint:disable-next-line:max-line-length
      const message = `The sum of ${this.cp.transform(
        18000,
        "",
        "",
        "1.2-2"
      )} will be deducted from your ${
        this.p.wallet
      } account. Do you want to proceed with this action?`;
      console.log(message);
      this.presentAlertConfirm(message);
    }
  }

  async onUpgradeLifelineAccount() {
    console.log(this.upgradeAccountForm.valid);
    this.submitted = true;
    if (!this.upgradeAccountLifelineForm.valid) {
      this.submitted = false;
      return;
    } else {
      const message =
        "You will be upgraded to a Premium user once we confirm your Lifeline Code. Do you want to proceed with this action?";
      console.log(message);
      this.presentAlertConfirm(message);
    }
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
    });
    toast.present();
  }

  segmentButtonClicked(selected: any) {
    this.upgrademethod = selected;
    this.selectedtype = selected;
  }

  async presentAlertConfirm(message: any) {
    const alert = await this.alertController.create({
      header: "Proceed with Account PREMIUM UPGRADE?",
      message,
      buttons: [
        {
          text: "cancel",
          handler: async () => {
            this.submitted = false;
            await this.alertController.dismiss();
          },
        },

        {
          text: "Proceed",
          handler: async () => {
            console.log(this.upgrademethod, "LOLÅ");
            this.alertController.dismiss();
            if (this.upgrademethod === "walletupgrade") {
              // activate
              this.transactionService.upgradeWallet(this.p).then(
                (res) => {
                  this.submitted = false;
                  this.successmessages = res.message;
                  this.successheader = "SUCCESS";
                  this.coins = res.data.coin_earned;
                  this.success = true;
                  // this.walletService.updateUser(res.data);
                  this.walletService.getMyWallets().then((data) => {
                    // var main = data.filter
                  });
                },
                (error) => {
                  let thisError = "";
                  this.submitted = false;
                  if (error.status >= 400 && error.status < 500) {
                    const errorData = error.error.errors;
                    if (errorData !== null && typeof errorData !== "object") {
                      thisError += error.error.errors;
                    } else {
                      for (let key in errorData) {
                        console.log(key);
                        thisError += errorData[key] + "\n";
                      }
                    }
                  }
                  this.presentToast(thisError);
                }
              );
            } else {
              await alert.remove();
              const reqData = {
                wallet: "lifeline",
                lifeline_code: this.f.lifeline,
              };
              console.log(reqData);
              this.transactionService.upgradeLifelineWallet(reqData).then(
                (data) => {
                  if (data.status === "error") {
                    this.presentToast(data.data.message);
                    this.submitted = false;
                  } else {
                    console.log(data, "lop");
                    this.submitted = false;
                    this.successmessages = data.message;
                    this.successheader = data.headerMsg;
                    this.coins =
                      data.coins || data.coin_earned || data.data.coin_earned;
                    this.success = true;
                  }
                },
                (error) => {
                  console.log(error);
                  this.presentToast(error.error.message);
                  this.submitted = false;
                }
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async pickContact() {
    const con = await this.contacts.pickContact();
    this.presentContactPick(con);
  }

  async presentContactPick(con: any) {
    const allphonenumbers = [];

    for (let i = 0; i < con.phoneNumbers.length; i++) {
      allphonenumbers.push({
        name: "radio" + i,
        type: "radio",
        label: "Phone",
        value: con.phoneNumbers[i].value,
        checked: i === 0 ? true : false,
      });
    }

    const alert = await this.alertController.create({
      header: "Select Phone number",
      inputs: allphonenumbers,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Confirm Ok");
          },
        },
      ],
    });
    await alert.present();
  }

}
