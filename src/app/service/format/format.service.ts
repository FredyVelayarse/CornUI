import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../../service/data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; 
import { FileDataUploadFile } from "../../model/format/format.model";


@Injectable()
export class FormatService {
  url: string = environment.BASE_API_URL + '/Format';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  insertData(fileData: FileDataUploadFile): Observable<ServiceResultGeneric<FileDataUploadFile>> {
    const url = `${this.url}/InsertData`;
      return this.httpClient.post<ServiceResultGeneric<FileDataUploadFile>>(url, fileData, this.dataService.generarCabeceraToken());
  }
}