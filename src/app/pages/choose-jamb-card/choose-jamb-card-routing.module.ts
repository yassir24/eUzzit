import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseJambCardPage } from './choose-jamb-card.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseJambCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseJambCardPageRoutingModule {}
