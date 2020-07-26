import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoBuyerPageRoutingModule } from './info-buyer-routing.module';

import { InfoBuyerPage } from './info-buyer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoBuyerPageRoutingModule
  ],
  declarations: [InfoBuyerPage]
})
export class InfoBuyerPageModule {}
