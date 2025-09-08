export class UsersEdit{
    constructor(
        public id:number,
        public names:string,
        public lastName:string,
        public nameUser:string,
        public contac:string,
        public address:string,
        public dni:string,
        public typeUser:number,
        public detail1?: string, //code - profesion
        public detail2?: string, //escuela
        public detail3?: string,
    ){}
}