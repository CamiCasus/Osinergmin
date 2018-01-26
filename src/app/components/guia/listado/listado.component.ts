import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    $('#tblGuias').DataTable();
  }

  irAVistaRegistrar() {
    this._router.navigate(['/registrar']);
  }
}

