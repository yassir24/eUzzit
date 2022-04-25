import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JambPage } from './jamb.page';

const routes: Routes = [
  {
    path: '',
    component: JambPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JambPageRoutingModule {}
