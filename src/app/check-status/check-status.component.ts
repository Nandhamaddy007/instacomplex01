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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = String(today.getFullYear());
    this.service.getOrderCount(`${dd}-${mm}-${yyyy}`).subscribe(res => {
      console.log(res);
    });
  }
}
