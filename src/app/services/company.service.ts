import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { FileI } from '../shared/file.interface';
import { Request } from '../shared/request.interface';
import { Quote } from '../shared/quote.interface';
import { Interest } from '../shared/interest.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  sctor: string;
  category: string;
  subcategory: string;
  tipo: string;
  userId: string;
  nameUser: string;
  rollUser: string;
  private filePath: any;
  private downloadURL: string;

  // envio de cotizacion
  comprador: string;
  solicitud: string;
  product: string;

  // detalle de cotizacion
  idQuoteView: string;

  // interes
  interesting: string;

  // profile
  imgUrl: string;

  // progress image
  percent: any;

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) { }

companyData(id: any){
return this.db.collection('sellerUser').doc(id).valueChanges();
}
loadEconomySectors(){
return this.db.collection('economic_sectors').valueChanges();
}
loadCategories(categoria: string){
return this.db.collection('categories').doc(categoria).valueChanges();
}
loadSubcategories(subcategoria: string){
return this.db.collection('subcategories')
        .doc(subcategoria)
        .collection(subcategoria)
        .valueChanges();
}

uploadImageDocumentQuote(image: FileI, solicitud: any, suma: number){
        this.filePath = `quotes/${image.name}`;
        const fileRef = this.storage.ref(this.filePath);
        const task = this.storage.upload(this.filePath, image);
        this.percent = task.percentageChanges();
        task.snapshotChanges().pipe(
        finalize(() => {
                fileRef.getDownloadURL().subscribe( urlImage => {
                this.downloadURL = urlImage;
                this.loadQuoteData(solicitud, suma);
                console.log(this.downloadURL);
                });
        })
        ).subscribe();
}

loadQuoteData(quote: any, suma: number){
if (this.rollUser === 'sellerCompany') {
const prodObj: Quote = {
cotizacion: quote.cotizacion,
producto: quote.producto,
marca: quote.marca,
referencia: quote.referencia,
cantidad: quote.cantidad,
descripcion: quote.descripcion,
fecha: quote.fecha,
precio: quote.precio,
flete: quote.flete,
total: suma,
imagen: this.downloadURL,
destinatario: quote.destinatario,
solicitud: quote.solicitud,
vendedor: quote.vendedor,
sector: quote.sector,
categoria: quote.categoria,
subcategoria: quote.subcategoria,
fileRef: this.filePath
};
return this.db.collection('cotizaciones').add(prodObj);
}
}
filterRequest(image: FileI, solicitud: any, suma: number){
this.uploadImageDocumentQuote(image, solicitud, suma );
}

loadReceivedRequest(solicitudes: Request, subcategory: string, category: string){
return this.db.collection('solicitudes/', ref => ref
       .where('subcategoria', '==', subcategory)
       .where('categoria', '==', category))
       .snapshotChanges()
       .pipe(
        map(actions =>
         actions.map(resp => {
         const data = resp.payload.doc.data() as Request;
         const id = resp.payload.doc.id;
         this.interesting = id;
         return {id, ...data};
         }))
        );
}

loadRequestDetail(id: string){
return this.db.collection('solicitudes').doc(id).valueChanges();
}

loadInfoBuyer(id: string){
 return this.db.collection('users').doc(id).valueChanges();
}

loadQuoteDetail(id: string){
return this.db.collection('cotizaciones').doc(id).valueChanges();
}

loadQuoteSent(seller: string){
return this.db.collection('cotizaciones/', ref => ref
       .where('vendedor', '==', seller))
       .snapshotChanges()
       .pipe(
        map(actions =>
         actions.map(resp => {
         const data = resp.payload.doc.data() as Quote;
         const id = resp.payload.doc.id;
         return {id, ...data};
         }))
        );
}

addInterestQuote(interest: Interest){
const interObj: Interest = {
seller: interest.seller,
request: interest.request ,
buyer: interest.buyer
};
return this.db.collection('interes').add(interObj);
}

consultPendingInterest(idRequest: string, idSeller: string){
return this.db.collection('interes/', ref => ref
        .where('request', '==', idRequest)
        .where('seller', '==', idSeller))
        .snapshotChanges()
        .pipe(
          map(actions =>
           actions.map(resp => {
           const data = resp.payload.doc.data();
           const id = resp.payload.doc.id;
           this.interesting = id;
           return {id, data};
           }))
          );
}
deleteInterest(){
return this.db.collection('interes')
        .doc(this.interesting)
        .delete();
}

loadQuotesAccepted(){
return this.db.collection('cotizaciones/', ref => ref
        .where('vendedor', '==', this.userId)
        .where('adjudicada', '==', 'true'))
        .snapshotChanges()
        .pipe(
         map(actions =>
         actions.map(resp => {
         const data = resp.payload.doc.data() as any;
         const id = resp.payload.doc.id;
         return {id, ...data};
         }))
        );
}

simpleUpdateProfileUser(nombre: string, telefono: string){
return this.db.collection('sellerUser')
        .doc(this.userId)
        .update({
          name: nombre,
          phone: telefono
        });
}

private updateProfileUser(nombre: string, telefono: string){
return this.db.collection('sellerUser')
        .doc(this.userId)
        .update({
          imgProfile: this.imgUrl,
          name: nombre,
          phone: telefono
        });
}

uploadImageProfile(image: FileI, nombre: string, telefono: string){
  this.filePath = `profile/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath, image);
  task.snapshotChanges().pipe(
  finalize(() => {
    fileRef.getDownloadURL().subscribe( urlImage => {
    this.imgUrl = urlImage;
    this.updateProfileUser(nombre, telefono);
    });
  })
  ).subscribe();
}

}
