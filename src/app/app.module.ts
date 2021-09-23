import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environment';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { NgxImageCompressService } from 'ngx-image-compress';
//import { AppFirebaseModule } from './app-firebase.module';
// import {
//   GoogleLoginProvider,
//   SocialLoginModule,
//   SocialAuthServiceConfig,
// } from 'angularx-social-login';

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
import { ImageProcessingService } from './image-processing.service';
import { AdminGuardGuard } from './admin-guard.guard';

const googleLoginOptions = {
  scope: 'profile email',
};
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    //SocialLoginModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    AddShopAndProductsFormComponent,
    ShopViewComponent,
    PricePipe,
    CartComponent,
    AdminDashboardComponent,
    CheckStatusComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    BackendTalkerService,
    NgxImageCompressService,
    ImageProcessingService,
    AdminGuardGuard,
    
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: true, //keeps the user signed in
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '841021988909-76o0jt8lkkdchknitjtvf8r7ea362fft.apps.googleusercontent.com',
    //           googleLoginOptions
    //         ),
    //       },
    //     ],
    //   } as SocialAuthServiceConfig,
   // },
  ],
})
export class AppModule {}
