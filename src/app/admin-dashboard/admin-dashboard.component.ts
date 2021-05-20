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
  ngOnInit() {
    this.shopName = this.route.snapshot.params.shopName;
    this.service.getOrdersByShop(this.shopName).subscribe(
      data => {
        this.orders = this.service.decryptData(data.body);
        console.log(this.orders);
      },
      err => console.log(err)
    );
  }
}
