import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoginEntidad } from '../models/loginEntidad';
import { AppGlobals } from '../components/shared/app.globals';

@Injectable()
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) { }

  login(usuarioEntidad: LoginEntidad) {
    return this._httpClient.post<any>(`${AppGlobals.BASE_URL}/api/autenticar`, usuarioEntidad).map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
