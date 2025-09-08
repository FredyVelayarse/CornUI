import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../../service/data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; // Asegúrate de que esta importación sea correcta
import { Cliente } from "../../model/cliente/cliente.model";


@Injectable()
export class ClienteService {
  urlUser: string = environment.BASE_API_URL + '/Client';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  loadClientes(): Observable<ServiceResultGeneric<Cliente[]>> {
    return this.httpClient.get<ServiceResultGeneric<Cliente[]>>(this.urlUser, this.dataService.generarCabeceraToken());
  }

  saveCliente(cliente: Cliente): Observable<ServiceResultGeneric<Cliente>> {
    return this.httpClient.post<ServiceResultGeneric<Cliente>>(this.urlUser, cliente, this.dataService.generarCabeceraToken());
  }
  
}