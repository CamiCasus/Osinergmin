import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public _authenticationService: AuthenticationService,
    public _alertService: AlertService,
    public _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (this._authenticationService.isAutenticated()) {
      return true;
    } else {
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      this._alertService.error("Su sesión ha expirado, vuelva a loguearse por favor"); 
      return false;
    }
  }
}
