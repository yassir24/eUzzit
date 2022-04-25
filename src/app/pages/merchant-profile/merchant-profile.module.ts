import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantProfilePageRoutingModule } from './merchant-profile-routing.module';

import { MerchantProfilePage } from './merchant-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MerchantProfilePageRoutingModule
  ],
  declarations: [MerchantProfilePage]
})
export class MerchantProfilePageModule {}
