import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs/dist/types';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ImageProcessingService } from '../image-processing.service';
import { BackendTalkerService } from '../backend-talker.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
// import { Observable } from 'rxjs/dist/types';

@Component({
  selector: 'app-add-shop-and-products-form',
  templateUrl: './add-shop-and-products-form.component.html',
  styleUrls: ['./add-shop-and-products-form.component.css'],
})
export class AddShopAndProductsFormComponent implements OnInit {
  formLoaded = false;

  uploadProgressLogo: Observable<number>;
  uploadProgressProducts: Observable<number>[] = new Array();
  constructor(
    private formBuilder: FormBuilder,
    private service: BackendTalkerService,
    private route: ActivatedRoute,
    private router: Router,
    private imgService: ImageProcessingService,
    private afStorage: AngularFireStorage,
    private imageProcess: NgxImageCompressService
  ) {}

  ClientForm: FormGroup;
  ProductDetails: FormArray;
  ProductVariance: FormArray;
  shopOwnerInstaId = '';

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = String(today.getFullYear());
    var fulldate = `${dd}-${mm}-${yyyy}`;
    this.shopOwnerInstaId = this.route.snapshot.params.shopOwnerInstaId;
    // console.log(this.shopName);
    if (this.shopOwnerInstaId) {
      this.service.GetShop(this.shopOwnerInstaId).subscribe(
        (data1) => {
          //console.log(data1);
          let data = this.service.decryptData(data1.body);
          //console.log(data);
          if (data != null) {
            var PDs = this.fillProductDetails(data['ProductDetails']);
            this.dummyLogo['src'] = data['shopLogo'];
            //console.log(data);
            this.ClientForm = this.formBuilder.group({
              shopName: [data['shopName'], Validators.required],
              shopOwner: [
                data['shopOwner'],
                [
                  Validators.required,
                  Validators.maxLength(50),
                  Validators.pattern('^[a-zA-Z ]*$'),
                ],
              ],
              shopOwnerMobile: [data['shopOwnerMobile'], Validators.required],
              shopOwnerEmail: [
                data['shopOwnerEmail'],
                [Validators.required, Validators.email],
              ],
              shopOwnerAddress: [data['shopOwnerAddress']],
              shopOwnerInstaId: [data['shopOwnerInstaId'], Validators.required],
              shopOwnerGpay: [data['shopOwnerGpay'], Validators.required],
              shopLogo: [data['shopLogo']],
              ProductDetails: PDs,
            });
            this.formLoaded = true;
          } else {
            let ans = confirm(
              'Dear admin check your shop Instagram Id please...\n Wanna create one?'
            );

            if (ans) {
              this.router.navigate(['/AddShop']);
            } else {
              this.router.navigate(['/complex']);
            }
          }
        },
        (err) => console.log(err)
      );
    } else {
      this.ClientForm = this.formBuilder.group({
        shopName: ['Rainbow Colors', Validators.required],
        shopOwner: [
          'Nandhagopal',
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern('^[a-zA-Z ]*$'),
          ],
        ],
        shopOwnerMobile: [
          '1234567890',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern(/^[0-9]\d*$/),
          ],
        ],
        shopOwnerEmail: [
          'nandha@mail.com',
          [Validators.required, Validators.email],
        ],
        shopOwnerAddress: ['chennai'],
        shopOwnerInstaId: ['rainbowcolors', Validators.required],
        shopOwnerGpay: ['nandha@okaxis.com', Validators.required],
        shopCreatedAt: [fulldate],
        shopLogo: [''],
        ProductDetails: this.formBuilder.array([this.createProduct()]),
      });
      this.formLoaded = true;
      console.log(this.ClientForm);
      // console.log(this.ClientForm.value);
    }
  }
  fillProductDetails(products: any): FormArray {
    var list = this.formBuilder.array([]);
    for (let product in products) {
      list.push(
        this.formBuilder.group({
          productName: [products[product]['productName'], Validators.required],
          productSrc: [products[product]['productSrc'], Validators.required],
          productId: [products[product]['productId']],
          productColor: [
            products[product]['productColor'],
            Validators.required,
          ],
          productAvailability: products[product]['productAvailability'],
          ProductVariance: this.fillProductVariance(
            products[product]['ProductVariance']
          ),
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
            Validators.required,
          ],
          quantity: [variances[variance]['quantity'], Validators.required],
          productSize: [
            variances[variance]['productSize'],
            Validators.required,
          ],
        })
      );
    }
    return list;
  }

  createProduct(): FormGroup {
    return this.formBuilder.group({
      productName: ['', Validators.required],
      productColor: [''],
      productId: ['IC' + new Date().getTime()],
      productSrc: [''],
      productAvailability: [true],
      ProductVariance: this.formBuilder.array([this.createProductVariance()]),
    });
  }

  createProductVariance(): FormGroup {
    return this.formBuilder.group({
      productPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      productSize: ['', Validators.required],
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
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  dummyLogo = {};
  addProductImage(i, event) {
    console.log('if part outside', i, event.target.name);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imgService.compressor(event.target.result).subscribe((result) => {
          if (
            this.deletedProducts[
              this.ClientForm.value.ProductDetails[i].productId
            ] == undefined &&
            this.shopOwnerInstaId != undefined &&
            this.ClientForm.value.ProductDetails[i].productSrc != '' &&
            this.ClientForm.value.ProductDetails[i].productSrc != undefined
          ) {
            this.deletedProducts[
              this.ClientForm.value.ProductDetails[i].productId
            ] = this.ClientForm.value.ProductDetails[i].productSrc;
          }

          // console.log(this.deletedProducts[i]);
          this.ClientForm.get('ProductDetails')
            ['controls'][i].get('productSrc')
            .setValue(result);
          this.dummyProducts[
            this.ClientForm.value.ProductDetails[i].productId
          ] = { data: result, index: i };
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteProductImage(i) {
    if (
      this.deletedProducts[this.ClientForm.value.ProductDetails[i].productId] ==
        undefined &&
      this.shopOwnerInstaId != undefined
    ) {
      this.deletedProducts[this.ClientForm.value.ProductDetails[i].productId] =
        this.ClientForm.value.ProductDetails[i].productSrc;
    }
    this.ClientForm.get('ProductDetails')
      ['controls'][i].get('productSrc')
      .setValue('');
    delete this.dummyProducts[
      this.ClientForm.value.ProductDetails[i].productId
    ];
  }
  addLogo(event) {
    this.deleteLogo('change');

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onloadend = (event) => {
        this.imgService.compressor(event.target.result).subscribe((result) => {
          this.dummyLogo['src'] = result;
          this.ClientForm.controls.shopLogo.setValue(result);
          this.dummyLogo['name'] =
            this.ClientForm.value.shopOwnerInstaId + '@Logo';
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  @ViewChild('Logo')
  Logo: ElementRef;
  deleteLogo(type) {
    if (type == 'remove') {
      console.log(this.Logo, this.dummyLogo);
      this.Logo.nativeElement.value = '';
    }
    if (
      this.shopOwnerInstaId != undefined &&
      this.dummyLogo['deleted'] == undefined &&
      this.ClientForm.value.shopLogo != ''
    ) {
      this.dummyLogo['deleted'] = this.ClientForm.value.shopLogo;
      this.ClientForm.controls.shopLogo.setValue('');
    }
    this.dummyLogo['src'] = '';
    this.dummyLogo['name'] = '';
  }

  RemoveProduct(i) {
    // this.file_data.splice(i, 1);
    // console.log(this.file_data);
    //console.log(this.ClientForm.get('ProductDetails')['controls'])
    if (
      this.deletedProducts[this.ClientForm.value.ProductDetails[i].productId] ==
        undefined &&
      this.shopOwnerInstaId != undefined
    ) {
      this.deletedProducts[this.ClientForm.value.ProductDetails[i].productId] =
        this.ClientForm.value.ProductDetails[i].productSrc;
    }
    this.deleteProductImage(i);
    this.ClientForm.get('ProductDetails')['controls'].splice(i, 1);
    this.ClientForm.get('ProductDetails')['value'].splice(i, 1);

    //console.log(this.ClientForm.get('ProductDetails')['controls'])
  }
  RemoveVariance(i, j) {
    // console.log('variance', i, j);
    this.ProductVariance = this.ClientForm.get('ProductDetails')
      ['controls'][i].get('ProductVariance')
      ['controls'].splice(j, 1);
    console.log(
      this.ClientForm.get('ProductDetails')['controls'][i].get(
        'ProductVariance'
      )['controls']
    );
  }
  dummyProducts = {};
  deletedProducts = {};
  updateShop() {
    this.ProductDetails = this.ClientForm.get('ProductDetails') as FormArray;
    console.log(this.dummyProducts);
    this.imgService
      .LogoManipulation(this.dummyLogo, this.ClientForm.value.shopOwnerInstaId)
      .subscribe((res) => {
        if (res != 'Same') this.ClientForm.controls.shopLogo.setValue(res);
        this.imgService
          .deleteImages(
            this.deletedProducts,
            this.ClientForm.value.shopOwnerInstaId + '/'
          )
          .subscribe((res) => {
            this.imgService
              .UpdateImages(
                this.dummyProducts,
                this.ClientForm.value.shopOwnerInstaId
              )
              .subscribe(
                (urls) => {
                  console.log('updateshop: ', urls);
                  Object.entries(urls).forEach(([key, value]) => {
                    this.ClientForm.get('ProductDetails')
                      ['controls'][value['index']].get('productSrc')
                      .setValue(value['data']);
                  });
                },
                (err) => {
                  console.log(err);
                },
                () => {
                  console.log(this.ClientForm.value);
                  this.service
                    .updateShop(this.ClientForm.value, this.shopOwnerInstaId)
                    .subscribe(
                      (res) => {
                        console.log(res);
                        alert(res.body);
                        this.router.navigate([
                          'complex/' + this.shopOwnerInstaId,
                        ]);
                      },
                      (err) => console.log(err)
                    );
                }
              );
          });
      });
  }
  CreateShop() {
    this.ProductDetails = this.ClientForm.get('ProductDetails') as FormArray;
    console.log(this.dummyLogo);
    this.imgService
      .LogoManipulation(this.dummyLogo, this.ClientForm.value.shopOwnerInstaId)
      .subscribe((res) => {
        console.log(res);
        if (res != 'Same') {
          this.ClientForm.controls.shopLogo.setValue(res);
        }
        this.imgService
          .uploadToCloud(
            this.ProductDetails.value,
            this.ClientForm.value.shopOwnerInstaId
          )
          .subscribe(
            (urls) => {
              console.log(urls);
              urls.forEach((url, j) => {
                console.log(url);
                console.log();
                this.ClientForm.get('ProductDetails')
                  ['controls'][j].get('productSrc')
                  .setValue(url);
              });
            },
            (err) => {
              console.log(err);
            },
            () => {
              // console.log(this.ClientForm.value);
              //console.log('another');
              this.service.CreateShop(this.ClientForm.value).subscribe(
                (res) => {
                  console.log(res);
                  alert(res.body);
                  this.router.navigate(['complex/' + res.shopOwnerInstaId]);
                },
                (err) => console.log(err)
              );
            }
          );
      });
  }
  setDisable(i) {
    this.ProductDetails = this.ClientForm.get('ProductDetails') as FormArray;
    if (!this.ProductDetails.value[i]['productAvailability']) {
      console.log();
      this.ProductDetails['controls'][i].disable();
    } else {
      this.ProductDetails['controls'][i].enable();
    }

    this.ClientForm.get('ProductDetails')['controls'][i]['controls'][
      'productAvailability'
    ].enable();
  }
  see() {
    this.ProductDetails = this.ClientForm.get('ProductDetails') as FormArray;
    // console.log(this.ProductDetails.value);
    // console.log(this.deletedProducts);
    // console.log(this.dummyProducts);
    // console.log(this.dummyLogo);
    // console.log(this.ClientForm);
    //this.ClientForm.get('ProductDetails').disable()
    console.log(this.ClientForm);
  }
}
