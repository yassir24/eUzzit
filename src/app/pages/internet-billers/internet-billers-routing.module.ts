import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternetBillersPage } from './internet-billers.page';

const routes: Routes = [
  {
    path: '',
    component: InternetBillersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternetBillersPageRoutingModule {}
