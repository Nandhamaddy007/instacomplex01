import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { finalize } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

@Injectable()
export class ImageProcessingService {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  // downloadURL: Observable<string>;
  constructor(
    private afStorage: AngularFireStorage,
    private imageCompress: NgxImageCompressService
  ) {}
  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  compressFile(image, fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage =
      this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
      this.imgResultAfterCompress = result;
      this.localCompressedURl = result;
      this.sizeOFCompressedImage =
        this.imageCompress.byteCount(result) / (1024 * 1024);
      console.warn(
        'Size in bytes after compression:',
        this.sizeOFCompressedImage
      );
      // create file from byte
      const imageName = fileName;
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(
        this.imgResultAfterCompress.split(',')[1]
      );
      //imageFile created below is the new compressed file which can be send to API in form data
      const imageFile = new File([imageBlob], imageName, {
        type: 'image/jpeg'
      });
      this.ref = this.afStorage.ref(imageName);
      this.task = this.ref.put(imageFile);
      this.task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.ref.getDownloadURL().subscribe(url => {
              console.log(url);
              //this.ClientForm.value.shopLogo = url;
            });
          })
        )
        .subscribe(url => {
          //console.log(url);
        });
    });
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
