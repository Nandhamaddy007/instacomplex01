import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddShopAndProductsFormComponent } from './add-shop-and-products-form/add-shop-and-products-form.component';

const routes: Routes = [
  { path: 'AddShop/:ShopName', component: AddShopAndProductsFormComponent },
  { path: 'AddShop', component: AddShopAndProductsFormComponent },
  { path: '**', redirectTo: 'AddShop' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
