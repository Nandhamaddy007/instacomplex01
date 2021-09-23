import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import firebase from 'firebase/app';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class BackendTalkerService {
  constructor(
    private http: HttpClient // public afAuth: AngularFireAuth
  ) {}
  endpoint = environment.DevEndpoint;
  defaultImg =
    'https://raw.githubusercontent.com/Nandhamaddy007/instacomplex01/master/src/assets/images/images.jpeg';

  GetShop(id: any): any {
    return this.http.get(this.endpoint + 'GetShop/' + id);
    //console.log(d);
  }
  GetShopUI(id: any): any {
    return this.http.get(this.endpoint + 'UI/GetShop/' + id);
    //console.log(d);
  }
  CreateShop(data: any): any {
    let d = this.encryptData(data);
    let str = { body: d };
    //console.log(str);
    return this.http.post(this.endpoint + 'CreateShop', str);
  }
  updateShop(data: any, id: String): any {
    let d = this.encryptData(data);
    let str = { body: d };
    return this.http.post(this.endpoint + 'updateShop/' + id, str);
  }
  placeOrder(data: any): any {
    console.log(data);
    let str = { body: this.encryptData(data) };
    return this.http.post(this.endpoint + 'AddOrder', str);
  }
  getOrderCount(date): any {
    return this.http.get(this.endpoint + 'getOrderCount/' + date);
  }
  getAllShops(): any {
    return this.http.get(this.endpoint + 'UI/getShops');
  }
  getOrdersByShop(id): any {
    return this.http.get(this.endpoint + 'getOrders/' + id);
  }
  updateOrderById(data): any {
    let d = this.encryptData(data);
    let str = { body: d };
    return this.http.patch(this.endpoint + 'updateOrder', str);
  }
  getOrderStatus(orderId): any {
    return this.http.get(this.endpoint + 'UI/getStatus/' + orderId);
  }

  getToken(emailId): any {
    let e = this.encryptData(emailId);
    let pack = { user: e };
    return this.http.post(this.endpoint + 'token/signIn', pack, {
      withCredentials: true,
    });
  }

  decryptData(data: any) {
    let bytes = CryptoJS.AES.decrypt(data, '!@#$%^&*()');
    let key = bytes.toString(CryptoJS.enc.Utf8);
    let shopData = JSON.parse(key);
    return shopData;
  }

  encryptData(data: any) {
    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      '!@#$%^&*()'
    ).toString();
    //console.log(ciphertext);
    return ciphertext;
  }
}
