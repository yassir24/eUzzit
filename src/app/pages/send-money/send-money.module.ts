import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendMoneyPageRoutingModule } from './send-money-routing.module';

import { SendMoneyPage } from './send-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SendMoneyPageRoutingModule
  ],
  declarations: [SendMoneyPage]
})
export class SendMoneyPageModule {}
