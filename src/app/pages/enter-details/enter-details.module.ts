import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterDetailsPageRoutingModule } from './enter-details-routing.module';

import { EnterDetailsPage } from './enter-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterDetailsPageRoutingModule
  ],
  declarations: [EnterDetailsPage]
})
export class EnterDetailsPageModule {}
