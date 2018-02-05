import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _autenticationService: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this._autenticationService.logout();
    this._router.navigate(['/login']);
  }
}
