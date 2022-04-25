import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoostedPage } from './boosted.page';

const routes: Routes = [
  {
    path: '',
    component: BoostedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoostedPageRoutingModule {}
