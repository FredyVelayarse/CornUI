export class User{
    constructor(
        public Email:string,
        public Password:string,
        public NewPassword?:string
    ){}
}