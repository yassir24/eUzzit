import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricityBillersPageRoutingModule } from './electricity-billers-routing.module';

import { ElectricityBillersPage } from './electricity-billers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectricityBillersPageRoutingModule
  ],
  declarations: [ElectricityBillersPage]
})
export class ElectricityBillersPageModule {}
