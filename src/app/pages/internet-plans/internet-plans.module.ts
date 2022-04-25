import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternetPlansPageRoutingModule } from './internet-plans-routing.module';

import { InternetPlansPage } from './internet-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InternetPlansPageRoutingModule
  ],
  declarations: [InternetPlansPage]
})
export class InternetPlansPageModule {}
