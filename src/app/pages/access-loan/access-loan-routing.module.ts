import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessLoanPage } from './access-loan.page';

const routes: Routes = [
  {
    path: '',
    component: AccessLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessLoanPageRoutingModule {}
