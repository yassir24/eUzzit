import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoostedPageRoutingModule } from './boosted-routing.module';

import { BoostedPage } from './boosted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoostedPageRoutingModule
  ],
  declarations: [BoostedPage]
})
export class BoostedPageModule {}
