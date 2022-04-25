import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanHistoryPageRoutingModule } from './loan-history-routing.module';

import { LoanHistoryPage } from './loan-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanHistoryPageRoutingModule
  ],
  declarations: [LoanHistoryPage]
})
export class LoanHistoryPageModule {}
