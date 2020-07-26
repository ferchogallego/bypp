import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotesSentPage } from './quotes-sent.page';

const routes: Routes = [
  {
    path: '',
    component: QuotesSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesSentPageRoutingModule {}
