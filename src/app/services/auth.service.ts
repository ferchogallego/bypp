import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { first } from 'rxjs/operators';
import { User } from 'firebase';
import { FileI } from '../shared/file.interface';
import { finalize } from 'rxjs/operators';
import { CompanyI } from '../shared/company.interface';
import { UserI } from '../shared/user.interface';
import { CompanyService } from './company.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private filePath: any;
  private downloadURL: string;
  public user: User;
  idUser: string;

  dptos: any;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private storage: AngularFireStorage,
              private companySvc: CompanyService,
              private http: HttpClient) { }

  login(email: string, password: string){
    try {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  register(email: string, password: string){
    try {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  createUserData(id: string, user: any){
    return this.db.collection<User>('sellerUser').doc(id).set(user);
  }

  logout(){
    try {
      this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  loadUserData(id: any, datos: any, tipo: string){
    if (tipo === 'sellerPerson') {
      const prodObj: UserI = {
        uid: datos.uid,
        sector: this.companySvc.sctor,
        categoria: this.companySvc.category,
        subcategoria: this.companySvc.subcategory,
        email: datos.email,
        name: datos.name,
        document: datos.document,
        numDocument: datos.numDocument,
        imgDocument: this.downloadURL,
        address: datos.address,
        city: datos.city,
        country: datos.country,
        phone: datos.phone,
        roll: tipo,
        fileRef: this.filePath,
        relationship: 'Independent'
      };
      return this.db.collection('sellerUser').doc(id).set(prodObj);
    }
    if (tipo === 'sellerCompany') {
      const prodObj: CompanyI = {
        uid: datos.uid,
        sector: this.companySvc.sctor,
        categoria: this.companySvc.category,
        subcategoria: this.companySvc.subcategory,
        email: datos.email,
        name: datos.name,
        representative: datos.representative,
        numNit: datos.numNit,
        imgNit: this.downloadURL,
        phone: datos.phone,
        address: datos.address,
        city: datos.city,
        country: datos.country,
        roll: tipo,
        fileRef: this.filePath
      };
      return this.db.collection('sellerUser').doc(id).set(prodObj);
    }
  }

  private uploadImageDocument(id: any, datos: any, tipo: string, image: FileI){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.downloadURL = urlImage;
          this.loadUserData(id, datos, tipo);
        });
      })
    ).subscribe();
 }

 filterUser(id: any, datos: any, tipo: string, image: FileI){
  this.uploadImageDocument(id, datos, tipo, image );
 }

 userData(id: any){
  return this.db.collection('sellerUser').doc(id).valueChanges();
 }

 paises(){
   return this.http.get('../../../assets/json/countries.json');
 }
 departmentos(){
  return this.http.get('../../../assets/json/states.json');
 }
 /* ciudades(){
    return this.http.get('../../../assets/json/cities.json');
 } */
}
