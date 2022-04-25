import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectBillerPage } from './select-biller.page';

const routes: Routes = [
  {
    path: '',
    component: SelectBillerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectBillerPageRoutingModule {}
