export class ResponseResult{
    constructor(
        public id:string, 
        public estado:string, 
        public mensaje:string, 
        public data:any /*Object*/ 
    ){}
}