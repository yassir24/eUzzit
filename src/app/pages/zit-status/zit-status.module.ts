import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZitStatusPageRoutingModule } from './zit-status-routing.module';

import { ZitStatusPage } from './zit-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZitStatusPageRoutingModule
  ],
  declarations: [ZitStatusPage]
})
export class ZitStatusPageModule {}
