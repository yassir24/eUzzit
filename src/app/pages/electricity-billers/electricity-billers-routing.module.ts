import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricityBillersPage } from './electricity-billers.page';

const routes: Routes = [
  {
    path: '',
    component: ElectricityBillersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricityBillersPageRoutingModule {}
