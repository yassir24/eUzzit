import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectBillersPageRoutingModule } from './select-billers-routing.module';

import { SelectBillersPage } from './select-billers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectBillersPageRoutingModule
  ],
  declarations: [SelectBillersPage]
})
export class SelectBillersPageModule {}
