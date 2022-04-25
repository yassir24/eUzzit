import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendToWalletPage } from './send-to-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: SendToWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendToWalletPageRoutingModule {}
