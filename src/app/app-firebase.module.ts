import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { NgModule } from '@angular/core';

import { environment } from '../environment';

@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
  exports: [AngularFireModule, AngularFireAuthModule],
})
export class AppFirebaseModule {}
