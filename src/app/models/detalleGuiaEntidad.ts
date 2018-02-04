export class DetalleGuiaEntidad {
    id: number;
    productoId: number;
    nombreProducto: string;
    tipoProducto: number;
    codigoEstablecimiento: string;
    cantidadMuestras: number;
    fechaMuestreo: string;
    numeroActa: string;
    numeroMuestra: number;
    numeroPrescintoDirimencia: string;
    numeroPrescintoLaboratorio: string;
    origenProducto: string;
    tipoEnvase: string;
    nombreArchivo: string;
    fotoMuestra: string;
    observaciones: string;
    archivoAdjuntoTemp: File;
}
