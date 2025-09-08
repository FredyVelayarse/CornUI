import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class DataService {
    constructor(private authService: AuthService) { }

    generarCabeceraToken() {
        const token = this.authService.getToken()?.access_Token || ''; // Extraemos solo el access_Token
        return {
            headers: new HttpHeaders(
                token ? { "Authorization": `Bearer ${token}` } : {} // Si no hay token, no añade el header
            )
        };
    }
}
