import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivateWalletPageRoutingModule } from './activate-wallet-routing.module';

import { ActivateWalletPage } from './activate-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ActivateWalletPageRoutingModule
  ],
  declarations: [ActivateWalletPage]
})
export class ActivateWalletPageModule {}
