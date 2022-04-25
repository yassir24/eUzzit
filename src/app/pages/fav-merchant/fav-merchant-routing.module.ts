import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavMerchantPage } from './fav-merchant.page';

const routes: Routes = [
  {
    path: '',
    component: FavMerchantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavMerchantPageRoutingModule {}
