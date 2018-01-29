import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _route: Router) {
    this._activatedRoute.params.subscribe(params => {
      console.log(params["id"]);
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      searching: false,
      dom: 'frt'
    };
  }

  grabar() {

  }

  cancelar() {
    this._route.navigate(['/listado']);
  }
}
