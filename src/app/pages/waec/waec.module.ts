import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaecPageRoutingModule } from './waec-routing.module';

import { WaecPage } from './waec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WaecPageRoutingModule
  ],
  declarations: [WaecPage]
})
export class WaecPageModule {}
