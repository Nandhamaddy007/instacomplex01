import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

@Injectable()
export class ImageProcessingService {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  constructor(
    private afStorage: AngularFireStorage,
    private imageCompress: NgxImageCompressService
  ) {}
  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  fileToFirebase(img, imgName, imgType, size) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      let Url = event.target.result;
      this.compressFile(Url, imgName, imgType);
    };
    reader.readAsDataURL(img);
  }
  uploadToCloud(image, imgName) {
    this.ref = this.afStorage.ref(imgName);
    this.task = this.ref.put(image);
    return this.ref.getDownloadURL();
  }

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  compressFile(image, imgName, imgType) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / 1024;
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    if (this.sizeOfOriginalImage > 150) {
      let XY = 90,
        quality = 90;
      if (this.sizeOfOriginalImage > 1100 && this.sizeOfOriginalImage < 2200) {
        XY = 70;
        quality = 50;
      } else if (
        this.sizeOfOriginalImage > 2200 &&
        this.sizeOfOriginalImage < 3300
      ) {
        XY = 60;
        quality = 40;
      } else if (this.sizeOfOriginalImage >= 3300) {
        XY = 40;
        quality = 30;
      }
      this.imageCompress
        .compressFile(image, orientation, XY, quality)
        .then(result => {
          this.imgResultAfterCompress = result;
          //this.localCompressedURl = result;
          // this.sizeOFCompressedImage =
          //   this.imageCompress.byteCount(result) / 1024;
          console.warn(
            'Size in bytes after compression:',
            this.imageCompress.byteCount(result) / 1024
          );
          const imageBlob = this.dataURItoBlob(
            this.imgResultAfterCompress.split(',')[1]
          );

          const imageFile = new File([imageBlob], imgName, {
            type: imgType
          });
        });
    }
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
}
