import { Component, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { BackendTalkerService } from './backend-talker.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { authState } from 'rxfire/auth';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Shopname;
  ProfilePic;
  userData;
  constructor(
    private route: ActivatedRoute,
    private service: BackendTalkerService,
    public socialAuthService: SocialAuthService // public auth:AngularFireAuth
  ) {}
  ngOnInit() {
    this.ProfilePic = localStorage.getItem('picture');
  }
  GoogleSignIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => { 
      this.socialAuthService.authState.subscribe(user=>this.userData=user)
    });
  }
  GoogleSignOut() {
    this.socialAuthService.signOut();
  }
  check(){
    console.log(this.userData)
  }
}
