import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.page.html',
  styleUrls: ['./quote-detail.page.scss'],
})
export class QuoteDetailPage implements OnInit {
  cotizacion: any;

  idCotizacion: string;
  destinatario: string;
  adjudicada: string;
  imagen: string;
  producto: string;
  descripcion: string;
  marca: string;
  referencia: string;
  cantidad: string;
  fecha: string;
  direccion: string;
  solicitud: string;
  ciudad: string;
  pais: string;
  sector: string;
  categoria: string;
  subcategoria: string;
  usuario: string;


  constructor(private companySvc: CompanyService,
              private viewer: PhotoViewer,
              private platform: Platform,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.companySvc.loadQuoteDetail(this.companySvc.idQuoteView)
                   .subscribe(resp => {
                      this.cotizacion = resp;
                      console.log(this.cotizacion);
                      this.adjudicada = this.cotizacion.adjudicada;
                      this.destinatario = this.cotizacion.destinatario;
                      this.imagen = this.cotizacion.imagen;
                      this.producto = this.cotizacion.producto;
                      this.descripcion = this.cotizacion.descripcion;
                      this.marca = this.cotizacion.marca;
                      this.referencia = this.cotizacion.referencia;
                      this.cantidad = this.cotizacion.cantidad;
                      this.fecha = this.cotizacion.fecha;
                      this.direccion = this.cotizacion.direccion;
                      this.ciudad = this.cotizacion.ciudad;
                      this.solicitud = this.cotizacion.solicitud;
                      this.pais = this.cotizacion.pais;
                      this.sector = this.cotizacion.sector;
                      this.categoria = this.cotizacion.categoria;
                      this.subcategoria = this.cotizacion.subcategoria;
                      this.usuario = this.cotizacion.usuario;
                      this.companySvc.tipo = this.cotizacion.tipo;
                   });
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

  requestDetail(id: string){
    this.ctrlNav.navigateForward(`/detail-request/${id}`);
  }

  buyerDetail(comprador: string){
    this.ctrlNav.navigateForward(`/info-buyer/${comprador}`);
  }
}
