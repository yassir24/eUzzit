import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckMailPage } from './check-mail.page';

const routes: Routes = [
  {
    path: '',
    component: CheckMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckMailPageRoutingModule {}
