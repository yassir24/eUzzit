import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectProductCablePage } from './select-product-cable.page';

const routes: Routes = [
  {
    path: '',
    component: SelectProductCablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectProductCablePageRoutingModule {}
