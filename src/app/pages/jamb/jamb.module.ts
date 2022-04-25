import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JambPageRoutingModule } from './jamb-routing.module';

import { JambPage } from './jamb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JambPageRoutingModule
  ],
  declarations: [JambPage]
})
export class JambPageModule {}
