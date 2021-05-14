import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
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
  Pricelist;
  Cart;
  ngOnInit() {
    let id = this.route.snapshot.params.ShopName;
    this.service.GetShop(id).subscribe(
      data1 => {
        let data = this.service.decryptData(data1.body);
        this.Products = data.ProductDetails;
        this.Pricelist = new FormControl({});
        this.Cart = {};
      },
      err => {}
    );
  }
  AddProductToCart(product, i) {
    //this.Cart[i].ProdID=product.ProdID
    this.Cart[i] = product;
    console.log(this.Pricelist[i]);
    this.Cart[i].count = 1;
    console.log(this.Cart);
  }
  changePriceList(value, i) {
    this.Pricelist[i] = value;
  }
  changeCount(value, i) {
    this.Cart[i].count = value;
    console.log(this.Cart);
  }
}
