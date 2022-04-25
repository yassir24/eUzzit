import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessCheckPage } from './success-check.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessCheckPageRoutingModule {}
