import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterMerchantPageRoutingModule } from './register-merchant-routing.module';

import { RegisterMerchantPage } from './register-merchant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterMerchantPageRoutingModule
  ],
  declarations: [RegisterMerchantPage]
})
export class RegisterMerchantPageModule {}
