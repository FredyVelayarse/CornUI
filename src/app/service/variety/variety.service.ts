import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; // Asegúrate de que esta importación sea correcta
import { Variety } from "../../model/variety/variety.model";


@Injectable()
export class VarietyService {
  url: string = environment.BASE_API_URL + '/variety';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  loadVariety(): Observable<ServiceResultGeneric<Variety[]>> {
    const urlVariety = `${this.url}/all`;
    return this.httpClient.get<ServiceResultGeneric<Variety[]>>(urlVariety, this.dataService.generarCabeceraToken());
  }

  saveVariety(formData: FormData): Observable<ServiceResultGeneric<Variety>> {
    return this.httpClient.post<ServiceResultGeneric<Variety>>(
        this.url,
        formData,this.dataService.generarCabeceraToken()
    );
}
  getById(id: number): Observable<ServiceResultGeneric<Variety[]>> {
    return this.httpClient.get<ServiceResultGeneric<Variety[]>>(this.url +'/'+ id, this.dataService.generarCabeceraToken());
  }
  addDescription(id: number, description: string): Observable<ServiceResultGeneric<boolean>> {
    const body = { description };  // Enviar como JSON
    return this.httpClient.put<ServiceResultGeneric<boolean>>(`${this.url}/${id}`, body, this.dataService.generarCabeceraToken());
  }

  deleteVariety(id: number): Observable<ServiceResultGeneric<boolean>> {
    return this.httpClient.delete<ServiceResultGeneric<boolean>>(this.url + '/' + id, this.dataService.generarCabeceraToken());
  }
}