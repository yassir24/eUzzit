import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletSelectionPage } from './wallet-selection.page';

const routes: Routes = [
  {
    path: '',
    component: WalletSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletSelectionPageRoutingModule {}
