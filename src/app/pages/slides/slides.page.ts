import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/slides/membership.png',
      titulo: 'Regístrate',
      desc: 'Crea una cuenta con un email válido y confirma tu suscripción'
    },
    {
      img: '/assets/slides/dashboard.png',
      titulo: 'Selecciona la categoría y subcategoría...',
      desc: 'Recibirás solicitudes de compra.'
    },
    {
      img: '/assets/slides/oil.png',
      titulo: 'Realiza cotizaciones a las solicitudes recibidas',
      desc: 'Ser rápido y atender las necesidades específicas del cliente.'
    },
    {
      img: '/assets/slides/ip.png',
      titulo: 'Ingresa los datos de tu producto o servicio',
      desc: 'Tiempos de entrega, precio y costos de envío'
    },
    {
      img: '/assets/slides/prospect.png',
      titulo: 'Te avisaremos cuando te envíen solicitudes',
      desc: 'Selecciona las solicitudes que estas interesado en cotizar.'
    },
    {
      img: '/assets/slides/qualify.png',
      titulo: 'Cómo estuvo tu venta?',
      desc: 'Califica tu experiencia en BuyApp'
    }
  ];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onClick(){
    this.navCtrl.navigateBack('/inicio');
  }

}
