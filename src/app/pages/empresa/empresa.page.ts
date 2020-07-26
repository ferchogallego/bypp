import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../../shared/request.interface';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  dataCompany: any;
  imgProfile: string;
  name: string;
  solicitudes: Request;
  list: any;
  cantRequest: number;

  constructor(private menuCtrl: MenuController,
              private companySvc: CompanyService,
              private activateRoute: ActivatedRoute,
              private ctrlNav: NavController) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('uid');
    this.companySvc.userId = id;
    console.log(this.companySvc.userId);
    this.companySvc.companyData(id).subscribe(result => {
      this.dataCompany = result;
      this.name = this.dataCompany.name;
      this.companySvc.rollUser = this.dataCompany.roll;
      this.companySvc.sctor = this.dataCompany.sector;
      this.companySvc.category = this.dataCompany.categoria;
      this.companySvc.subcategory = this.dataCompany.subcategoria;
      this.companySvc.userId = id;
      console.log(this.dataCompany.categoria, this.dataCompany.subcategoria);
      this.companySvc.loadReceivedRequest(this.solicitudes, this.dataCompany.subcategoria, this.dataCompany.categoria)
                     .subscribe(res => {
                      this.list = res;
                      this.cantRequest = res.length;
                      console.log(this.list);
                   });
    });
  }

  toogleMenu(){
    this.menuCtrl.toggle();
  }

  requestDetail(id: string){
    this.ctrlNav.navigateForward(`/detail-request/${id}`);
  }
}
