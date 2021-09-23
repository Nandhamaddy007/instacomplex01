import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddShopAndProductsFormComponent } from './add-shop-and-products-form/add-shop-and-products-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CheckStatusComponent } from './check-status/check-status.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { AdminGuardGuard } from './admin-guard.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'AddShop', component: AddShopAndProductsFormComponent },
  { path: 'complex/:shopOwnerInstaId', component: ShopViewComponent },
  { path: 'complex', component: ShopViewComponent },
  { path: 'checkStatus', component: CheckStatusComponent },
  {
    path: 'admin/:shopOwnerInstaId',
    component: AdminDashboardComponent,
    canActivate: [AdminGuardGuard],
  },
  {
    path: 'UpdateShop/:shopOwnerInstaId',
    component: AddShopAndProductsFormComponent,
    canActivate: [AdminGuardGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
