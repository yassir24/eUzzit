import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantDashboardPageRoutingModule } from './merchant-dashboard-routing.module';

import { MerchantDashboardPage } from './merchant-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantDashboardPageRoutingModule
  ],
  declarations: [MerchantDashboardPage]
})
export class MerchantDashboardPageModule {}
