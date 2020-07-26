import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-buyer',
  templateUrl: './info-buyer.page.html',
  styleUrls: ['./info-buyer.page.scss'],
})
export class InfoBuyerPage implements OnInit {

  imgUser = false;
  company: boolean;
  comprador: any;
  tipo: string;
  imgPerfil: string;
  nombre: string;
  email: string;
  phone: string;

  constructor(private companySvc: CompanyService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.companySvc.loadInfoBuyer(id)
                   .subscribe(resp => {
                     this.comprador = resp;
                     console.log(this.comprador);
                     if (this.comprador.roll === 'buyerCompany') {
                       this.company = true;
                       this.tipo = 'Empresa';
                     } else {
                      this.company = false;
                      this.tipo = 'Persona';
                     }
                     if (this.comprador.imgProfile) {
                      this.imgPerfil = this.comprador.imgProfile;
                      this.imgUser = true;
                     }
                     console.log(this.company);
                     this.nombre = this.comprador.name;
                     this.email = this.comprador.email;
                     this.phone = this.comprador.phone;
                   });
  }

}
