import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendToWalletPageRoutingModule } from './send-to-wallet-routing.module';

import { SendToWalletPage } from './send-to-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SendToWalletPageRoutingModule
  ],
  declarations: [SendToWalletPage]
})
export class SendToWalletPageModule {}
