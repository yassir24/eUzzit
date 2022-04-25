import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantServicesPage } from './merchant-services.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantServicesPageRoutingModule {}
