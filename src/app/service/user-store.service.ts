import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UserStoreService{
    private iduser$=new BehaviorSubject<string>("");
    private idcentro$=new BehaviorSubject<string>("");
    private fullName$=new BehaviorSubject<string>("");
    private role$=new BehaviorSubject<string>("");

    constructor(){}
    public getIdUserFromStore(){
        return this.iduser$.asObservable();
    }
    public setIdUserForStore(iduser:string){
        this.iduser$.next(iduser);
    }
    public getIdCentroFromStore(){
        return this.idcentro$.asObservable();
    }
    public setIdCentroForStore(idcentro:string){
        this.idcentro$.next(idcentro);
    }
    public getRoleFromStore(){
        return this.role$.asObservable();
    }
    public setRoleForStore(role:string){
        this.role$.next(role);
    }

    public getFullNameFromStore(){
        return this.fullName$.asObservable();
    }
    public setFullNameForStore(fullName:string){
        this.fullName$.next(fullName);
    }
}