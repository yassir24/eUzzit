import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZitStatusPage } from './zit-status.page';

const routes: Routes = [
  {
    path: '',
    component: ZitStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZitStatusPageRoutingModule {}
