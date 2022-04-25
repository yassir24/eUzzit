import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtraWalletPage } from './extra-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: ExtraWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraWalletPageRoutingModule {}
