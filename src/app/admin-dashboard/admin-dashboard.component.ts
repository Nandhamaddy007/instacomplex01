import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendTalkerService } from '../backend-talker.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: BackendTalkerService
  ) {}
  shopName;
  orders;
  status;
  shipmentId;
  ngOnInit() {
    this.status = [];
    this.shipmentId = [];
    this.shopName = this.route.snapshot.params.shopName;
    this.service.getOrdersByShop(this.shopName).subscribe(
      data => {
        this.orders = this.service.decryptData(data.body);
        for (let order of this.orders) {
          this.status.push(order['status']);
          this.shipmentId.push(order['shipmentId']);
        }
        console.log(this.orders);
      },
      err => console.log(err)
    );
  }
  updateStatus(i) {
    //console.log(this.orders[i].orderId);
    let temp = {
      orderId: this.orders[i].orderId,
      status: this.status[i],
      shipmentId: this.shipmentId[i]
    };

    console.log(temp);
    this.service.updateOrderById(temp).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  }
}
