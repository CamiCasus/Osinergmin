import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GuiaListado } from '../models/guiaListado';
import { DetalleGuiaListado } from '../models/detalleGuiaListado';
import { GuiaEntidad } from '../models/guiaEntidad';
import { AppGlobals } from '../components/shared/app.globals';

@Injectable()
export class GuiaService {

  constructor(private _httpClient: HttpClient) { }

  getGuiasListado(): Observable<GuiaListado[]> {
    return this._httpClient.get<GuiaListado[]>(`${AppGlobals.BASE_URL}/api/guia/listado`);
  }

  getDetalleListadoGuia(guiaId): Observable<DetalleGuiaListado[]> {
    return this._httpClient.get<DetalleGuiaListado[]>(`${AppGlobals.BASE_URL}/api/guia/detalle/${guiaId}`);
  }

  getGuia(guiaId: number): Observable<GuiaEntidad> {
    return this._httpClient.get<GuiaEntidad>(`${AppGlobals.BASE_URL}/api/guia/${guiaId}`);
  }

  presentarGuia() {
    console.log('Llamar al servicio para presentar guia');
  }

  validarCodigo(codigoVerificacion: string) {
    console.log(`Llamar al servicio de presentar guía con el código ${codigoVerificacion}`);
  }

  grabarGuia(guia: GuiaEntidad) {
    console.log('llamando al servicio de registrar');
    return this._httpClient.post(`${AppGlobals.BASE_URL}/api/guia/registrar`, guia);
  }

  eliminarGuia(guiaId) {
    console.log(`Llamar al servicio para eliminar guía con el codigo ${guiaId}`);
  }
}
