import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectBillerAirtimePage } from './select-biller-airtime.page';

const routes: Routes = [
  {
    path: '',
    component: SelectBillerAirtimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectBillerAirtimePageRoutingModule {}
