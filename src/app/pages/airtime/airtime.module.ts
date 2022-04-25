import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirtimePageRoutingModule } from './airtime-routing.module';

import { AirtimePage } from './airtime.page';
import { SelectBillersPageModule } from '../select-billers/select-billers.module';
import { ChooseWalletPageModule } from '../choose-wallet/choose-wallet.module';
import { ConfirmTransactionPageModule } from '../confirm-transaction/confirm-transaction.module';
import { SuccessPageModule } from '../success/success.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AirtimePageRoutingModule,
    SelectBillersPageModule,
    ChooseWalletPageModule,
    ConfirmTransactionPageModule,
    SuccessPageModule
  ],
  declarations: [AirtimePage]
})
export class AirtimePageModule {}
