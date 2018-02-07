import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { LoginEntidad } from '../models/loginEntidad';
import { AppGlobals } from '../components/shared/app.globals';

@Injectable()
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) { }

  login(usuarioEntidad: LoginEntidad) {
    return this._httpClient.post<any>(`${AppGlobals.BASE_URL}/api/autenticar`, usuarioEntidad).map(response => {
      if (response) {
        localStorage.setItem('currentUser', JSON.stringify(usuarioEntidad));
      }

      return response;
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAutenticated() {
    return localStorage.getItem('currentUser') != null;
  }
}
