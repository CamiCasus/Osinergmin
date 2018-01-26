import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private _route: Router) { }

  ngOnInit() {
  }

  grabar() {

  }

  cancelar() {
    this._route.navigate(['/listado']);
  }
}
