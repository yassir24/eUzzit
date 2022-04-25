import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLoanPage } from './view-loan.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLoanPageRoutingModule {}
