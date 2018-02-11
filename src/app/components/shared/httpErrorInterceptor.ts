import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  /**
   *
   */
  constructor(public _router: Router, public _injector: Injector) {


  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((err: HttpErrorResponse) => {
        const alertService = this._injector.get(AlertService);

        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }

        if (err.status === 401) {
          this._router.navigate(['/login', { queryParams: { returnUrl: request.urlWithParams } }]);
          alertService.error('No tiene acceso a la pantalla solicitada o su sesión ya expiró. Por favor inicie sesión nuevamente.');
        }

        return Observable.of(new HttpResponse({ body: null }));
      });
  }
}