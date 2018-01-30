import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DetalleGuiaListado } from '../../../models/detalleGuiaListado';
import { GuiaService } from '../../../services/guia.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoMuestraPopupComponent } from '../../shared/resultado-muestra-popup/resultado-muestra-popup.component';

@Component({
  selector: 'app-registro-resultado',
  templateUrl: './registro-resultado.component.html',
  styleUrls: ['./registro-resultado.component.css']
})
export class RegistroResultadoComponent implements OnInit {

  guiaId: number;
  dtOptions: DataTables.Settings = {};
  detalleGuia: DetalleGuiaListado[];
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _guiaService: GuiaService,
    private _modal: NgbModal ) {
    this._activatedRoute.params.subscribe(params => {
      this.guiaId = params["id"]
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10
    };

    this._guiaService.getDetalleGuia(this.guiaId)
      .subscribe(data => {
        this.detalleGuia = data;
        this.dtTrigger.next();
      });
  }

  registrarResultado(tipoMuestra: number) {
    const modalRef = this._modal.open(ResultadoMuestraPopupComponent, 
      { size: 'lg'});
    modalRef.componentInstance.tipoMuestra = tipoMuestra;
  }
}
