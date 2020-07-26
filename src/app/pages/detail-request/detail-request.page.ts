import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavController, Platform } from '@ionic/angular';
import { Interest } from '../../shared/interest.interface';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.page.html',
  styleUrls: ['./detail-request.page.scss'],
})
export class DetailRequestPage implements OnInit {

interes = false;
interesInfo: any;

solicitud: any;
idSolicitud: string;
imagen: string;
producto: string;
descripcion: string;
marca: string;
referencia: string;
cantidad: string;
fecha: string;
direccion: string;
ciudad: string;
pais: string;
sector: string;
categoria: string;
subcategoria: string;
usuario: string;

constructor(private companySvc: CompanyService,
            private activateRoute: ActivatedRoute,
            public authSvc: AuthService,
            private ctrlNav: NavController,
            private alertCtrl: AlertController,
            private viewer: PhotoViewer,
            private platform: Platform) { }

  ngOnInit() {
    this.idSolicitud = this.activateRoute.snapshot.paramMap.get('id');
    this.companySvc.loadRequestDetail(this.idSolicitud).subscribe(res => {
      this.solicitud = res;
      // console.log(this.solicitud);
      this.imagen = this.solicitud.imagen;
      this.producto = this.solicitud.producto;
      this.descripcion = this.solicitud.descripcion;
      this.marca = this.solicitud.marca;
      this.referencia = this.solicitud.referencia;
      this.cantidad = this.solicitud.cantidad;
      this.fecha = this.solicitud.fecha;
      this.direccion = this.solicitud.direccion;
      this.ciudad = this.solicitud.ciudad;
      this.pais = this.solicitud.pais;
      this.sector = this.solicitud.sector;
      this.categoria = this.solicitud.categoria;
      this.subcategoria = this.solicitud.subcategoria;
      this.usuario = this.solicitud.usuario;
      this.companySvc.tipo = this.solicitud.tipo;
      console.log(this.companySvc.tipo); // ojo arreglar tipo desde la solicitud en comprador
    });
    this.companySvc.consultPendingInterest(this.idSolicitud, this.companySvc.userId)
                   .subscribe(resp => {
                     this.interesInfo = resp;
                     if (resp.length > 0) {
                     this.interes = true;
                    }
                   });
  }

  startQuote(){
    this.companySvc.comprador = this.usuario;
    this.companySvc.solicitud = this.idSolicitud;
    this.companySvc.product = this.producto;
    this.ctrlNav.navigateForward('/quotes');
  }

  interestQuoting(interested: Interest){
    interested = {
      buyer: this.usuario,
      seller: this.companySvc.userId,
      request: this.idSolicitud
    };
    if (this.interes === false){
      this.companySvc.addInterestQuote(interested);
      this.interes = true;
    }else{
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Interés en cotizar',
      subHeader: 'No puede realizarse',
      message: 'Ya se generó el interés.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  deleteInterest(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Esta seguro?',
      message: 'Se eliminará el interés por cotizar en esta solicitud¡¡¡',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            alert.dismiss();
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.companySvc.deleteInterest();
            this.ctrlNav.navigateBack(`/empresa/${this.companySvc.userId}`);
          }
        }
      ]
    });

    await alert.present();
  }

  fullScreenImage(imagen: string){
    this.platform.ready().then(() => {
      const photoUrl = imagen;
      const title = 'Imagen de soliucitud';
      const options = {
        share: true
      };
      this.viewer.show(photoUrl, title, options);
    });
  }
}
