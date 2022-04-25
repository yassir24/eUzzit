import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessLoanPageRoutingModule } from './access-loan-routing.module';

import { AccessLoanPage } from './access-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessLoanPageRoutingModule
  ],
  declarations: [AccessLoanPage]
})
export class AccessLoanPageModule {}
