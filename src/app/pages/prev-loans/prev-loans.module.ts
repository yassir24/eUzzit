import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrevLoansPageRoutingModule } from './prev-loans-routing.module';

import { PrevLoansPage } from './prev-loans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrevLoansPageRoutingModule
  ],
  declarations: [PrevLoansPage]
})
export class PrevLoansPageModule {}
