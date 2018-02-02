import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../components/shared/app.globals';
import { ProductoEntidad } from '../models/productoEntidad';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MaestrosService {

  constructor(private _httpClient: HttpClient) { }

  getProductos(): Observable<ProductoEntidad[]> {
    return this._httpClient.get<ProductoEntidad[]>(`${AppGlobals.BASE_URL}/api/maestros/productos`);
  }
}
