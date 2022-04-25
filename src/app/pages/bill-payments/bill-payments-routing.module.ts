import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillPaymentsPage } from './bill-payments.page';

const routes: Routes = [
  {
    path: '',
    component: BillPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillPaymentsPageRoutingModule {}
