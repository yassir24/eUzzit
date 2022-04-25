import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeAccountPageRoutingModule } from './upgrade-account-routing.module';

import { UpgradeAccountPage } from './upgrade-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpgradeAccountPageRoutingModule
  ],
  declarations: [UpgradeAccountPage]
})
export class UpgradeAccountPageModule {}
