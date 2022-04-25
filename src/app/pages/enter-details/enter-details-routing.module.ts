import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterDetailsPage } from './enter-details.page';

const routes: Routes = [
  {
    path: '',
    component: EnterDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterDetailsPageRoutingModule {}
