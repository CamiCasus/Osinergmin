import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GuiaListado } from '../models/guiaListado';

@Injectable()
export class GuiaService {

  constructor(private _httpClient: HttpClient) { }

  getGuias() {
    return this._httpClient.get<GuiaListado[]>('http://localhost:54525/api/guia/listado');
  }

  presentarGuia() {
    console.log('Llamar al servicio para presentar guia');
  }

  validarCodigo(codigoVerificacion: string) {
    console.log('Llamar al servicio de presentar guía con el código $codigoVerificacion');
  }
}
