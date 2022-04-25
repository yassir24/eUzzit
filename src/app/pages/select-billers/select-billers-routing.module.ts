import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectBillersPage } from './select-billers.page';

const routes: Routes = [
  {
    path: '',
    component: SelectBillersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectBillersPageRoutingModule {}
