export class Email {
    constructor(
       public to:string,
       public subject:string,
       public body:string,
       public isHtml?:boolean
    ){}      
}