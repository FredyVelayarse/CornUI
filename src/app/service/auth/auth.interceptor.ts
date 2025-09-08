import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Evitar interferir con el login o registro
    if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    }

    // Verificar si el token ha expirado
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
      return next.handle(req);
    }

    const token = this.authService.getToken()?.access_Token || '';

    if (token) {
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
