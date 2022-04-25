import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternetBillersPageRoutingModule } from './internet-billers-routing.module';

import { InternetBillersPage } from './internet-billers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternetBillersPageRoutingModule
  ],
  declarations: [InternetBillersPage]
})
export class InternetBillersPageModule {}
