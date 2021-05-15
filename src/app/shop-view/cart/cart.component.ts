import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  keys;
  @Input() cartValue: any;
  constructor() {}
  f() {
    console.log(this.cartValue);
    this.keys = Object.keys(this.cartValue);
  }
  ngOnInit() {}
}
