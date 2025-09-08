import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenInfo } from '../../model/token.info';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn: boolean = false;
    url: string = environment.BASE_API_URL;

    constructor(private httpClient: HttpClient) {}

    TokeGenerator(usuario: User): Observable<TokenInfo> {
        console.info(usuario);
        return this.httpClient.post<TokenInfo>(this.url + '/auth/token', usuario);
    }

    UserValidate(usuario: User): Observable<User> {
        return this.httpClient.post<User>(`${this.url}/user/validateUser`, usuario);
    }

    setToken(tokenResponse: any) { 
        if (!tokenResponse || !tokenResponse.access_Token || !tokenResponse.usuario) {
            console.error("❌ Error: Token inválido o respuesta incorrecta", tokenResponse);
            return;
        }
    
        const token = tokenResponse.access_Token;
        const expiresInMinutes = 60; // Ajusta según el backend
        const expiryTime = Date.now() + expiresInMinutes * 60 * 1000;
    
        localStorage.setItem('token', token);
        localStorage.setItem('token_expiry', expiryTime.toString());
        localStorage.setItem('typeUser', tokenResponse.usuario.typeUser || '');
        localStorage.setItem('idUser', tokenResponse.usuario.id || '');
    
        console.log(" Token almacenado correctamente:", token);
    }
    
    

    isTokenExpired(): boolean {
        const expiry = localStorage.getItem('token_expiry');
        if (expiry) {
          return Date.now() > parseInt(expiry);
        }
        return true; 
    }

    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('typeUser'); // Elimina el tipo de usuario
    }

    getToken(): TokenInfo {
        const token = localStorage.getItem('token');
        if (token) {
            return { access_Token: token } as TokenInfo; 
        } else {
            return new TokenInfo(0, 0, '', '', 0);
        }
    }

    getUserType(): number {
        const typeUser = localStorage.getItem('typeUser');
        if (typeUser) {
            return JSON.parse(typeUser);
        }
        return 0; 
    }

    getUserId(): number {
        const idUser = localStorage.getItem('idUser');
        if (idUser) {
            return JSON.parse(idUser);
        }
        return 0; 
    }

    login(usuarioLogueado: User) {
        console.log('Llamada de authService.login()');
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('emailUser', usuarioLogueado.Email);
        window.localStorage.setItem('user', JSON.stringify(usuarioLogueado));
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('token');
        localStorage.removeItem('typeUser');
        localStorage.removeItem('idUser');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('emailUser');
        localStorage.removeItem('token_expiry');
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (!token || this.isTokenExpired()) {
          this.logout();
          return false;
        }
        const isLogged = localStorage.getItem('isLoggedIn');
        return isLogged === 'true';
    }

    public getUser(): any {
        const user = window.localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }
}