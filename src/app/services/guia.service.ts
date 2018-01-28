import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Guia } from '../models/guiaListado';

@Injectable()
export class GuiaService {

  constructor(private _httpClient: HttpClient) { }

  getGuias() {
    return this._httpClient.get<Guia[]>('http://localhost:54525/api/guia/listado');
  }
}
