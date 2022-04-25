import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternetPlansPage } from './internet-plans.page';

const routes: Routes = [
  {
    path: '',
    component: InternetPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternetPlansPageRoutingModule {}
