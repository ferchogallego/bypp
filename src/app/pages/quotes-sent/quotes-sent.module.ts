import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotesSentPageRoutingModule } from './quotes-sent-routing.module';

import { QuotesSentPage } from './quotes-sent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotesSentPageRoutingModule
  ],
  declarations: [QuotesSentPage]
})
export class QuotesSentPageModule {}
