import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZitConversionPageRoutingModule } from './zit-conversion-routing.module';

import { ZitConversionPage } from './zit-conversion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZitConversionPageRoutingModule
  ],
  declarations: [ZitConversionPage]
})
export class ZitConversionPageModule {}
