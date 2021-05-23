import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environment';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { NgxImageCompressService } from 'ngx-image-compress';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BackendTalkerService } from './backend-talker.service';
import { AddShopAndProductsFormComponent } from './add-shop-and-products-form/add-shop-and-products-form.component';
import { AppRoutingModule } from './app-routing.module';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { PricePipe } from './shop-view/price.pipe';
import { CartComponent } from './shop-view/cart/cart.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CheckStatusComponent } from './check-status/check-status.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud')
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    AddShopAndProductsFormComponent,
    ShopViewComponent,
    PricePipe,
    CartComponent,
    AdminDashboardComponent,
    CheckStatusComponent
  ],
  bootstrap: [AppComponent],
  providers: [BackendTalkerService]
})
export class AppModule {}
