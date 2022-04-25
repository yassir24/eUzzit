import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseJambCardPageRoutingModule } from './choose-jamb-card-routing.module';

import { ChooseJambCardPage } from './choose-jamb-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseJambCardPageRoutingModule
  ],
  declarations: [ChooseJambCardPage]
})
export class ChooseJambCardPageModule {}
