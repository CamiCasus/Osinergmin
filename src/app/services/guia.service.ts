import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GuiaListado} from '../models/guiaListado';
import { DetalleGuiaListado } from '../models/detalleGuiaListado';

@Injectable()
export class GuiaService {

  constructor(private _httpClient: HttpClient) { }

  getGuias(): Observable<GuiaListado[]> {
    return this._httpClient.get<GuiaListado[]>('http://10.26.10.148:1010/api/guia/listado');
  }

  getDetalleGuia(guiaId) : Observable<DetalleGuiaListado[]>{
    return this._httpClient.get<DetalleGuiaListado[]>(`http://10.26.10.148:1010/api/guia/detalle/${guiaId}`);
  }

  presentarGuia() {
    console.log('Llamar al servicio para presentar guia');
  }

  validarCodigo(codigoVerificacion: string) {
    console.log(`Llamar al servicio de presentar guía con el código ${codigoVerificacion}`);
  }

  eliminarGuia(guiaId) {
    console.log(`Llamar al servicio para eliminar guía con el codigo ${ guiaId}`);
  }
}
