import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyPensionPage } from './monthly-pension.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyPensionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyPensionPageRoutingModule {}
