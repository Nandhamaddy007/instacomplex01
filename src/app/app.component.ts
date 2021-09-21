import { Component, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { BackendTalkerService } from './backend-talker.service';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { authState } from 'rxfire/auth';
import { map, tap } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service'

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
    private router: Router,
    private cookie:CookieService,
    public socialAuthService: SocialAuthService // public auth:AngularFireAuth
  ) {}
  ngOnInit() {
    this.ProfilePic = localStorage.getItem('picture');
  }
  GoogleSignIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.socialAuthService.authState.subscribe((user) => {
        this.userData = user;
        this.service.getToken(user.email).subscribe(
          (data) => console.log(data),
          (err) => {
            console.log(err);
            this.router.navigate(['/complex']);
          }
        );
      });
    });
  }
  GoogleSignOut() {
    this.socialAuthService.signOut();
    this.userData = null;
    this.router.navigate(['/complex']);
  }
  check() {
    return this.socialAuthService.authState.pipe(
      map((socialUser: SocialUser) => !!socialUser),
      tap((isLoggedIn: boolean) => {})
    );
  }
  test(){
console.log(this.cookie.get("token"))
  }
}
