import { Component, VERSION } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { BackendTalkerService } from './backend-talker.service';
// import {
//   GoogleLoginProvider,
//   SocialAuthService,
//   SocialUser,
// } from 'angularx-social-login';
import { authState } from 'rxfire/auth';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Shopname;
  ProfilePic;
  userData;
  showlogin: boolean;
  showlogout: boolean;
  constructor(
    private route: ActivatedRoute,
    private service: BackendTalkerService,
    private auth: AuthService,
    private router: Router //public socialAuthService: SocialAuthService // public auth:AngularFireAuth
  ) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        if (event['url'] == '/login') {
          this.showlogin = false;
        } else {
          if (localStorage.getItem('token')) {
            this.showlogin = false;
            this.showlogout = true;
          } else {
            this.showlogin = true;
            this.showlogout = false;
          }
        }
      }
    });
  }
  logout() {
    this.auth.Logout(this.auth.getMail()).subscribe((data) => {
      alert(data['Msg']);
      this.showlogin = true;
      this.showlogout = false;
      this.auth.removeLoginDetails();
      this.router.navigate(['complex']);
    });
  }
  GoogleSignIn() {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
    //   this.socialAuthService.authState.subscribe((user) => {
    //     this.userData = user;
    //     this.service.getToken(user.email).subscribe(
    //       (data) => console.log(data),
    //       (err) => {
    //         console.log(err);
    //         this.router.navigate(['/complex']);
    //       }
    //     );
    //   });
    // });
  }
  GoogleSignOut() {
    // this.socialAuthService.signOut();
    // this.userData = null;
    // this.router.navigate(['/complex']);
  }
  check() {
    // return this.socialAuthService.authState.pipe(
    //   map((socialUser: SocialUser) => !!socialUser),
    //   tap((isLoggedIn: boolean) => {})
    // );
  }
  test() {
    //console.log(this.cookie.get("token"))
  }
}
