import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AlertController,
  NavController,
  ToastController,
  PopoverController,
  // Events,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { TransactionService } from "../../services/transaction.service";
import { CheckpinService } from "../../services/checkpin.service";
import { CurrencyPipe } from "@angular/common";
import { InfoComponent } from "../../components/info/info.component";
import { WalletService } from "../../services/wallet.service";
import { EventsService } from "src/app/services/events.service";
@Component({
  selector: 'app-activate-wallet',
  templateUrl: './activate-wallet.page.html',
  styleUrls: ['./activate-wallet.page.scss'],
})
export class ActivateWalletPage implements OnInit {

  activateAccountForm: FormGroup;
  submitted = false;
  rand: any = "9999" + Math.floor(Math.random() * 100000000000 + 1);
  amount: any;
  user: any;
  wallets: any = [];
  compareWith;
  walletActionSheetOptions;
  successheader: string;
  successmessages: string;
  coins: any;
  success = false;

  // customActionSheetOptions: any = {
  //   header: 'Choose Wallet',
  //   subHeader: 'Select wallet to pay from'
  // };

  constructor(
    public transactionService: TransactionService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public storage: Storage,
    private popCtrl: PopoverController,
    public events: EventsService,
    public toastController: ToastController,
    private cp: CurrencyPipe,
    private walletService: WalletService,
    private pinService: CheckpinService
  ) {
    this.activateAccountForm = formBuilder.group({
      wallet: ["", Validators.compose([Validators.required])],
      // description: ['']
    });
  }

  ngOnInit() {
    this.storage.get("user").then((val: any) => {
      this.user = val;
    });

    this.walletService.getMyWallets().then((data) => {
      this.wallets = data;
    });
  }

  sendPostRequest() {
    // console.log(header);
  }

  async help() {
    const header = "<h3>Account Activation (&#8358;500)</h3>";
    const content = `<ul>
      <li>Earn 5,000 Zit</li>
      <li>Enjoy Free Life Insurance Cover and Access Loan with less than 1% monthly interest rate.</li>
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

  async pinCheck() {
    const result = await this.pinService.runCheck();
    return result === true;
  }

  get p() {
    return this.activateAccountForm.value;
  }

  async onActivateAccount() {
    this.submitted = true;

    if (!this.activateAccountForm.valid) {
      this.submitted = false;
      return;
    } else {
      // tslint:disable-next-line: max-line-length
      const message = `The sum of &#8358; ${this.cp.transform(
        500,
        "",
        "",
        "1.2-2"
      )} will be deducted from your ${
        this.p.wallet
      } account. Do you want to proceed with this action?`;
      this.presentAlertConfirm(message);
    }
  }

  abs(n: number) {
    return Math.abs(n).toLocaleString("en-US");
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
      mode: "ios",
      color: "dark",
      animated: true,
    });
    toast.present();
  }

  async presentAlertConfirm(message: any) {
    const alert = await this.alertController.create({
      header: "Proceed with Account Activation?",
      message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.submitted = false;
          },
        },
        {
          text: "Proceed",
          handler: async () => {
            // activate
            //let check = await this.pinCheck();
            //console.log(check);

            this.transactionService.activateWallet(this.p).then(
              (res) => {
                this.submitted = false;

                this.events.publish("transfer", {action: "Transfer Success!"});
                this.successmessages = res.message;
                this.successheader = "SUCCESS";
                this.coins = res.data.coin_earned;
                this.success = true;
                //this.walletService.updateUser(res.data);
                this.walletService.getMyWallets().then((data) => {
                  // var main = data.filter
                });
              },
              (error) => {
                let thisError = "";
                this.submitted = false;

                console.log(
                  "does not work here.. let me doe this to you but maybe I am not going to be the way that"
                );
                console.log(error);

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
          },
        },
      ],
    });

    await alert.present();
  }

}
