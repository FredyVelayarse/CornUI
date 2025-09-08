export class ServiceResult {
  isSucceeded: boolean;
  message: string | null;
  statusCode: number;
  id: number;

  constructor(isSucceeded: boolean = true, message: string | null = null, statusCode: number = 0, id: number = 0) {
    this.isSucceeded = isSucceeded;
    this.message = message;
    this.statusCode = statusCode;
    this.id = id;
  }
}

// Definición de la clase genérica ServiceResult<T>
export class ServiceResultGeneric<T> extends ServiceResult {
  data: T;

  constructor(data: T, isSucceeded: boolean = true, message: string | null = null, statusCode: number = 0, id: number = 0) {
    super(isSucceeded, message, statusCode, id);
    this.data = data;
  }
}

// Definición de la clase ResponseResult que contiene el resultado específico de los datos
export class ResponseResult {
  id: string;
  estado: string;
  mensaje: string;
  data: any; // o podrías especificar un tipo específico en lugar de 'any'

  constructor(id: string, estado: string, mensaje: string, data: any) {
    this.id = id;
    this.estado = estado;
    this.mensaje = mensaje;
    this.data = data;
  }
}