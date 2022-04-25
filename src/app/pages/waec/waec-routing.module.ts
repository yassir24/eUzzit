import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaecPage } from './waec.page';

const routes: Routes = [
  {
    path: '',
    component: WaecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaecPageRoutingModule {}
