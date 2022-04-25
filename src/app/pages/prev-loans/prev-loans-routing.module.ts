import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevLoansPage } from './prev-loans.page';

const routes: Routes = [
  {
    path: '',
    component: PrevLoansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrevLoansPageRoutingModule {}
