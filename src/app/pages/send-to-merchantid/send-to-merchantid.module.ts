import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendToMerchantidPageRoutingModule } from './send-to-merchantid-routing.module';

import { SendToMerchantidPage } from './send-to-merchantid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SendToMerchantidPageRoutingModule
  ],
  declarations: [SendToMerchantidPage]
})
export class SendToMerchantidPageModule {}
