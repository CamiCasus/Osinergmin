import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuiaService } from '../../../services/guia.service';
import { Subject } from 'rxjs/Subject';
import { GuiaListado } from '../../../models/guiaListado';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent, TipoMensaje } from '../../shared/message-modal/message-modal.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  guias: GuiaListado[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private _router: Router,
    private _guiaService: GuiaService,
    private _modal: NgbModal) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10      
    };

    this._guiaService.getGuiasListado()
      .subscribe(data => {
        this.guias = data;
        this.dtTrigger.next();
      });
  }

  presentarAOsinergmin() {
    const modalRef = this._modal.open(MessageModalComponent);
    modalRef.componentInstance.titulo = 'Presentar Osinergmin';
    modalRef.componentInstance.mensaje = '¿Estás seguro de presentar la Guía a Osinergmin?';
    modalRef.componentInstance.tipoMensaje = TipoMensaje.confirmacion;

    modalRef.result.then((result) => {
      this._guiaService.presentarGuia();
    }, (reason) => { });

    return false;
  }

  eliminar(guiaId) {
    const modalRef = this._modal.open(MessageModalComponent);
    modalRef.componentInstance.titulo = 'Eliminar Guía';
    modalRef.componentInstance.mensaje = '¿Estás seguro de eliminar la Guía?';
    modalRef.componentInstance.tipoMensaje = TipoMensaje.confirmacion;

    modalRef.result.then((result) => {
      this._guiaService.eliminarGuia(guiaId);
    }, (reason) => { });

    return false;
  }

  validarCodigoVerificacion(content) {
    this._modal.open(content).result.then((result) => {
      this._guiaService.validarCodigo(result);
    }, (reason) => { });

    return false;
  }

  irAVistaRegistrar() {
    this._router.navigate(['/registrar']);
  }
}

