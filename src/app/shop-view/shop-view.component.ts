import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
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
  ngOnInit() {
    let id = this.route.snapshot.params.ShopName;
    this.service.GetShop(id).subscribe(
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
    this.Cart[i] = product;
    this.Cart[i].count = 1;
    this.Cart[i].price = price;
    console.log(this.Cart);
  }
  changeCount(value, i) {
    this.Cart[i].count = value;
  }
}
