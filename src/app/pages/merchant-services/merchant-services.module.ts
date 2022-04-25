import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantServicesPageRoutingModule } from './merchant-services-routing.module';

import { MerchantServicesPage } from './merchant-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantServicesPageRoutingModule
  ],
  declarations: [MerchantServicesPage]
})
export class MerchantServicesPageModule {}
