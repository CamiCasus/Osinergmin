import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { LoginEntidad } from '../models/loginEntidad';
import { AppGlobals } from '../components/shared/app.globals';
import { AuthResponse } from '../models/authEntidad';

@Injectable()
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) { }

  login(usuarioEntidad: LoginEntidad) : Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(`${AppGlobals.BASE_URL}/api/autenticar`, usuarioEntidad);
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isAutenticated() {
    return localStorage.getItem('auth_token') != null;
  }

  getAuthorizationToken() {
    return localStorage.getItem('auth_token');
  }
}
