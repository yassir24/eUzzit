import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaysSelectPage } from './days-select.page';

const routes: Routes = [
  {
    path: '',
    component: DaysSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaysSelectPageRoutingModule {}
