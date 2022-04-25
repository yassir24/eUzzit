import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, ModalController, ToastController } from "@ionic/angular";
import { BillerService } from "../../services/biller.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/internal/operators/first";
import { WalletService } from "../../services/wallet.service";
import { CheckpinService } from "../../services/checkpin.service";
import { Storage } from "@ionic/storage";
import { TouchID } from "@ionic-native/touch-id/ngx";
import { DatePipe } from "@angular/common";
import { EventsService } from "src/app/services/events.service";

@Component({
  selector: 'app-internet-plans',
  templateUrl: './internet-plans.page.html',
  styleUrls: ['./internet-plans.page.scss'],
})
export class InternetPlansPage implements OnInit {

  shortname: any = null;
  products: any;
  cabledata: any;
  service: any;
  data: any;
  title: string;
  listed: boolean = true;
  item: any = null;
  mainitem: any;
  packages: any;
  walletActionSheetOptions: any;
  CableTVForm: FormGroup;
  subtitle: string;
  wallets: any = [];
  is_success: any;
  selected: any = null;
  error: string;
  successheader: string;
  successmessages: string;
  success: boolean = false;
  coins: any;
  submitted: boolean = false;
  accountNameValid: boolean = false;
  service_id: any;
  itemsdata: any;
  cableid;
  itemsloaded: boolean = false;
  internetForm: FormGroup;
  id: any;

  showError: boolean;

  error_msg: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private events: EventsService,
    public formBuilder: FormBuilder,
    private modalcontroller: ModalController,
    public alertController: AlertController,
    public toastController: AlertController,
    public walletService: WalletService,
    private billerService: BillerService,
    private pinService: CheckpinService,
    public storage: Storage
  ) {

  }

  async ngOnInit() {
    console.log(this.id)
    this.getPaymentItems();

   
  }

  getPaymentItems() {
    this.billerService.getInternetBundles(this.id).subscribe((data) => {

      console.log(this.service_id)
      console.log('this is the output',data)
      if (data.error != null) {
        this.showError = true;
        this.error_msg = data.error.message;
      }

      this.itemsdata = data.data.products;
      if (this.itemsdata) {
        this.showError = false;
        this.storage.get("user").then((val) => {
          this.internetForm.patchValue({
            phone: val.phone,
          });
        });
      }
      this.itemsloaded = true;
    });
  }

  get p() {
    return this.CableTVForm.value;
  }

  customActionSheetOptions: any = {
    header: "Select a Package",
    subHeader: "Select a Package to Subscribe",
  };

  // walletActionSheetOptions: any = {
  //   header: 'Choose Wallet',
  //   subHeader: 'Select a Wallet to Use'
  // };

  // compareWith = this.compareWithFn;

  compareWithFn = (o1: any, o2: any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  change(value) {
    console.log(value);
    if (value.length == 10) {
      this.verifyUser2(value);
    } else {
      this.submitted = true;
      this.accountNameValid = false;
    }
  }

  closeModal() {
    this.modalcontroller.dismiss()
  }

  verifyUser2(value) {
    console.log("this is calling");
    if (value.length < 1) {
      return;
    }
    this.submitted = true;
    this.billerService.verifyElectricity(this.service_id, value).subscribe(
      (payload) => {
        console.log(payload);
        this.CableTVForm.patchValue({
          customername: payload.data.name,
          customernumber: payload.data.customernumber,
        });
        this.accountNameValid = true;
        // this.accountNumber = value_no;
        this.submitted = false;
        // this.retry = false;
      },
      (error) => {
        console.log(error);
        this.presentToast(
          "Could not verify Decoder number. Check that your Decoder number is correct or check your internet connection"
        );
        this.CableTVForm.patchValue({
          customername: "",
          customernumber: "",
        });

        this.accountNameValid = false;
        this.submitted = false;
      }
    );
  }

  verifyUser() {
    console.log("this is calling");
    if (this.p.account.length < 1) {
      return;
    }
    this.submitted = true;
    this.billerService
      .verifyElectricity(this.service_id, this.p.account)
      .subscribe(
        (payload) => {
          console.log(payload);
          this.CableTVForm.patchValue({
            customername: payload.data.name,
            customernumber: payload.data.customernumber,
          });
          this.accountNameValid = true;
          // this.accountNumber = this.p.account_no;
          this.submitted = false;
          // this.retry = false;
        },
        (error) => {
          console.log(error);
          this.presentToast(
            "Could not verify Decoder number. Check that your Decoder number is correct or check your internet connection"
          );
          this.CableTVForm.patchValue({
            customername: "",
            customernumber: "",
          });

          this.accountNameValid = false;
          this.submitted = false;
        }
      );
  }


  async setCableProduct(product) {
    await this.events.publish('setinternetproduct', {product: product});
  }

  chooseProduct(item: any) {
    this.setCableProduct(item).then(()=>{
      this.modalcontroller.dismiss()
      this.listed = false;
      this.item = item;
      this.title = item.name;
      this.subtitle = item.name + " " + " &#8358 " + item.Amount;
      this.selected = item;
  
      console.log(this.item);
    })
  }



  async onRequestCable() {
    if (!this.CableTVForm.valid) {
      return;
    } else {
      this.submitted = true;
      this.billerService
        .buyCable({ ...this.p, service_id: this.service.id })
        .then(
          async (res) => {
            console.log(res);
            if (res.status == "success") {
              let date = new Date();
              this.successmessages = `${res.message}`;
              this.successheader = `SUCCESS`;
              this.coins = `${res.data.coin_earned}`;
              this.success = true;
              this.submitted = false;
            } else {
              this.presentToast(res.message);
            }
          },
          (error) => {
            console.log(JSON.parse(JSON.stringify(error)));
            this.error = "";
            this.submitted = false;

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
        .finally(() => (this.submitted = false));
    }
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      mode: "ios",
      // animated: true,
      // color: "dark",
      // duration: 5000,
    });
    await toast.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: "Success!",
      message: msg,
      buttons: ["OK"],
    });
    await alert.present();
  }

  showList() {
    this.packages = null;
    this.listed = true;
    this.submitted = false;
    this.CableTVForm.reset();
  }

  selectPackage(selected_package: any) {
    const selected = this.packages.find(
      (x: { code: any }) => x.code === selected_package.detail.value
    );

    this.subtitle =
      this.item.name +
      " " +
      selected.name +
      " &#8358 " +
      (selected.code === this.item.code
        ? selected.price
        : selected.price + this.item.price);
    this.selected = selected;
    this.selected.price =
      this.selected.price !== this.item.price
        ? this.selected.price + this.item.price
        : this.selected.price;
  }

  async presentAlertConfirm() {
    let wallet = this.wallets.find(
      (x: { slug: any }) => x.slug == this.p.wallet
    );
    console.log(this.service, this.products);

    let messageBody: string = "Service: " + this.subtitle + "<br />";
    messageBody += "Decoder No: " + this.p.account + "<br />";
    messageBody += "Owner: " + this.p.customername + "<br />";
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
            // this.submitSend = false;
          },
        },
        {
          text: "Okay",
          handler: async () => {
            this.onRequestCable();
          },
        },
      ],
    });
    await alert.present();
  }

  abs(n: number) {
    return Math.abs(n).toLocaleString("en-US");
  }

  // async presentAlertConfirm(messagemsg: string, headermsg: string, data: any) {
  //   const alert = await this.alertController.create({
  //     header: headermsg,
  //     message: messagemsg,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           this.submitted = false;
  //         }
  //       }, {
  //         text: 'Proceed!',
  //         cssClass: 'primary',
  //         handler: () => {
  //           this.billerService.vendCable(
  //             this.data.shortname,
  //             (data.customerName == null) ? data.firstName+' ' + data.lastName : data.customerName,
  //             (data.customerNumber == null) ? data.smartCardNumber : data.customerNumber,
  //             data.invoicePeriod,
  //             this.selected==null ? this.p.amount.value : this.selected.price,
  //             this.p.wallet.value)
  //           .pipe(first())
  //           .subscribe(
  //             async data => {
  //               if (data.ResponseMessage === 'SUCCESS') {
  //                 this.successheader = 'Subscription Successful!';
  //                 this.successmessages = 'Transaction Reference' + data.vendData.exchangeReference + '<br />';

  //                 this.successmessages += (data.returnMessage != null) ? data.returnMessage : this.subtitle + '<br /> Subscription for ' + this.p.smartcard.value + ' successful!';
  //                 this.coins = data.data.coin_earned;

  //               } else {
  //                 this.submitted = false;
  //                 await this.presentToast('Transaction not successful');
  //               }
  //             }
  //           );
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  arrayOne(n: number): any[] {
    return Array(n);
  }

}
