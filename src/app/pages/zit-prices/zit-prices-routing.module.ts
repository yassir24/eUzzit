import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZitPricesPage } from './zit-prices.page';

const routes: Routes = [
  {
    path: '',
    component: ZitPricesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZitPricesPageRoutingModule {}
