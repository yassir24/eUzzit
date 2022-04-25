import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterMerchantPage } from './register-merchant.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterMerchantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterMerchantPageRoutingModule {}
