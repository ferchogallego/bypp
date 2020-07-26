import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoBuyerPage } from './info-buyer.page';

const routes: Routes = [
  {
    path: '',
    component: InfoBuyerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoBuyerPageRoutingModule {}
