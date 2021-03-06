import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
// import { SocialAuthService } from 'angularx-social-login';
// import { SocialUser } from 'angularx-social-login/public-api';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AdminGuardGuard implements CanActivate {
  constructor(
    //private socialAuth: SocialAuthService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    var token = localStorage.getItem('token');
    if (token) {
      let expire = localStorage.getItem('expiresIn');
      if (new Date().getTime() < Number(expire)) {
        return true;
      } else {
        alert('Token expired... \n Please login again');
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('m');
        localStorage.removeItem('i');
        this.router.navigate(['login']);
      }
    }

    this.router.navigate(['login']);
    return false;
    // this.socialAuth.authState.pipe(
    //   map((socialUser: SocialUser) =>
    //     !!socialUser
    //   ),
    //   tap((isLoggedIn: boolean) => {
    //     if (!isLoggedIn) {
    //       alert('Unauthorized access!!');
    //       this.router.navigate(['/complex']);
    //     }else{
    //       console.log(this.cookie.getAll())
    //     }
    //   })
    // );
    // return true;
  }
}
