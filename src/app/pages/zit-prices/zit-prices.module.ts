import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZitPricesPageRoutingModule } from './zit-prices-routing.module';

import { ZitPricesPage } from './zit-prices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZitPricesPageRoutingModule
  ],
  declarations: [ZitPricesPage]
})
export class ZitPricesPageModule {}
