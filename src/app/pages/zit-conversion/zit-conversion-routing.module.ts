import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZitConversionPage } from './zit-conversion.page';

const routes: Routes = [
  {
    path: '',
    component: ZitConversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZitConversionPageRoutingModule {}
