import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class BackendTalkerService {
  constructor(private http: HttpClient) {}
  endpoint = 'https://ib9ui.sse.codesandbox.io/';
  uploader(files: any): any {
    //console.log('DIR', __dirname);

    // const formData: FormData = new FormData();
    // console.log(files)
    // let fileToUpload:File =files[0]
    // formData.append('Image', fileToUpload, fileToUpload.name);
    // return this.http.post(endpoint, formData)
    return this.http.post(this.endpoint, files);
  }
  GetShop() {
    return this.http.get(this.endpoint + 'GetShop');
  }
  CreateShop(data: any): any {
    let d = this.encryptData(JSON.stringify(data));
    let str = { body: d };
    console.log(str);
    return this.http.post(this.endpoint + 'CreateShop', str);
  }
  encryptData(data: any) {
    let ciphertext = CryptoJS.AES.encrypt(data, '!@#$%^&*()').toString();
    console.log(ciphertext);
    return ciphertext;
  }
}
