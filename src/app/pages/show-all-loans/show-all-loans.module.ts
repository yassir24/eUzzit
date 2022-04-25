import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowAllLoansPageRoutingModule } from './show-all-loans-routing.module';

import { ShowAllLoansPage } from './show-all-loans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowAllLoansPageRoutingModule
  ],
  declarations: [ShowAllLoansPage]
})
export class ShowAllLoansPageModule {}
