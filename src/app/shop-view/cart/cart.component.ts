import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  keys = [];
  total = 0;
  orderId = '';
  orderCount = 1;
  @Input() cartValue: any;
  constructor() {}
  f() {
    this.keys = [];
    this.total = 0;
    console.log(Object.values(this.cartValue));
    let temp = Object.values(this.cartValue);
    for (let lvl1 of temp) {
      //console.log(Object.values(lvl1));
      for (let lvl2 of Object.values(lvl1)) {
        let t = +lvl2.price.split('-')[1].replace('Rs.', '');
        t = lvl2.count * t;
        this.total += t;
        this.keys.push(lvl2);
      }
    }
    //console.log(this.keys);
  }
  placeOrder() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    this.orderId = 'INC' + dd + mm + 'O' + this.orderCount;
    //console.log(this.orderId);
  }
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  ngOnInit() {}
}
