import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendTalkerService } from '../../backend-talker.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  keys = [];
  total = 0;
  orderId = '';
  prevOrder = '';
  @Output() cartToView = new EventEmitter<string>();
  @Input() cartValue: any;
  userDetails: FormGroup;
  message;
  constructor(
    private formBuilder: FormBuilder,
    private service: BackendTalkerService
  ) {}
  ngOnInit(): void {
    this.message = '';
    this.userDetails = this.formBuilder.group({
      shopperName: ['', Validators.required],
      shopperMobile: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
      shopperMail: ['', [Validators.required, Validators.email]],
      shopperAddress: ['', Validators.required],
    });
  }
  f() {
    this.keys = [];
    this.total = 0;
    this.orderId = '';
    console.log(this.cartValue);
    let temp = Object.keys(this.cartValue);
    console.log(temp);
    for (let lvl1 of temp) {
      console.log(lvl1);
      if (typeof this.cartValue[lvl1] === 'string') {
        continue;
      }
      console.log(Object.keys(this.cartValue[lvl1]));
      for (let lvl2 of Object.keys(this.cartValue[lvl1])) {
        let t = +this.cartValue[lvl1][lvl2].price
          .split('-')[1]
          .replace('Rs.', '');
        t = this.cartValue[lvl1][lvl2].count * t;
        this.total += t;
        this.keys.push(this.cartValue[lvl1][lvl2]);
      }
    }
    //console.log(this.keys);
  }
  placeOrder() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = String(today.getFullYear());
    var fulldate = `${dd}-${mm}-${yyyy}`;
    this.service.getOrderCount(fulldate).subscribe(
      (data1) => {
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = String(today.getFullYear());
        this.orderId = 'INC' + dd + mm + 'O' + data1['cnt'];
        let data = {};
        data['orderId'] = this.orderId;
        data['products'] = this.keys;
        data['custDetails'] = this.userDetails.value;
        data['shopOwnerInstaId'] = this.cartValue.shopOwnerInstaId;
        data['total'] = this.total;
        data['status'] = 'Pending';
        data['orderedDate'] = fulldate;
        this.service.placeOrder(data).subscribe(
          (data) => {
            console.log(data);
            //alert(data['msg']);
            this.message = data['msg'];
            this.userDetails.reset();
            this.keys = [];
            this.cartToView.emit(this.orderId);
          },
          (err) => console.log(err)
        );
      },
      (err) => console.log(err)
    );
  }
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
