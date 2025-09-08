import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; // Asegúrate de que esta importación sea correcta
import { Seed } from "../../model/seed/seed.model";


@Injectable()
export class SeedService {
  url: string = environment.BASE_API_URL + '/seed';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  getById(id: number): Observable<ServiceResultGeneric<Seed[]>> {
    return this.httpClient.get<ServiceResultGeneric<Seed[]>>(this.url +'/'+ id, this.dataService.generarCabeceraToken());
  }
}