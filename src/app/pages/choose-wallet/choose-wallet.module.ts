import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseWalletPageRoutingModule } from './choose-wallet-routing.module';

import { ChooseWalletPage } from './choose-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseWalletPageRoutingModule
  ],
  declarations: [ChooseWalletPage]
})
export class ChooseWalletPageModule {}
