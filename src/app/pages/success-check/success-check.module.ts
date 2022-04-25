import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessCheckPageRoutingModule } from './success-check-routing.module';

import { SuccessCheckPage } from './success-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessCheckPageRoutingModule
  ],
  declarations: [SuccessCheckPage]
})
export class SuccessCheckPageModule {}
