import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetRewardPageRoutingModule } from './set-reward-routing.module';

import { SetRewardPage } from './set-reward.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SetRewardPageRoutingModule
  ],
  declarations: [SetRewardPage]
})
export class SetRewardPageModule {}
