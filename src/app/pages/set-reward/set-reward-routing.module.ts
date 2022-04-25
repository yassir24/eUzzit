import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetRewardPage } from './set-reward.page';

const routes: Routes = [
  {
    path: '',
    component: SetRewardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetRewardPageRoutingModule {}
