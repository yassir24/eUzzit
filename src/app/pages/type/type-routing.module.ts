import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypePage } from './type.page';

const routes: Routes = [
  {
    path: '',
    component: TypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypePageRoutingModule {}
