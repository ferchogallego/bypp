import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Quote } from '../../shared/quote.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {

  private image: any;
  imageSrc: any;
  tipo: string = this.companySvc.tipo;

  sendQuote = new FormGroup ({
  cotizacion: new FormControl('', Validators.required),
  producto: new FormControl(this.companySvc.product),
  marca: new FormControl('', Validators.required),
  referencia: new FormControl('', Validators.required),
  cantidad: new FormControl('', Validators.required),
  descripcion: new FormControl('', Validators.required),
  fecha: new FormControl('', Validators.required),
  precio: new FormControl('', Validators.required),
  flete: new FormControl('', Validators.required),
  imagen: new FormControl(''),
  destinatario: new FormControl(this.companySvc.comprador),
  solicitud: new FormControl(this.companySvc.solicitud),
  vendedor: new FormControl(this.companySvc.userId),
  sector: new FormControl(this.companySvc.sctor),
  categoria: new FormControl(this.companySvc.category),
  subcategoria: new FormControl(this.companySvc.subcategory),
});

  constructor(public companySvc: CompanyService,
              private ctrlNav: NavController) { }

  ngOnInit() {
    console.log(this.companySvc.solicitud,
                this.companySvc.comprador,
                this.companySvc.userId,
                this.companySvc.sctor,
                this.companySvc.category,
                this.companySvc.subcategory,
                this.companySvc.tipo);
  }

  sendQuoteUser(quote: Quote, suma: number){
    console.log(quote);
  }

  handleImage(event: any){
    this.image = event.target.files[0];
    console.log('imagen: ', this.image );
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(this.image);
  }

  cancel(){
    this.ctrlNav.navigateBack(`/empresa/${this.companySvc.userId}`);
  }

}
