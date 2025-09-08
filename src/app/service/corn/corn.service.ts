import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; // Asegúrate de que esta importación sea correcta
import { Corn } from "../../model/corn/corn.model";


@Injectable()
export class CornService {
  url: string = environment.BASE_API_URL + '/corn';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  getById(id: number): Observable<ServiceResultGeneric<Corn[]>> {
    return this.httpClient.get<ServiceResultGeneric<Corn[]>>(this.url +'/'+ id, this.dataService.generarCabeceraToken());
  }
  getDispersionData(varietyId: number): Observable<any> {
    return this.httpClient.get(`${this.url}/dispersion-corn/${varietyId}`);
  }
}