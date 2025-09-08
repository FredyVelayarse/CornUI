import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; 
import { Husk } from "../../model/husk/husk.model";
import { Localitation } from "src/app/model/localitation/localitacion.model";


@Injectable()
export class LocalitationService {
  url: string = environment.BASE_API_URL + '/localizacion';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  updateLocalitation(localitation: Localitation): Observable<ServiceResultGeneric<Localitation[]>> {
    return this.httpClient.put<ServiceResultGeneric<Localitation[]>>(this.url, localitation, this.dataService.generarCabeceraToken());
  }

  saveLocalitation(localitation: Localitation): Observable<ServiceResultGeneric<Localitation>> {
    return this.httpClient.post<ServiceResultGeneric<Localitation>>(
        `${this.url}/create`, // Asegura la URL correcta
        localitation,
        this.dataService.generarCabeceraToken()
    );
}

  getById(id: number): Observable<ServiceResultGeneric<Localitation[]>> {
    return this.httpClient.get<ServiceResultGeneric<Localitation[]>>(this.url +'/'+ id, this.dataService.generarCabeceraToken());
  }

  delete(id: number): Observable<ServiceResultGeneric<boolean>> {
    return this.httpClient.delete<ServiceResultGeneric<boolean>>(this.url + '/' + id, this.dataService.generarCabeceraToken());
  }
}