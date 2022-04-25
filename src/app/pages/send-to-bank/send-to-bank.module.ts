import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendToBankPageRoutingModule } from './send-to-bank-routing.module';

import { SendToBankPage } from './send-to-bank.page';
import { SelectBankPageModule } from '../select-bank/select-bank.module';
import { ChooseWalletPageModule } from '../choose-wallet/choose-wallet.module';
import { ConfirmTransactionPageModule } from '../confirm-transaction/confirm-transaction.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SendToBankPageRoutingModule,
    SelectBankPageModule,
    ChooseWalletPageModule,
    ConfirmTransactionPageModule
  ],
  declarations: [SendToBankPage]
})
export class SendToBankPageModule {}
