import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantDashboardPage } from './merchant-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantDashboardPageRoutingModule {}
