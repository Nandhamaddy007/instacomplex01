import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProcessingService } from '../image-processing.service';
import { BackendTalkerService } from '../backend-talker.service';

@Component({
  selector: 'app-add-shop-and-products-form',
  templateUrl: './add-shop-and-products-form.component.html',
  styleUrls: ['./add-shop-and-products-form.component.css']
})
export class AddShopAndProductsFormComponent implements OnInit {
  formLoaded = false;
  // ref: AngularFireStorageReference;
  // task: AngularFireUploadTask;
  // downloadURL: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private service: BackendTalkerService,
    private route: ActivatedRoute,
    private router: Router,
    private imgService: ImageProcessingService
  ) {}

  ClientForm: FormGroup;
  ProductDetails: FormArray;
  ProductVariance: FormArray;
  shopName = '';

  ngOnInit(): void {
    this.shopName = this.route.snapshot.params.shopName;
    if (this.shopName) {
      this.service.GetShop(this.shopName).subscribe(
        data1 => {
          //console.log(data1);
          let data = this.service.decryptData(data1.body);
          //console.log(data);
          if (data != null) {
            var PDs = this.fillProductDetails(data['ProductDetails']);
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
              ProductDetails: PDs
            });
            this.formLoaded = true;
          } else {
            let ans = confirm(
              'Dear admin check your shop name please...\n Wanna create one?'
            );

            if (ans) {
              this.router.navigate(['/AddShop']);
            } else {
              this.router.navigate(['/complex']);
            }
          }
        },
        err => console.log(err)
      );
    } else {
      this.ClientForm = this.formBuilder.group({
        shopName: ['', Validators.required],
        shopOwner: ['', Validators.required],
        shopOwnerMobile: ['', Validators.required],
        shopOwnerEmail: ['', Validators.required],
        shopOwnerAddress: ['', Validators.required],
        shopOwnerInstaId: ['AkStores', Validators.required],
        shopOwnerGpay: ['', Validators.required],
        shopOwnerPaytm: ['', Validators.required],
        shopLogo: ['', Validators.required],
        ProductDetails: this.formBuilder.array([this.createProduct()])
      });
      this.formLoaded = true;

      //console.log(this.ClientForm.value);
    }
  }
  fillProductDetails(products: any): FormArray {
    var list = this.formBuilder.array([]);
    for (let product in products) {
      list.push(
        this.formBuilder.group({
          productName: [products[product]['productName'], Validators.required],

          productColor: [
            products[product]['productColor'],
            Validators.required
          ],
          ProductVariance: this.fillProductVariance(
            products[product]['ProductVariance']
          )
        })
      );
    }

    return list;
  }
  fillProductVariance(variances): FormArray {
    var list = this.formBuilder.array([]);
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

    return list;
  }

  createProduct(): FormGroup {
    return this.formBuilder.group({
      productName: ['', Validators.required],
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
  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  fileChange(event: any, i?: Number) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let fileName =
        this.ClientForm.value.shopOwnerInstaId + (i ? '@Prod' : '@Logo');
      console.log(fileName);
      // console.log(file);
      let type = file.type;
      let size = file.size;
      if((size/1024)<159){        
      this.imgService.uploadToCloud(file, fileName).subscribe(url => {
        this.ClientForm.value.shopLogo = url;
      });
      }else{

      }
      // var reader = new FileReader();
      // reader.onload = (event: any) => {
      //   this.localUrl = event.target.result;
      //this.compressFile(this.localUrl, fileName);
    }
    // reader.readAsDataURL(event.target.files[0]);
  }

  RemoveProduct(i) {
    // this.file_data.splice(i, 1);
    // console.log(this.file_data);
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
  // uploadFile() {
  //   this.service.uploader(this.file_data).subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  updateShop() {
    this.service
      .updateShop(this.ClientForm.value, this.shopName)
      .subscribe(res => console.log(res), err => console.log(err));
  }
  CreateShop() {
    this.service.CreateShop(this.ClientForm.value).subscribe(
      res => {
        console.log(res);
        alert(res.body);
        this.router.navigate(['complex/' + res.shopName]);
      },
      err => console.log(err)
    );
  }
}
