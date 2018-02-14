import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuiaService } from '../../../services/guia.service';
import { Subject } from 'rxjs/Subject';
import { GuiaListado } from '../../../models/guiaListado';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent, TipoMensaje } from '../../shared/message-modal/message-modal.component';
import { AppGlobals } from '../../shared/app.globals';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListComponent implements OnInit {

  loading: boolean;
  dtOptions: DataTables.Settings = {};
  guias: GuiaListado[];
  dtTrigger: Subject<any> = new Subject();

  constructor(public _router: Router,
    public _guiaService: GuiaService,
    public _alertService: AlertService,
    public _modal: NgbModal) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      language: AppGlobals.getSpanishDataTable()
    };

    this.cargarGuias();
  }

  cargarGuias() {
    this.loading = true;
    this._guiaService.getGuiasListado()
      .subscribe(data => {
        this.loading = false;

        this.guias = data;
        this.dtTrigger.next();
      });
  }

  presentarAOsinergmin(guiaId) {
    const modalRef = this._modal.open(MessageModalComponent);
    modalRef.componentInstance.titulo = 'Presentar Osinergmin';
    modalRef.componentInstance.mensaje = '¿Estás seguro de presentar la Guía a Osinergmin?';
    modalRef.componentInstance.tipoMensaje = TipoMensaje.confirmacion;

    modalRef.result.then((result) => {

      this.loading = true;
      this._guiaService.presentarGuia(guiaId).subscribe(data => {
        this.loading = false;

        if (data.exito) {
          this._alertService.success('Se presentó satisfactoriamente la guía a osinergmin');
        } else {
          this._alertService.error(data.mensaje);
        }
      });
    }, (reason) => { });

    return false;
  }

  eliminar(guiaId) {
    const modalRef = this._modal.open(MessageModalComponent);
    modalRef.componentInstance.titulo = 'Eliminar Guía';
    modalRef.componentInstance.mensaje = '¿Estás seguro de eliminar la Guía?';
    modalRef.componentInstance.tipoMensaje = TipoMensaje.confirmacion;

    modalRef.result.then((result) => {
      this.loading = true;
      this._guiaService.eliminarGuia(guiaId)
        .subscribe(data => {
          this.loading = false;

        });
    }, (reason) => { });

    return false;
  }

  validarCodigoVerificacion(content, guiaId: number) {
    this._modal.open(content).result.then((result) => {
      this.loading = true;
      this._guiaService.validarMuestra(result, guiaId).subscribe(data => {
        this.loading = false;

        if (data.exito) {
          this._alertService.success('Se realizó la validación correctamente para el código ingresado');
        } else {
          this._alertService.error(data.mensaje);
        }
      });
    }, (reason) => { });

    return false;
  }

  irAVistaRegistrar() {
    this._router.navigate(['/registrar']);
  }
}
