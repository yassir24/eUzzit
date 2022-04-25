import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMerchantProfilePage } from './create-merchant-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMerchantProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMerchantProfilePageRoutingModule {}
