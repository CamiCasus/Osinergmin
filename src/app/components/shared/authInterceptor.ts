import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthenticationService } from "../../services/authentication.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public _injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authenticationService = this._injector.get(AuthenticationService);
    // Get the auth token from the service.
    const authToken = authenticationService.getAuthorizationToken();


    console.log(authToken);

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}