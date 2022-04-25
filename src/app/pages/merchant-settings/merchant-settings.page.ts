import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, PopoverController } from "@ionic/angular";
import { InfoComponent } from "../../components/info/info.component";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-merchant-settings',
  templateUrl: './merchant-settings.page.html',
  styleUrls: ['./merchant-settings.page.scss'],
})
export class MerchantSettingsPage implements OnInit {

  
  userinfo: any;
  loading;
  constructor(
    private popoverCtrl: PopoverController,
    public storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.get("user").then(
      (val) => {
        console.log(val);
        this.userinfo = val;
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goMerchantprofile(){
    this.router.navigateByUrl('/merchant-profile')
  }

  async help() {
    const content = `<ul>
      <li>As a Merchant, you reward your customers (with 1% or more) on every transactions and your dashboard allows you to view all transactions.</li>
      <li>Customer's reward (%) amount is deducted from customer's payments and the balance is credited to your Extra Wallet.</li>
    </ul>`;
    const pop = await this.popoverCtrl.create({
      component: InfoComponent,
      cssClass: "popover",
      componentProps: {
        content,
      },
    });
    await pop.present();
  }

  goServices() {
    this.router.navigateByUrl('/merchant-services')
  }
  goSetreward() {
    this.router.navigateByUrl('/set-reward')
  }

}
