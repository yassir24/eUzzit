import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPaymentsPageRoutingModule } from './bill-payments-routing.module';

import { BillPaymentsPage } from './bill-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillPaymentsPageRoutingModule
  ],
  declarations: [BillPaymentsPage]
})
export class BillPaymentsPageModule {}
