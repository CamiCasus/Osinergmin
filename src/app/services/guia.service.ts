import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import { GuiaListado } from '../models/guiaListado';
import { DetalleGuiaListado } from '../models/detalleGuiaListado';
import { GuiaEntidad } from '../models/guiaEntidad';
import { AppGlobals } from '../components/shared/app.globals';
import { OsinergminResponse } from '../models/osinergminResponse';
import { InformeEnsayoCombustibleEntidad } from '../models/informeEnsayoCombustibleEntidad';
import { InformeEnsayoGlpEntidad } from '../models/informeEnsayoGlpEntidad';

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

  presentarGuia(guiaId: number) {
    return this._httpClient.get<OsinergminResponse>(`${AppGlobals.BASE_URL}/api/guia/presentar/${guiaId}`);
  }

  validarMuestra(codigoVerificacion: number, guiaId: number) {
    return this._httpClient.post<OsinergminResponse>(`${AppGlobals.BASE_URL}/api/guia/validarMuestra`,
      {
        guiaId: guiaId,
        codigoVerificacion: codigoVerificacion
      });
  }

  grabarGuia(guia: GuiaEntidad): Observable<OsinergminResponse> {
    return this._httpClient.post<OsinergminResponse>(`${AppGlobals.BASE_URL}/api/guia`, guia);
  }

  actualizarGuia(guia: GuiaEntidad): Observable<OsinergminResponse> {
    return this._httpClient.put<OsinergminResponse>(`${AppGlobals.BASE_URL}/api/guia`, guia);
  }

  eliminarGuia(guiaId) {
    return this._httpClient.delete(`${AppGlobals.BASE_URL}/api/guia/${guiaId}`);
  }

  presentarEnsayoGLP(informeEnsayoGlp: InformeEnsayoGlpEntidad): Observable<OsinergminResponse> {
    return this._httpClient.post<OsinergminResponse>(`${AppGlobals.BASE_URL}/api/guia/registrarInformeEnsayoGlp`, informeEnsayoGlp);
  }

  presentarEnsayoLiquido(informeEnsayoLiquido: InformeEnsayoCombustibleEntidad): Observable<OsinergminResponse> {
    console.log(informeEnsayoLiquido);
    return this._httpClient.post<OsinergminResponse>(`${AppGlobals.BASE_URL}/api/guia/registrarInformeEnsayoLiquido`, informeEnsayoLiquido);
  }

  obtenerInformeEnsayo(informeId: number) {
    return this._httpClient.get<any>(`${AppGlobals.BASE_URL}/api/guia/obtenerInformeEnsayo/${informeId}`);
  }
}
