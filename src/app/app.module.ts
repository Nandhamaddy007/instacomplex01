import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BackendTalkerService } from './backend-talker.service';
import { AddShopAndProductsFormComponent } from './add-shop-and-products-form/add-shop-and-products-form.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule,ReactiveFormsModule,HttpClientModule],
  declarations: [AppComponent, HelloComponent, AddShopAndProductsFormComponent],
  bootstrap: [AppComponent],
  providers: [BackendTalkerService]
})
export class AppModule {}
