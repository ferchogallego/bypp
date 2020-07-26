import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private ctrlNav: NavController,
              private modalCtrl: ModalController,
              private companySvc: CompanyService ) { }

ngOnInit() {
}

openEnt(){
this.modalCtrl.dismiss();
this.companySvc.tipo = 'empresa';
this.ctrlNav.navigateForward('/request');
}

openPer(){
this.modalCtrl.dismiss();
this.companySvc.tipo = 'person';
this.ctrlNav.navigateForward('/request');
}

}
