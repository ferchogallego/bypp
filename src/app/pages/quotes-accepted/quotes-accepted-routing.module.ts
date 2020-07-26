import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotesAcceptedPage } from './quotes-accepted.page';

const routes: Routes = [
  {
    path: '',
    component: QuotesAcceptedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesAcceptedPageRoutingModule {}
