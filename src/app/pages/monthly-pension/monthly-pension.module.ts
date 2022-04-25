import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyPensionPageRoutingModule } from './monthly-pension-routing.module';

import { MonthlyPensionPage } from './monthly-pension.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyPensionPageRoutingModule
  ],
  declarations: [MonthlyPensionPage]
})
export class MonthlyPensionPageModule {}
