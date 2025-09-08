export class FileDataUploadFile {
    constructor(
        public id: number,   
        public fileName: string,
        public filePath: string,
        public idCliente?: number
    ) {}
}