import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseWalletPage } from './choose-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseWalletPageRoutingModule {}
