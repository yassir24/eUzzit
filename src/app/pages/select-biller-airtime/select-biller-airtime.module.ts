import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectBillerAirtimePageRoutingModule } from './select-biller-airtime-routing.module';

import { SelectBillerAirtimePage } from './select-biller-airtime.page';
import { SelectProductCablePageModule } from '../select-product-cable/select-product-cable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectBillerAirtimePageRoutingModule,
    SelectProductCablePageModule
  ],
  declarations: [SelectBillerAirtimePage]
})
export class SelectBillerAirtimePageModule {}
