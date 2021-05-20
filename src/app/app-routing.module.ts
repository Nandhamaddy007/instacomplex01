import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddShopAndProductsFormComponent } from './add-shop-and-products-form/add-shop-and-products-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CheckStatusComponent } from './check-status/check-status.component';
import { ShopViewComponent } from './shop-view/shop-view.component';

const routes: Routes = [
  { path: 'UpdateShop/:shopName', component: AddShopAndProductsFormComponent },
  { path: 'admin/:shopName', component: AdminDashboardComponent },
  { path: 'AddShop', component: AddShopAndProductsFormComponent },
  { path: 'complex/:shopName', component: ShopViewComponent },
  { path: 'complex', component: ShopViewComponent },
  { path: 'checkStatus', component: CheckStatusComponent },
  { path: '**', redirectTo: 'complex' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
