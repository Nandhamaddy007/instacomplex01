import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendTalkerService {
  constructor(private http: HttpClient) {}
  uploader(files: any): any {
    //console.log('DIR', __dirname);
    const endpoint =
      'https://learnanimation001.000webhostapp.com/assets/ImageUpload.php';
    // const formData: FormData = new FormData();
    // console.log(files)
    // let fileToUpload:File =files[0]
    // formData.append('Image', fileToUpload, fileToUpload.name);
    // return this.http.post(endpoint, formData)
    return this.http.post(endpoint, files);
  }
}
