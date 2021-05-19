import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendTalkerService } from '../../backend-talker.service';

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
  userDetails: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: BackendTalkerService
  ) {}
  ngOnInit(): void {
    this.userDetails = this.formBuilder.group({
      shopperName: ['', Validators.required],
      shopperMobile: ['', [Validators.required, Validators.max(100000000000)]],
      shopperMail: ['', [Validators.required, Validators.email]],
      shopperAddress: ['', Validators.required]
    });
  }
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
    let data = {};
    data['orderId'] = this.orderId;
    data['products'] = this.keys;
    data['CustDetails'] = this.userDetails.value;
    this.service.placeOrder(data).subscribe(data => {
      console.log(data), err => console.log(err);
    });
  }
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
