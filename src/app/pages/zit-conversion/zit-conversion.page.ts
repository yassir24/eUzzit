import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { LoanService } from 'src/app/services/loan.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-zit-conversion',
  templateUrl: './zit-conversion.page.html',
  styleUrls: ['./zit-conversion.page.scss'],
})
export class ZitConversionPage implements OnInit {
  euzzitextras: any;
  coin: any;
  constructor(
    protected loanService: LoanService,
    public modalController: ModalController,
    public events: EventsService,
    private walletService: WalletService,
    private router: Router
  ) { }

  async ngOnInit() {
    let coin = await this.walletService.getMyCoin();
    console.log(this.coin);
    let x=[];x.push(coin);
    this.coin=Number(x[0].balance);
   this.callLoanInfo();
  }
  
    
  callLoanInfo() {
    this.loanService.getLoanInformation().subscribe(res => {
      console.log(res);
      let iconArray = ["las la-wallet", "las la-clipboard-list", "las la-ambulance"]
      res.data.forEach((element, i) => {
        element.icon = iconArray[i];
      });
      this.euzzitextras = res.data;
      console.log('this is the res data', res.data)
      });
  }
  
  open(page){
    console.log(page)
    if (page === 'Loan Access') {
      this.router.navigateByUrl('/loan')
    } else if (page === 'Insurance') {
      this.router.navigateByUrl('/insurance')
    } else if (page === 'Monthly Pension Allowance') {
      this.router.navigateByUrl('/monthly-pension')
    }
    // let navExt: NavigationExtras = {
    //   queryParams: {
    //     page: page
    //   }
    // }
  
    // this.router.navigate(["zit-status"], navExt);
  }
  
  arrayOne(n: number): any[] {
    return Array(n);
  }

}
