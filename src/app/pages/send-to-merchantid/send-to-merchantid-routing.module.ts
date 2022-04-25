import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendToMerchantidPage } from './send-to-merchantid.page';

const routes: Routes = [
  {
    path: '',
    component: SendToMerchantidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendToMerchantidPageRoutingModule {}
