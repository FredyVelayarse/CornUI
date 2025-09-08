import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Verifica si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      const requiredUserType = route.data['requiredUserType'] as number;
      
      // Verifica si el usuario tiene el tipo de usuario requerido
      if (requiredUserType && this.authService.getUserType() !== requiredUserType) {
        console.warn('Acceso denegado: el usuario no tiene el tipo de usuario requerido.');
        this.router.navigate(['/acceso-denegado']);
        return false;
      }
      return true;
    } else {
      console.warn('Acceso denegado: el usuario no está autenticado.');
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}