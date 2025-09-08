export class ChangePassword{
    constructor(
        public email:string,
        public password:string,
        public newPassword?:string
    ){}
}