import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotesAcceptedPageRoutingModule } from './quotes-accepted-routing.module';

import { QuotesAcceptedPage } from './quotes-accepted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotesAcceptedPageRoutingModule
  ],
  declarations: [QuotesAcceptedPage]
})
export class QuotesAcceptedPageModule {}
