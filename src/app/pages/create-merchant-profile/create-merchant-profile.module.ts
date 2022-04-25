import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMerchantProfilePageRoutingModule } from './create-merchant-profile-routing.module';

import { CreateMerchantProfilePage } from './create-merchant-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMerchantProfilePageRoutingModule
  ],
  declarations: [CreateMerchantProfilePage]
})
export class CreateMerchantProfilePageModule {}
