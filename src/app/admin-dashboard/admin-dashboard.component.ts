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
  //INC0207O4
  shopName;
  orders;
  AllOrders;
  status;
  shipmentId;
  ngOnInit() {
    this.status = [];
    this.shipmentId = [];
    this.shopName = this.route.snapshot.params.shopOwnerInstaId;
    this.service.getOrdersByShop(this.shopName).subscribe(
      data => {
        this.AllOrders = this.service.decryptData(data.body);
        for (let order of this.AllOrders) {
          this.status.push(order['status']);
          this.shipmentId.push(order['shipmentId']);
        }
        this.filterByStatus('Pending');
        console.log(this.filterByStatus('Pending'), this.status);
      },
      err => console.log(err)
    );
  }
  filterByStatus(status) {
    this.orders = this.AllOrders.filter((item, index) => {
      return item['status'] == status;
    });
  }
  updateStatus(i) {
    console.log(this.orders[i].status);
    let temp = {
      orderId: this.orders[i].orderId,
      status: this.orders[i].status,
      shipmentId: this.orders[i].shipmentId
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
