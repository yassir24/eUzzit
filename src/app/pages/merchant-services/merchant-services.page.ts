import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { TransactionService } from "src/app/services/transaction.service";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Storage } from "@ionic/storage";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: 'app-merchant-services',
  templateUrl: './merchant-services.page.html',
  styleUrls: ['./merchant-services.page.scss'],
})
export class MerchantServicesPage implements OnInit {

  submitted: boolean;
  upgrademethod;
  lifelinecodeno;
  loaded: boolean;
  lifelines: number;
  rows = [];
  limit = 10;
  search: string;
  error;
  loading;
  userinfo;
  help;
  successheader;
  successmessages;
  coins;
  loadingIndicator;
  reorderable;
  success;
  selectedtype: string;
  columns = [
    { prop: "name", name: "Service Name" },

    { prop: "created_at", name: "Date and Time Created" },
  ];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private clipboard: Clipboard,
    public storage: Storage,
    public loadingController: LoadingController
  ) {
    this.submitted = false;
    this.route.params.subscribe((val) => {});
    this.loaded = false;
    this.search = "";
  }

  ngOnInit() {
    this.submitted = false;
    this.selectedtype = "lifelinecodes";
    this.upgrademethod = "lifelinecodes";

    this.presentLoading();
    this.storage.get("user").then((val) => {
      this.transactionService
        .getServices({ identifier: val.phone })
        .subscribe((data) => {
          console.log(data);
          this.lifelines = data.data.length;
          this.rows = data.data;
        });
      this.temp = [...this.rows];
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please Wait",
      duration: 1000,
    });
    return await this.loading.present();
  }

  filterDatatable(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d) => {
      return d.lifeline.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
  segmentButtonClicked(selected: any) {
    if (selected === "lifelinecodes") {
      this.presentLoading();
      this.storage.get("user").then((val) => {
        console.log(val);
        this.transactionService
          .getServices({ identifier: val.phone })
          .subscribe((data) => {
            console.log(data);
            this.lifelines = data.data.length;
            this.rows = data.data;
          });
        this.temp = [...this.rows];
      });
    }
    this.upgrademethod = selected;
    this.selectedtype = selected;
  }
  async generate() {
    console.log("uyu");
    const data = {
      name: this.lifelinecodeno,
    };
    this.submitted = true;
    this.transactionService.createServices(data).subscribe(
      (res) => {
        this.submitted = false;
        this.lifelinecodeno = null;
        console.log(res);
        this.presentToast(res.message);
      },
      (error) => {
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
          this.submitted = false;
        }
      }
    );
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      mode: "ios",
      color: "dark",
      animated: true,
    });
    toast.present();
  }

  copy(row) {
    this.clipboard.copy(row);
    this.presentToast("Lifeline code copied");
  }

}
