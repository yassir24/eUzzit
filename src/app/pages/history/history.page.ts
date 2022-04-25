import { Component, OnInit } from "@angular/core";
import { WalletService } from "../../services/wallet.service";
import { TransactionService } from "../../services/transaction.service";
import { ModalController, 
  // Events, 
  NavController } from "@ionic/angular";
// import { TransactionDetailsPage } from "../../modal/transaction-details/transaction-details.page";
import { ActivatedRoute } from "@angular/router";
import { EventsService } from "src/app/services/events.service";
import { HistoryDetailsPage } from "../history-details/history-details.page";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  tab: any;
  wallets: any;
  transactions: any;
  customActionSheetOptions;
  WalletPage;

  extratransactions: any;

  allTransactions: any;

  lastTransactionNumber: number = 5;

  constructor(
    private route: ActivatedRoute,
    private walletService: WalletService,
    private transactionService: TransactionService,
    public modalController: ModalController,
    public events: EventsService,
    public nav: NavController
  ) {
    this.route.params.subscribe((val) => {
      this.callWallet();

      this.transactionService.getTransactionHistory2().subscribe((res) => {
        console.log(res);
        let userHistory = [];
        if (res.status == "success") {
          res.data.map((item) => {
            if (item.name === "main") {
              userHistory = [...userHistory, ...item.history.data];
            }
            if (item.name === "coin") {
              userHistory = [...userHistory, ...item.history.data];
            }
            const newArray = userHistory.sort(function (a: any, b: any) {
              const firstDate: any = new Date(a.created_at);
              const secondDate: any = new Date(b.created_at);
              return firstDate - secondDate;
            });
            this.allTransactions = newArray.reverse();
            console.log(newArray.length);
            console.log(newArray);
          });

          this.transactions = this.allTransactions.slice(
            0,
            this.lastTransactionNumber
          );
          for (var i = 0; i < this.transactions.length; i++) {
            this.transactions[i].balaamountnce = Number(
              this.transactions[i].amount
            ).toFixed(2);
          }
          console.log(this.transactions);
        }
      });
    });
    this.lastTransactionNumber = 5;
    this.events.subscribe("login", (data) => {
      console.log(data);
      this.callWallet();
    });

    this.events.subscribe("transfer", (data) => {
      this.callWallet();
      console.log("%ci just opened", "color: red; font-size: 50px;");
    });
  }

  async ngOnInit() {
    this.tab = "main";
    await this.callWallet();

    this.transactionService.getTransactionHistory2().subscribe((res) => {
      console.log(res);
      let userHistory = [];
      if (res.status == "success") {
        res.data.map((item) => {
          if (item.name === "main") {
            userHistory = [...userHistory, ...item.history.data];
          }
          if (item.name === "coin") {
            userHistory = [...userHistory, ...item.history.data];
          }
          const newArray = userHistory.sort(function (a: any, b: any) {
            const firstDate: any = new Date(a.created_at);
            const secondDate: any = new Date(b.created_at);
            return firstDate - secondDate;
          });
          this.allTransactions = newArray.reverse();
          console.log(newArray.length);
          console.log(newArray);
        });

        this.transactions = this.allTransactions.slice(
          0,
          this.lastTransactionNumber
        );
        for (var i = 0; i < this.transactions.length; i++) {
          this.transactions[i].balaamountnce = Number(
            this.transactions[i].amount
          ).toFixed(2);
        }
        console.log(this.transactions);
      }
    });
  }

  async ngAfterViewInit() {
    console.log("%ci just opened", "color: red; font-size: 50px;");
  }

  updateTransactionsList() {
    this.transactions = this.allTransactions.slice(
      0,
      this.lastTransactionNumber
    );
  }

  ngOnDestroy() {
    console.log("%ci just destroy", "color: yellow; font-size: 50px;");
  }

  refresh() {
    // document.location.reload();
    this.ngOnInit();
  }

  callWallet() {
    this.walletService.getMyWallets().then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        data[i].balance = Number(data[i].balance).toFixed(2);
      }
      data.map((item) => {
        if (item.slug == "main") {
          this.wallets = item.balance;
        }
      });
    });
  }

  loadMore() {
    this.lastTransactionNumber += 5;
    this.updateTransactionsList();
  }

  async presentTransaction(transaction: any) {
    const modal = await this.modalController.create({
      component: HistoryDetailsPage,
      animated: true,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: "confirm-modal",
      componentProps: {
        data: transaction,
      },
    });
    return await modal.present();
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  openHistory() {
    this.nav.navigateForward("/transactions");
  }

  goToExtraWallet() {
    this.nav.navigateForward("/merchant");
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  abs(n: number) {
    return Math.abs(n).toLocaleString("en-US");
  }

}
