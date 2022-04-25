import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-choose-wallet',
  templateUrl: './choose-wallet.page.html',
  styleUrls: ['./choose-wallet.page.scss'],
})
export class ChooseWalletPage implements OnInit {

  extra: any;
  main: any;
  loadingwallet = true

  constructor(public walletService: WalletService, 
    private modalController: ModalController,
    public events: EventsService) { }

  ngOnInit() {
    this.walletService.getMyWallets().then((res) => {
      this.extra = res[0];
      this.main = res[1];
      this.loadingwallet = false
      console.log(this.extra, this.main)
    });
  }

  confirmWallet(wallet) {
    this.selectWallet(wallet).then(()=>{
      this.close()
    })
  }


  async selectWallet(wallet) {
    await this.events.publish('selectwallet', {wallet});
  }

  close(){
    this.modalController.dismiss()
   }

}
