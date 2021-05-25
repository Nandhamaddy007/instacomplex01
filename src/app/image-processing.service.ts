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
  compressFile(img, imgName, imgType, size) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      let Url = event.target.result;
      let XYQ = this.setSize(size / 1024);
      //console.log(XYQ);
      this.imageCompress.compressFile(Url, -1, XYQ[0], XYQ[1]).then(result => {
        //console.log(result);
        const imageBlob = this.dataURItoBlob(result.split(',')[1]);
        this.file = new File([imageBlob], imgName, {
          type: imgType
        });
        console.log(this.file);
        // return this.compressor(Url, imgName, imgType);
      });
    };
    console.log(reader.readAsDataURL(img));
    //console.log(this.file);
    return this.file;
  }
  uploadToCloud(image, imgName) {
    this.ref = this.afStorage.ref(imgName);
    this.task = this.ref.put(image);
    return this.ref.getDownloadURL();
  }

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  compressor(image, imgName, imgType) {
    var orientation = -1;
    var imageFile;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / 1024;
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    if (this.sizeOfOriginalImage > 150) {
      let XY = 90,
        quality = 90;

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

          imageFile = new File([imageBlob], imgName, {
            type: imgType
          });
        });
      return imageFile;
    }
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
