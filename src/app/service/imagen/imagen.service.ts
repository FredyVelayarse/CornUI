import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; 
import { Imagen } from "../../model/imagen/imagen.model";


@Injectable()
export class ImagenService {
  url: string = environment.BASE_API_URL + '/imagen';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  getById(id: number): Observable<ServiceResultGeneric<Imagen[]>> {
    return this.httpClient.get<ServiceResultGeneric<Imagen[]>>(this.url +'/'+ id, this.dataService.generarCabeceraToken());
  }
}