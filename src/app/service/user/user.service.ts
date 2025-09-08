import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { environment } from "src/app/environment/environment";
import { Observable } from "rxjs";
import { Users } from "src/app/model/user/users.model";
import { ServiceResultGeneric } from "src/app/model/result.info"; // Asegúrate de que esta importación sea correcta
import { DetailUser } from "src/app/model/user/detailUser.model";
import { UsersEdit } from "src/app/model/user/userEdit.model";
import { ChangePassword } from "src/app/model/user/changePassword.model";

@Injectable()
export class UserService {
  urlUser: string = environment.BASE_API_URL + '/user';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  loadUsers(): Observable<ServiceResultGeneric<Users[]>> {
    const url = `${this.urlUser}/all`;
    const headers = this.dataService.generarCabeceraToken();
    
    return this.httpClient.get<ServiceResultGeneric<Users[]>>(url, headers);
  }

  searchUser(valor: string): Observable<ServiceResultGeneric<Users[]>> {
    return this.httpClient.get<ServiceResultGeneric<Users[]>>(this.urlUser + '/buscar?email=' + valor, this.dataService.generarCabeceraToken());
  }

  searchUserId(id: number): Observable<ServiceResultGeneric<Users>> {
    return this.httpClient.get<ServiceResultGeneric<Users>>(this.urlUser + '/' + id, this.dataService.generarCabeceraToken());
  }
  searchDetailUserId(id: number): Observable<ServiceResultGeneric<DetailUser>> {
    return this.httpClient.get<ServiceResultGeneric<DetailUser>>(this.urlUser + '/DetailUser/' + id, this.dataService.generarCabeceraToken());
  }

  saveUser(users: Users): Observable<ServiceResultGeneric<Users>> {
    return this.httpClient.post<ServiceResultGeneric<Users>>(this.urlUser, users, this.dataService.generarCabeceraToken());
  }

  modifyUser(users: Users): Observable<ServiceResultGeneric<Users>> {
    return this.httpClient.put<ServiceResultGeneric<Users>>(
      `${this.urlUser}/${users.id}`, // Asegúrate que `users` tiene el campo `id`
      users,
      this.dataService.generarCabeceraToken()
    );
  }

  changePassword(data: ChangePassword): Observable<ServiceResultGeneric<any>> {
    return this.httpClient.put<ServiceResultGeneric<any>>(
      `${this.urlUser}/change-password`,
      data,
      this.dataService.generarCabeceraToken()
    );
  }

  deleteUser(id: number): Observable<ServiceResultGeneric<Users>> {
    return this.httpClient.delete<ServiceResultGeneric<Users>>(this.urlUser + '/' + id, this.dataService.generarCabeceraToken());
  }
}