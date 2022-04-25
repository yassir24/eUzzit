import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpgradeAccountPage } from './upgrade-account.page';

const routes: Routes = [
  {
    path: '',
    component: UpgradeAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeAccountPageRoutingModule {}
