import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";
// import { DatatableComponent } from "@swimlane/ngx-datatable";
import { TransactionService } from "src/app/services/transaction.service";
import { Clipboard } from "@ionic-native/clipboard/ngx";

@Component({
  selector: 'app-lifeline',
  templateUrl: './lifeline.page.html',
  styleUrls: ['./lifeline.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LifelinePage implements OnInit {

  help;
  successheader;
  successmessages;
  coins;
  loadingIndicator;
  reorderable;
  submitted: boolean;
  upgrademethod;
  lifelinecodeno;
  success;
  loaded: boolean;
  lifelines: number;
  rows = [];
  limit = 10;
  search: string;

  selectedtype: string;
  columns = [
    { prop: "code", name: "Lifeline Code" },
    { prop: "status_text", name: "Status" },
    { prop: "full_name", name: "Wallet ID" },
    { prop: "date", name: "Date and Time" },
  ];
  temp = [];
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private clipboard: Clipboard
  ) {
    this.route.params.subscribe((val) => {
      this.transactionService.lifelinelist().subscribe((data) => {
        this.lifelines = data.data.data.length;
        this.rows = data.data.data;
        console.log(data.data.data);
      });
      this.temp = [...this.rows];
    });
    this.submitted = false;
    this.route.params.subscribe((val) => {});
    this.loaded = false;
    this.search = "";
  }

  ngOnInit() {
    this.submitted = false;
    this.selectedtype = "lifelinecodes";
    this.upgrademethod = "lifelinecodes";

    this.transactionService.lifelinelist().subscribe((data) => {
      this.lifelines = data.data.data.length;
      this.rows = data.data.data;
      console.log(data.data.data);
    });
    this.temp = [...this.rows];
  }

  // filterDatatable(event) {
  //   const val = event.target.value.toLowerCase();
  //   const temp = this.temp.filter((d) => {
  //     return d.lifeline.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
  //   this.rows = temp;
  //   this.table.offset = 0;
  // }
  segmentButtonClicked(selected: any) {
    this.upgrademethod = selected;
    this.selectedtype = selected;
  }
  async generate() {
    console.log("uyu");
    const data = {
      codes: this.lifelinecodeno,
    };
    this.submitted = true;
    this.transactionService.generatelifelinecode(data).subscribe((res) => {
      this.transactionService.lifelinelist().subscribe((data2) => {
        this.lifelines = data2.data.data.length;
        this.rows = data2.data.data;
        console.log(data2.data.data);
      });
      this.submitted = false;
      this.lifelinecodeno = null;
      console.log(res);
      this.presentToast(!res.message ? res.data : res.message);
    });
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
