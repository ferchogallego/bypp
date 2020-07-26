import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  info: any;
  load = false;
  @Input() vendedor: boolean;
  @Input() titulo: string;
  @Input() solicitudes: number;
  cantQuote: number;
  sales: number;
  imgPerfil: string;

  constructor(private companySvc: CompanyService) { }

  ngOnInit() {
    this.companySvc.companyData(this.companySvc.userId)
                   .subscribe(res => {
                     this.info = res;
                     this.imgPerfil = this.info.imgProfile;
                     if (this.imgPerfil) {
                       this.load = true;
                       console.log(this.load);
                     } else {
                      this.load = false;
                      console.log(this.load);
                     }
                   });
    this.companySvc.loadQuoteSent(this.companySvc.userId)
                   .subscribe(resp => {
                    this.cantQuote = resp.length;
                   });
    this.companySvc.loadQuotesAccepted()
                   .subscribe(resp => {
                     this.sales = resp.length;
                   });
  }

}
