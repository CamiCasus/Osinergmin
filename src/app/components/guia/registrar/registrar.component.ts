import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { GuiaEntidad } from '../../../models/guiaEntidad';
import { GuiaService } from '../../../services/guia.service';
import { NgForm } from '@angular/forms';
import { AppGlobals } from '../../shared/app.globals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentPopupComponent, TipoContenido } from '../../shared/content-popup/content-popup.component';
import { DetalleGuiaEntidad } from '../../../models/detalleGuiaEntidad';
import { MessageModalComponent, TipoMensaje } from '../../shared/message-modal/message-modal.component';
import { MaestrosService } from '../../../services/maestros.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  guiaId: number;
  archivoActual: File;
  guiaActual: GuiaEntidad;
  detalleGuiaActual: DetalleGuiaEntidad;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _guiaService: GuiaService,
    private _modal: NgbModal,
    private _route: Router) {
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.guiaId = params['id'];

      if (this.guiaId != null) {
        this._guiaService.getGuia(this.guiaId).subscribe(data => {
          this.guiaActual = data;
        });
      } else {
        this.guiaActual = new GuiaEntidad();
        this.guiaActual.detalleGuia = [];
      }
    });

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      searching: false,
      dom: 'frt'
    };
  }

  getFiles(event) {
    this.archivoActual = event.target.files[0];
  }

  onSubmit(objetoEnviar: any) {

    const modalRef = this._modal.open(MessageModalComponent);
    modalRef.componentInstance.titulo = 'Grabar Guía';
    modalRef.componentInstance.mensaje = '¿Estás seguro de realizar esta operación?';
    modalRef.componentInstance.tipoMensaje = TipoMensaje.confirmacion;

    modalRef.result.then((result) => {
      this.grabar(objetoEnviar);
    });
  }

  grabar(form: NgForm) {
    if (this.archivoActual) {
      const objetoEnviar = form.value;
      objetoEnviar.nombreArchivo = this.archivoActual.name;

      AppGlobals.convertFileToBase64(this.archivoActual)
        .then((resultado) => {
          objetoEnviar.id = this.guiaId;
          objetoEnviar.guiaAdjunta = resultado;
          objetoEnviar.detalleGuia = this.guiaActual.detalleGuia;

          if (this.guiaId == null) {
            this._guiaService.grabarGuia(objetoEnviar).subscribe(data => {
              this.cancelar();
            });
          } else {
            this._guiaService.actualizarGuia(objetoEnviar).subscribe(data => {
              this.cancelar();
            });
          }
        });
    } else {
      alert('debe subir el archivo');
    }
  }

  cargarDetalle(guiaDetalle: DetalleGuiaEntidad, index: number) {
    let guiaAModificar = Object.assign({}, guiaDetalle);

    const modalRef = this._modal.open(ContentPopupComponent, { size: 'lg' });

    modalRef.componentInstance.tipoContenido = TipoContenido.agregarDetalleGuia;
    modalRef.componentInstance.titulo = 'Registro de Detalle Guia';
    modalRef.componentInstance.data = guiaAModificar;

    modalRef.result.then((result) => {
      if (guiaDetalle == null)
        this.guiaActual.detalleGuia.push(result);
      else {
        this.guiaActual.detalleGuia[index] = result;
      }
    }, (reason) => { });
  }

  eliminar(detalleGuia: DetalleGuiaEntidad, index: number) {
    const modalRef = this._modal.open(MessageModalComponent);
    modalRef.componentInstance.titulo = 'Eliminar Detalle';
    modalRef.componentInstance.mensaje = '¿Estás seguro de eliminar este Detalle?';
    modalRef.componentInstance.tipoMensaje = TipoMensaje.confirmacion;

    modalRef.result.then((result) => {
      this.guiaActual.detalleGuia.splice(index, 1);
    }, (reason) => { });
  }

  cancelar() {
    this._route.navigate(['/listado']);
  }
}
