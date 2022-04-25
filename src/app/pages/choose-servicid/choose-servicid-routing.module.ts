import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseServicidPage } from './choose-servicid.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseServicidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseServicidPageRoutingModule {}
