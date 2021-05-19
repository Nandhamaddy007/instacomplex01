import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BackendTalkerService } from '../backend-talker.service';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {
  constructor(
    private service: BackendTalkerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  Products: Array<Object>;
  Cart;
  currOrder = '';
  shopName = '';
  allShops;
  ngOnInit() {
    this.shopName = this.route.snapshot.params.shopName;
    //console.log(this.shopName);
    if (this.shopName) {
      this.service.GetShop(this.shopName).subscribe(
        data1 => {
          //console.log(data1);
          let data = this.service.decryptData(data1.body);
          //console.log(data);
          if (data != null) {
            this.Products = data.ProductDetails;
            this.Cart = {};
          } else {
            this.router.navigate(['complex']);
          }
        },
        err => {}
      );
    } else {
      this.service.getAllShops().subscribe(data => {
        this.allShops = this.service.decryptData(data.body);
        console.log(this.allShops);
      });
    }
  }
  AddProductToCart(product, i, price) {
    //this.Cart[i].ProdID=product.ProdID
    if (!this.Cart[i]) {
      this.Cart[i] = {};
    }
    var temp = {
      productName: product.productName,
      price: price,
      count: 1,
      productColor: product.productColor,
      shopName: this.shopName
    };
    this.Cart[i][price] = temp;
    //console.log(this.Cart);
  }
  changeCount(value, i, size) {
    console.log(this.Cart);
    if (this.Cart[i] != undefined && this.Cart[i][size] != undefined) {
      this.Cart[i][size].count = value;
    }
  }
  removeProduct(i, price) {
    //console.log(price);
    let c = confirm(
      'Are you sure want to remove?? It is just ' + price.split('-')[1]
    );
    if (c) delete this.Cart[i];
    //console.log(this.Cart);
  }
  fromCart(Oid: string) {
    this.Cart = {};
    this.currOrder = Oid;
  }
}
