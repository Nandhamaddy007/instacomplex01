import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ngOnInit() {
    let id = this.route.snapshot.params.ShopName;
    this.service.GetShop(id).subscribe(
      data1 => {
        let data = this.service.decryptData(data1.body);
        this.Products = data.ProductDetails;
        this.Pricelist = [this.Products.length];
      },
      err => {}
    );
  }
  getPrice(index, j) {
    console.log(index);
    console.log(this.Products[index]['ProductVariance'][j]);
  }
  disp() {
    console.log(this.Pricelist);
  }
}
