import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectProductCablePageRoutingModule } from './select-product-cable-routing.module';

import { SelectProductCablePage } from './select-product-cable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SelectProductCablePageRoutingModule
  ],
  declarations: [SelectProductCablePage]
})
export class SelectProductCablePageModule {}
