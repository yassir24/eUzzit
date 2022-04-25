import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmTransactionProductPage } from './confirm-transaction-product.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmTransactionProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmTransactionProductPageRoutingModule {}
