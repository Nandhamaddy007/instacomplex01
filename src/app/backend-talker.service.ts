import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class BackendTalkerService {
  constructor(private http: HttpClient) {}
  endpoint = 'https://w9oc5.sse.codesandbox.io/';
  GetShop(id: any): any {
    return this.http.get(this.endpoint + 'GetShop/' + id);
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
    return this.http.get(this.endpoint + 'getShops');
  }
  getOrdersByShop(id): any {
    return this.http.get(this.endpoint + 'getOrders/' + id);
  }
  updateOrderById(data): any {
    let d = this.encryptData(data);
    let str = { body: d };
    return this.http.patch(this.endpoint + 'updateOrder', str);
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
