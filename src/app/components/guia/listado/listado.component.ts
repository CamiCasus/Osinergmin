import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuiaService } from '../../../services/guia.service';
import { Subject } from 'rxjs/Subject';
import { Guia } from '../../../models/guiaListado';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  public guias: Guia[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private _router: Router, private _guiaService: GuiaService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10
    };

    this._guiaService.getGuias()
      .subscribe(data => {
        this.guias = data;
         this.dtTrigger.next();
      });
  }

  irAVistaRegistrar() {
    this._router.navigate(['/registrar']);
  }
}

