import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseServicidPageRoutingModule } from './choose-servicid-routing.module';

import { ChooseServicidPage } from './choose-servicid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseServicidPageRoutingModule
  ],
  declarations: [ChooseServicidPage]
})
export class ChooseServicidPageModule {}
