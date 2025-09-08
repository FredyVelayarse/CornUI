export class Users{
    constructor(
        public id:number,
        public names:string,
        public lastName:string,
        public nameUser:string,
        public contac:string,
        public address:string,
        public email:string,
        public password:string,
        public dni:string,
        public stateUser:boolean,
        public registrationDate: Date,
        public typeUser:number
    ){}
}