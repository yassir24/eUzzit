import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaysSelectPageRoutingModule } from './days-select-routing.module';

import { DaysSelectPage } from './days-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaysSelectPageRoutingModule
  ],
  declarations: [DaysSelectPage]
})
export class DaysSelectPageModule {}
