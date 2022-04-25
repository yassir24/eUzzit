import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifelinePage } from './lifeline.page';

const routes: Routes = [
  {
    path: '',
    component: LifelinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifelinePageRoutingModule {}
