import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseWaecCardPageRoutingModule } from './choose-waec-card-routing.module';

import { ChooseWaecCardPage } from './choose-waec-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseWaecCardPageRoutingModule
  ],
  declarations: [ChooseWaecCardPage]
})
export class ChooseWaecCardPageModule {}
