import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BackendTalkerService } from '../backend-talker.service';

@Component({
  selector: 'app-add-shop-and-products-form',
  templateUrl: './add-shop-and-products-form.component.html',
  styleUrls: ['./add-shop-and-products-form.component.css']
})
export class AddShopAndProductsFormComponent implements OnInit {
  file = new FormControl('');
  file_data: any = [];
  formLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: BackendTalkerService,
    private route: ActivatedRoute
  ) {}
  upload(files: any) {
    //uploading files through service
    this.service
      .uploader(files)
      .subscribe(data => console.log(data), error => console.log(error));
  }
  ClientForm: FormGroup;
  ProductDetails: FormArray;
  ProductVariance: FormArray;
  ngOnInit(): void {
    let id = this.route.snapshot.params.ShopName;
    if (id) {
      this.service.GetShop().subscribe(
        data => {
          //console.log(data);
          this.ClientForm = this.formBuilder.group({
            shopName: [data['shopName'], Validators.required],
            shopOwner: [data['shopOwner'], Validators.required],
            shopOwnerMobile: [data['shopOwnerMobile'], Validators.required],
            shopOwnerEmail: [data['shopOwnerEmail'], Validators.required],
            shopOwnerAddress: [data['shopOwnerAddress'], Validators.required],
            shopOwnerInstaId: [data['shopOwnerInstaId'], Validators.required],
            shopOwnerGpay: [data['shopOwnerGpay'], Validators.required],
            shopOwnerPaytm: [data['shopOwnerPaytm'], Validators.required],
            shopLogo: ['', Validators.required],
            ProductDetails: this.formBuilder.array([
              this.fillProductDetails(data['ProductDetails'])
            ])
          });
          console.log(this.ClientForm);
          this.formLoaded = true;
        },
        err => console.log(err)
      );
    } else {
      this.ClientForm = this.formBuilder.group({
        shopName: ['Ak stores', Validators.required],
        shopOwner: ['Arun kumar', Validators.required],
        shopOwnerMobile: ['9876543123', Validators.required],
        shopOwnerEmail: ['aK@GMAIL.Com', Validators.required],
        shopOwnerAddress: ['Chennai', Validators.required],
        shopOwnerInstaId: ['Akstores@insta', Validators.required],
        shopOwnerGpay: ['123456', Validators.required],
        shopOwnerPaytm: ['9877654', Validators.required],
        shopLogo: ['', Validators.required],
        ProductDetails: this.formBuilder.array([this.createProduct()])
      });
      this.formLoaded = true;
      //console.log(this.ClientForm.value);
    }
  }
  fillProductDetails(products: any): FormGroup[] {
    var list = [];
    for (let product in products) {
      list.push(
        this.formBuilder.group({
          productName: [products[product]['productName'], Validators.required],
          productDescription: [
            products[product]['productDescription'],
            Validators.required
          ],
          productColor: [
            products[product]['productColor'],
            Validators.required
          ],
          ProductVariance: this.formBuilder.array([
            this.fillProductVariance(products[product]['ProductVariance'])
          ])
        })
      );
    }
    console.log(list);

    return list;
  }
  fillProductVariance(variances): FormGroup[] {
    var list = [];
    for (let variance in variances) {
      list.push(
        this.formBuilder.group({
          productPrice: [
            variances[variance]['productPrice'],
            Validators.required
          ],
          productAvailability: [
            variances[variance]['productAvailability'],
            Validators.required
          ],
          productSize: [variances[variance]['productSize'], Validators.required]
        })
      );
    }
    console.log(list);
    return list;
  }

  createProduct(): FormGroup {
    return this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productColor: ['', Validators.required],
      ProductVariance: this.formBuilder.array([this.createProductVariance()])
    });
  }

  createProductVariance(): FormGroup {
    return this.formBuilder.group({
      productPrice: ['', Validators.required],
      productAvailability: [false, Validators.required],
      productSize: ['', Validators.required]
    });
  }
  addProductVariance(i): void {
    //console.log(this.ClientForm.get('ProductDetails')['controls'][i].get('ProductVariance'))
    this.ProductVariance = this.ClientForm.get('ProductDetails')['controls'][
      i
    ].get('ProductVariance') as FormArray;
    this.ProductVariance.push(this.createProductVariance());
  }
  addProduct(): void {
    this.ProductDetails = this.ClientForm.get('ProductDetails') as FormArray;
    this.ProductDetails.push(this.createProduct());
    //let f=this.ClientForm.get('ProductDetails')
    //console.log(f)
    //console.log(f['controls'][0].get('ProductVariance'))
  }
  fileChange(event, i) {
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {
      const file = fileList[0];
      //get file information such as name, size and type
      console.log('finfo', file.name, file.size, file.type, i);
      //max file size is 4 mb
      if (file.size / 1048576 <= 4) {
        let formData = new FormData();
        //let info={id:2,name:'raja'}
        formData.append('file', file, file.name);
        formData.append('date', new Date().toISOString());
        formData.append('pid', i);
        formData.append('shopName', 'AKStores');
        //formData.append('info',JSON.stringify(info))
        this.file_data[i] = formData;
        console.log(this.file_data);
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }
  RemoveProduct(i) {
    this.file_data.splice(i, 1);
    console.log(this.file_data);
    //console.log(this.ClientForm.get('ProductDetails')['controls'])
    this.ClientForm.get('ProductDetails')['controls'].splice(i, 1);
    //console.log(this.ClientForm.get('ProductDetails')['controls'])
  }
  RemoveVariance(i, j) {
    this.ProductVariance = this.ClientForm.get('ProductDetails')
      ['controls'][i].get('ProductVariance')
      ['controls'].splice(j, 1);
    console.log(
      this.ClientForm.get('ProductDetails')['controls'][i].get(
        'ProductVariance'
      )['controls']
    );
  }
  uploadFile() {
    this.service.uploader(this.file_data).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  CreateShop() {
    this.service
      .CreateShop(this.ClientForm.value)
      .subscribe(res => console.log(res), err => console.log(err));
  }
}
