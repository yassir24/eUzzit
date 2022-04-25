import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { HistoryDetailsPageModule } from '../history-details/history-details.module';
import { ExtraWalletPage } from '../../pages/extra-wallet/extra-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    HistoryDetailsPageModule,
    
  ],
  declarations: [HistoryPage, ExtraWalletPage]
})
export class HistoryPageModule {}
