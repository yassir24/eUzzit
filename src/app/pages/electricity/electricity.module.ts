import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricityPageRoutingModule } from './electricity-routing.module';

import { ElectricityPage } from './electricity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ElectricityPageRoutingModule
  ],
  declarations: [ElectricityPage]
})
export class ElectricityPageModule {}
