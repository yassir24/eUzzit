import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavMerchantPageRoutingModule } from './fav-merchant-routing.module';

import { FavMerchantPage } from './fav-merchant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavMerchantPageRoutingModule
  ],
  declarations: [FavMerchantPage]
})
export class FavMerchantPageModule {}
