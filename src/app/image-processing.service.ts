import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
// import { finalize } from 'rxjs/dist/types/operators';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ImageProcessingService {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  constructor(
    private afStorage: AngularFireStorage,
    private imageCompress: NgxImageCompressService
  ) {}

  uploadToCloud(products, folder) {
    let response = [];
    const up = Observable.create(observer => {
      for (let i in products) {
        let link: String = products[i]['productSrc'];
        if (link.startsWith('https://firebasestorage.googleapis.com')) {
          response.push(products[i]['productSrc']);
        } else {
          let imageBlob = this.dataURItoBlob(products[i]['productSrc']);
          let imageFile = new File([imageBlob], 'temp', {
            type: products[i]['productSrc'].split(';')[0].split(':')[1]
          });
          this.ref = this.afStorage.ref(folder + '/Product' + i);
          this.task = this.ref.put(imageFile);
          this.task
            .snapshotChanges()
            .pipe(
              finalize(() => {
                this.ref.getDownloadURL().subscribe(url => {
                  // console.log(url);
                  response.push(url);
                  // observer.next(url);
                  console.log(url);

                  if (+i === products.length - 1) {
                    console.log(products.length - 1);
                    observer.next(response);
                    observer.complete();
                  }
                });
              })
            )
            .subscribe();
        }
      }
      // observer.next(response);
      // observer.complete();

      // console.log(response);
      // observer.next(response);
      // observer.complete(() => {
      //   console.log(response);
      // });
    });
    return up;
  }
  imageToUrl(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(observer => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }
  compressor(image, imgName, imgType) {
    return Observable.create(observer => {
      let XYQ = this.setSize(this.imageCompress.byteCount(image) / 1024);
      this.imageCompress
        .compressFile(image, -1, XYQ[0], XYQ[1])
        .then(result => {
          const imageBlob = this.dataURItoBlob(result.split(',')[1]);
          let imageFile = new File([imageBlob], imgName, { type: imgType });
          observer.next(imageFile);
          observer.complete();
        });
    });
  }
  setSize(size) {
    let s = [];
    if (size > 1100 && size < 2200) {
      s[0] = 70;
      s[1] = 50;
    } else if (size > 2200 && size < 3300) {
      s[0] = 60;
      s[1] = 40;
    } else if (size >= 3300) {
      s[0] = 40;
      s[1] = 30;
    } else {
      s[0] = 90;
      s[1] = 90;
    }

    return s;
  }
  dataURItoBlob(dataURI) {
    // console.log(dataURI);
    const byteString = window.atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
}
