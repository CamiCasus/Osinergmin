import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _route: Router) {
    this._activatedRoute.params.subscribe(params => {
      console.log(params["id"]);
    });
  }

  ngOnInit() {
  }

  grabar() {

  }

  cancelar() {
    this._route.navigate(['/listado']);
  }
}
