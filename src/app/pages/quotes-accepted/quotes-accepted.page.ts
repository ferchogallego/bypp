import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-quotes-accepted',
  templateUrl: './quotes-accepted.page.html',
  styleUrls: ['./quotes-accepted.page.scss'],
})
export class QuotesAcceptedPage implements OnInit {

  sales: any;
  constructor(private companySvc: CompanyService,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.companySvc.loadQuotesAccepted()
                   .subscribe(resp => {
                     this.sales = resp;
                     console.log(this.sales);
                   });
  }

  openQuoteDetail(id: string){
    this.ctrlNav.navigateForward('/quote-detail');
    this.companySvc.idQuoteView = id;
  }

}
