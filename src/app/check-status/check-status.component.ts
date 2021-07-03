import { Component, OnInit } from '@angular/core';
import { BackendTalkerService } from '../backend-talker.service';

@Component({
  selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.css']
})
export class CheckStatusComponent implements OnInit {
  constructor(private service: BackendTalkerService) {}
  orderId;
  ngOnInit() {
    console.log(String(new Date().getFullYear()));
  }
  getOrderStatus() {
    //INC0307O2
    this.service.getOrderStatus(this.orderId).subscribe(res => {
      console.log(res);
    });
  }
}
