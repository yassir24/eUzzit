import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectBillerPageRoutingModule } from './select-biller-routing.module';

import { SelectBillerPage } from './select-biller.page';
import { SelectBillersPageModule } from '../select-billers/select-billers.module';
import { SelectProductPageModule } from '../select-product/select-product.module';
import { ChooseWalletPageModule } from '../choose-wallet/choose-wallet.module';
import { ConfirmTransactionPageModule } from '../confirm-transaction/confirm-transaction.module';
import { SelectBillerAirtimePageModule } from '../select-biller-airtime/select-biller-airtime.module';
import { SelectProductCablePageModule } from '../select-product-cable/select-product-cable.module';
import { SuccessPageModule } from '../success/success.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SelectBillerPageRoutingModule,
    SelectBillerAirtimePageModule,
    SelectProductCablePageModule,
    SelectBillersPageModule,
    SelectProductPageModule,
    ChooseWalletPageModule,
    ConfirmTransactionPageModule,
    SuccessPageModule
  ],
  declarations: [SelectBillerPage]
})
export class SelectBillerPageModule {}
