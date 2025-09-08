import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../../service/data.service";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { ServiceResultGeneric } from "../../model/result.info"; // Asegúrate de que esta importación sea correcta
import { Variety } from "../../model/variety/variety.model";


@Injectable()
export class FileService {
  url: string = environment.BASE_API_URL + '/File';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  /**
   * Método para subir un archivo con un nombre personalizado.
   * @param file Archivo a cargar.
   * @param customFileName Nombre personalizado del archivo.
   * @returns Observable con el resultado del servicio.
   */
  uploadFile(file: File, customFileName: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, `${customFileName}.pdf`); // El archivo con el nombre adecuado
    formData.append('customFileName', customFileName); // Enviar también el ID como customFileName
  
    return this.httpClient.post<any>(`${this.url}/upload`, formData);
  }

  /**
   * Método para eliminar un archivo.
   * @param fileName Nombre del archivo a eliminar.
   * @returns Observable con el resultado del servicio.
   */
  deleteFile(fileName: string): Observable<ServiceResultGeneric<boolean>> {
    const url = `${this.url}/delete/${fileName}`;
    return this.httpClient.delete<ServiceResultGeneric<boolean>>(
      url,
      this.dataService.generarCabeceraToken()
    );
  }

  /**
   * Método para obtener un archivo.
   * @param fileName Nombre del archivo a obtener.
   * @returns Observable con el archivo en formato `Blob`.
   */
  getFile(filePath: string): Observable<Blob> {
    const url = `${this.url}/download?filePath=${encodeURIComponent(filePath)}`;
    return this.httpClient.get(url, {
      ...this.dataService.generarCabeceraToken(),
      responseType: 'blob', // Indica que la respuesta es un archivo binario.
    });
  }
}