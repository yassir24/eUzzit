import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LifelinePageRoutingModule } from './lifeline-routing.module';

import { LifelinePage } from './lifeline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LifelinePageRoutingModule
  ],
  declarations: [LifelinePage]
})
export class LifelinePageModule {}
