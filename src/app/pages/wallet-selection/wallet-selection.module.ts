import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletSelectionPageRoutingModule } from './wallet-selection-routing.module';

import { WalletSelectionPage } from './wallet-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletSelectionPageRoutingModule
  ],
  declarations: [WalletSelectionPage]
})
export class WalletSelectionPageModule {}
