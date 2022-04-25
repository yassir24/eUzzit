import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLoanPageRoutingModule } from './view-loan-routing.module';

import { ViewLoanPage } from './view-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLoanPageRoutingModule
  ],
  declarations: [ViewLoanPage]
})
export class ViewLoanPageModule {}
