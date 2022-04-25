import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZitBoosterPage } from './zit-booster.page';

const routes: Routes = [
  {
    path: '',
    component: ZitBoosterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZitBoosterPageRoutingModule {}
