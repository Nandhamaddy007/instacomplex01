import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddShopAndProductsFormComponent } from './add-shop-and-products-form/add-shop-and-products-form.component';
import { ShopViewComponent } from './shop-view/shop-view.component';

const routes: Routes = [
  { path: 'AddShop/:shopName', component: AddShopAndProductsFormComponent },
  { path: 'AddShop', component: AddShopAndProductsFormComponent },
  { path: 'complex/:shopName', component: ShopViewComponent },
  { path: '**', redirectTo: 'AddShop' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
