import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundWalletPage } from './fund-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: FundWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundWalletPageRoutingModule {}
