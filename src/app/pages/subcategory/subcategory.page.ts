import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.page.html',
  styleUrls: ['./subcategory.page.scss'],
})
export class SubcategoryPage implements OnInit {
  subcategorias: any;
  constructor(private companySvc: CompanyService,
              private ctrlNav: NavController) { }

  ngOnInit() {
    console.log(this.companySvc.tipo, '->' , this.companySvc.sctor, '->', this.companySvc.category);
    this.companySvc.loadSubcategories(this.companySvc.category)
                   .subscribe(result => {
                     this.subcategorias = result;
                     console.log(this.subcategorias);
                   });
  }

 async loadRequest(subcategoria){
   this.companySvc.subcategory = subcategoria;
   console.log('CADENA = ', this.companySvc.sctor, '->',
                             this.companySvc.category, '->',
                             this.companySvc.subcategory);
   this.ctrlNav.navigateForward(`/register/${this.companySvc.tipo}`);
  }

}
