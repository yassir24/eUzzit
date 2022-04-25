import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectBankPageRoutingModule } from './select-bank-routing.module';

import { SelectBankPage } from './select-bank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SelectBankPageRoutingModule
  ],
  declarations: [SelectBankPage]
})
export class SelectBankPageModule {}
