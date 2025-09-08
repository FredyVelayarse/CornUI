export class TokenInfo{
    constructor(
        public id:number,
        public typeUser:number,
        public access_Token:string,
        public token_Type:string,
        public expires_In:number
    ){}
}