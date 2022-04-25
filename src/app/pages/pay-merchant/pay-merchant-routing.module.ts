import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayMerchantPage } from './pay-merchant.page';

const routes: Routes = [
  {
    path: '',
    component: PayMerchantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayMerchantPageRoutingModule {}
