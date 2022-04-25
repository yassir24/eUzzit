import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraWalletPageRoutingModule } from './extra-wallet-routing.module';

import { ExtraWalletPage } from './extra-wallet.page';
import { HistoryDetailsPageModule } from '../history-details/history-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtraWalletPageRoutingModule,
    HistoryDetailsPageModule
  ],
  declarations: [ExtraWalletPage]
})
export class ExtraWalletPageModule {}
