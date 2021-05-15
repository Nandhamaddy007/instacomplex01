import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  keys = [];
  @Input() cartValue: any;
  constructor() {}
  f() {
    this.keys=[]
    console.log(Object.values(this.cartValue));
    let temp = Object.values(this.cartValue);
    for (let lvl1 of temp) {
      console.log(Object.values(lvl1));
      for (let lvl2 of Object.values(lvl1)) {
        console.log(lvl2);
        this.keys.push(lvl2);
      }
    }
    console.log(this.keys);
  }
  ngOnInit() {}
}
