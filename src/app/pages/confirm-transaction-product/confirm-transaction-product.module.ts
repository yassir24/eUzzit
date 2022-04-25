import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmTransactionProductPageRoutingModule } from './confirm-transaction-product-routing.module';

import { ConfirmTransactionProductPage } from './confirm-transaction-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmTransactionProductPageRoutingModule
  ],
  declarations: [ConfirmTransactionProductPage]
})
export class ConfirmTransactionProductPageModule {}
