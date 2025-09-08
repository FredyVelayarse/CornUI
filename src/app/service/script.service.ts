import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScriptService{
    
  constructor(/*private _renderer2: Renderer2,*/ @Inject(DOCUMENT) private _document: Document){
  }

  public loadScript(id:string, route: string) {
      return new Promise((resolve, reject) => {
          if(id == null || id == ''){
              reject({id:id, loaded:false, status:'Error, no se cargó el javascript'});
          }
          else if(id && document.getElementById(id)){
              resolve({id:id, loaded: true, status:'Ya se encontraba cargado'});
          }
          else{
              let body = this._document.body;
              let script = this._document.createElement('script');
              script.innerHTML = '';
              script.type = "text/javascript";
              script.id = id;
              script.src = route;
              script.async = true;
              script.defer = true;
              script.onload = (event) => {
                  resolve({id:id, loaded: true, status:'Cargado!'});
              }
              script.onerror = (error)=>{
                  reject({id:id, loaded:false, status:'Error, no se cargó el javascript'});
              }
              body.appendChild(script);
              //this._renderer2.appendChild(body,script);
          }
      });
  }

  public removeScript(id: string){
      let script = this._document.getElementById(id);
      if(script){
          script.remove();
      }
  }
}