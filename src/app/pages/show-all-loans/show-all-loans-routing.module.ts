import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowAllLoansPage } from './show-all-loans.page';

const routes: Routes = [
  {
    path: '',
    component: ShowAllLoansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowAllLoansPageRoutingModule {}
