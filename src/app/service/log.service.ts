import { Injectable } from "@angular/core";

@Injectable()
export class LogService{
    printMessage(titulo: string, mensaje: string, obj:any){
        console.log(`${titulo}: ${mensaje} ===> `, obj);
    }
}