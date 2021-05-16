import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  keys = [];
  total = 0;
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
    console.log(this.keys);
  }
  ngOnInit() {}
}
