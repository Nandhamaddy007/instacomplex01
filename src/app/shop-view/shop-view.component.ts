import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}
  Products: Array<Object>;
  Cart;
  shopName;
  ngOnInit() {
    this.shopName = this.route.snapshot.params.shopName;
    this.service.GetShop(this.shopName).subscribe(
      data1 => {
        let data = this.service.decryptData(data1.body);
        this.Products = data.ProductDetails;
        this.Cart = {};
      },
      err => {}
    );
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
      productColor: product.productColor
    };
    this.Cart[i][price] = temp;
    console.log(this.Cart);
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
}
