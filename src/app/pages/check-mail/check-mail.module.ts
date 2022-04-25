import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckMailPageRoutingModule } from './check-mail-routing.module';

import { CheckMailPage } from './check-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckMailPageRoutingModule
  ],
  declarations: [CheckMailPage]
})
export class CheckMailPageModule {}
