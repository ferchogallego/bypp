import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-quotes-sent',
  templateUrl: './quotes-sent.page.html',
  styleUrls: ['./quotes-sent.page.scss'],
})
export class QuotesSentPage implements OnInit {
  listQuote: any;
  constructor(private companySvc: CompanyService,
              private ctrlNav: NavController) { }

  ngOnInit() {
    console.log(this.companySvc.userId);
    this.companySvc.loadQuoteSent(this.companySvc.userId)
                   .subscribe(resp => {
                    this.listQuote = resp;
                    console.log(this.listQuote);
                   });
  }

  openQuoteDetail(id: string){
    this.ctrlNav.navigateForward('/quote-detail');
    this.companySvc.idQuoteView = id;
  }

}
