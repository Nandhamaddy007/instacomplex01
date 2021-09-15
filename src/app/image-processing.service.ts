import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/compat/storage';
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
  links = [];
  linksObj = {};
  LogoManipulation(Logo, folder) {
    return Observable.create(observer => {
      if (Logo['deleted'] != undefined) {
        this.afStorage.storage.refFromURL(folder + Logo['deleted']).delete;
      }
      if (Logo['src'] != '' && Logo['src'] != undefined) {
        this.ref = this.afStorage.ref(folder + '/' + Logo['name']);
        let imageBlob = this.dataURItoBlob(Logo['src']);
        let imageFile = new File([imageBlob], Logo['name'], {
          type: Logo['src'].split(';')[0].split(':')[1]
        });
        this.task = this.ref.put(imageFile);
        this.task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.ref.getDownloadURL().subscribe(url => {
                observer.next(url);
              });
            })
          )
          .subscribe();
      } else {
        observer.next('Same');
      }
    });
  }
  deleteImages(src, folder) {
    return Observable.create(observer => {
      if (Object.keys(src).length == 0) {
        observer.next('deleted');
      }
      for (let i in src) {
        console.log('delete', src[i], src);
        this.afStorage.storage.refFromURL(folder + src[i]).delete;
        if (i == Object.keys(src)[Object.keys(src).length - 1]) {
          observer.next('deleted');
          observer.complete();
        }
      }
    });
  }
  UpdateImages(products, folder) {
    console.log(Object.keys(products), Object.values(products));
    return Observable.create(observer => {
      if (Object.keys(products).length == 0) {
        observer.next('updated');
        console.log('empty');
      }
      this.updater(
        Object.keys(products),
        Object.values(products),
        folder,
        observer,
        0
      );
    });
  }
  updater(keys, values, folder, observer, i) {
    if (i == keys.length) {
      observer.next(this.linksObj);
      observer.complete();
    }

    let imageBlob = this.dataURItoBlob(values[i].data);
    let imageFile = new File([imageBlob], keys[i], {
      type: values[i].data.split(';')[0].split(':')[1]
    });
    this.ref = this.afStorage.ref(folder + '/' + keys[i]);
    this.task = this.ref.put(imageFile);
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            this.linksObj[keys[i]] = { data: url, index: values[i].index };
            console.log(this.linksObj[keys[i]]);
            this.updater(keys, values, folder, observer, ++i);
          });
        })
      )
      .subscribe();
  }

  uploadToCloud(products, folder) {
    return Observable.create(observer => {
      this.uploader(products, folder, 0, observer);
    });
  }
  uploader(products, folder, i, observer) {
    if (i == products.length) {
      observer.next(this.links);
      observer.complete();
    }
    if (products[i]['productSrc'] != '') {
      this.compressor(products[i]['productSrc']).subscribe(data => {
        let imageBlob = this.dataURItoBlob(products[i]['productSrc']);
        let imageFile = new File([imageBlob], data, {
          type: products[i]['productSrc'].split(';')[0].split(':')[1]
        });
        this.ref = this.afStorage.ref(folder + '/' + products[i]['productId']);
        this.task = this.ref.put(imageFile);
        this.task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.ref.getDownloadURL().subscribe(url => {
                this.links.push(url);
                console.log(url);
                this.uploader(products, folder, ++i, observer);
              });
            })
          )
          .subscribe();
      });
    }
  }
  compressor(image) {
    return Observable.create(observer => {
      let XYQ = this.setSize(this.imageCompress.byteCount(image) / 1024);
      console.log('Before: ', this.imageCompress.byteCount(image) / 1024);
      this.imageCompress
        .compressFile(image, -1, XYQ[0], XYQ[1])
        .then(result => {
          // const imageBlob = this.dataURItoBlob(result.split(',')[1]);
          // let imageFile = new File([imageBlob], imgName, { type: imgType });
          console.log('After: ', this.imageCompress.byteCount(result) / 1024);
          observer.next(result);
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
