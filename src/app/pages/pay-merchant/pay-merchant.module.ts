import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayMerchantPageRoutingModule } from './pay-merchant-routing.module';

import { PayMerchantPage } from './pay-merchant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayMerchantPageRoutingModule
  ],
  declarations: [PayMerchantPage]
})
export class PayMerchantPageModule {}
