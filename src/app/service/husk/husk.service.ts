import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; // Asegúrate de que esta importación sea correcta
import { Husk } from "../../model/husk/husk.model";


@Injectable()
export class HuskService {
  url: string = environment.BASE_API_URL + '/husk';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  getById(id: number): Observable<ServiceResultGeneric<Husk[]>> {
    return this.httpClient.get<ServiceResultGeneric<Husk[]>>(this.url +'/'+ id, this.dataService.generarCabeceraToken());
  }
}