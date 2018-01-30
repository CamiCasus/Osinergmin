import { DetalleGuiaEntidad } from './detalleGuiaEntidad';

export class GuiaEntidad {
    id: number;
    codigo: string;
    fechaRecepcion: Date;
    representanteOsinergmin: string;
    dniRepresentanteOsinergmin: string;
    representanteIntertek: string;
    dniRepresentanteIntertek: string;
    supervisorExtraccionMuestra: string;
    comentario: string;
    nombreArchivo: string;
    guiaAdjunta: string;
    detalleGuia: DetalleGuiaEntidad[];
}