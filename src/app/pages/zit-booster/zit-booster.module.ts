import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZitBoosterPageRoutingModule } from './zit-booster-routing.module';

import { ZitBoosterPage } from './zit-booster.page';
import { ChooseWalletPageModule } from '../choose-wallet/choose-wallet.module';
import { ZitPricesPageModule } from '../zit-prices/zit-prices.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZitBoosterPageRoutingModule,
    ChooseWalletPageModule,
    ZitPricesPageModule
  ],
  declarations: [ZitBoosterPage]
})
export class ZitBoosterPageModule {}
