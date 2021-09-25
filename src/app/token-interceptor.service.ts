import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log();
    let token = localStorage.getItem('token');
    if (token && req.url.includes('/secure')) {
      let dupe = req.clone({
        headers: req.headers.set('Authorization', token),
      });
      return next.handle(dupe);
    }
    return next.handle(req);
  }
}
