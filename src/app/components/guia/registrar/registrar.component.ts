import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { GuiaEntidad } from '../../../models/guiaEntidad';
import { GuiaService } from '../../../services/guia.service';
import { AppGlobals } from '../../shared/app.globals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentPopupComponent, TipoContenido } from '../../shared/content-popup/content-popup.component';
import { DetalleGuiaEntidad } from '../../../models/detalleGuiaEntidad';
import { MessageModalComponent, TipoMensaje } from '../../shared/message-modal/message-modal.component';
import { MaestrosService } from '../../../services/maestros.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  loading: boolean;
  @ViewChild('fileGuia') fileGuia: ElementRef;
  guiaId: number;
  archivoActual: File;
  guiaActual: GuiaEntidad;
  detalleGuiaActual: DetalleGuiaEntidad;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  forma: FormGroup;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _guiaService: GuiaService,
    public _modal: NgbModal,
    public _route: Router,
    public _alertService: AlertService) {
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.guiaId = params['id'];

      if (this.guiaId != null) {
        this.loading = true;

        this._guiaService.getGuia(this.guiaId).subscribe(data => {
          this.loading = false;

          this.guiaActual = data;
          this.setForm(this.guiaActual);
        });
      } else {
        this.guiaActual = new GuiaEntidad();
        this.guiaActual.detalleGuia = [];

        this.setForm(this.guiaActual);
      }
    });

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      searching: false,
      dom: 'frt',
      language: AppGlobals.getSpanishDataTable()
    };
  }

  setForm(guiaActual: GuiaEntidad) {
    this.forma = new FormGroup({
      'codigo': new FormControl(guiaActual.codigo, Validators.required),
      'fechaRecepcion': new FormControl(guiaActual.fechaRecepcion, Validators.required),
      'representanteIntertek': new FormControl(guiaActual.representanteIntertek, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      'dniRepresentanteIntertek': new FormControl(guiaActual.dniRepresentanteIntertek, [
        Validators.required,
        Validators.pattern('^[0-9]{8}$')
      ]),
      'representanteOsinergmin': new FormControl(guiaActual.representanteOsinergmin, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      'dniRepresentanteOsinergmin': new FormControl(guiaActual.dniRepresentanteOsinergmin, [
        Validators.required,
        Validators.pattern('^[0-9]{8}$')
      ]),
      'supervisorExtraccionMuestra': new FormControl(guiaActual.supervisorExtraccionMuestra, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      'comentario': new FormControl(guiaActual.comentario, Validators.maxLength(1000))
    });
  }

  getFiles(event) {    
    this.archivoActual = event.target.files[0];
    this.guiaActual.nombreArchivo = this.archivoActual.name;

    // AppGlobals.convertFileToBase64(this.archivoActual).then((resultado) => {
    //   console.log(resultado);
    // });
  }

  openFileBrowser() {
    this.fileGuia.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: false }));
  }

  onSubmit() {
    const modalRef = this._modal.open(MessageModalComponent);
    modalRef.componentInstance.titulo = 'Grabar Guía';
    modalRef.componentInstance.mensaje = '¿Estás seguro de realizar esta operación?';
    modalRef.componentInstance.tipoMensaje = TipoMensaje.confirmacion;

    modalRef.result.then((result) => {
      const objetoEnviar = this.forma.value;

      if (this.archivoActual != null) {
        AppGlobals.convertFileToBuferArray(this.archivoActual).then((resultado) => {
          objetoEnviar.nombreArchivo = this.archivoActual.name;
          objetoEnviar.guiaAdjunta = resultado;

          this.grabar(objetoEnviar);
        });
      } else {
        objetoEnviar.nombreArchivo = this.guiaActual.nombreArchivo;
        objetoEnviar.guiaAdjunta = this.guiaActual.guiaAdjunta;
        this.grabar(objetoEnviar);
      }

    }, result => { });
  }

  grabar(objetoEnviar: any) {

    this.loading = true;
    objetoEnviar.id = this.guiaId;
    objetoEnviar.detalleGuia = this.guiaActual.detalleGuia;

    if (this.guiaId == null) {
      this._guiaService.grabarGuia(objetoEnviar).subscribe(data => {
        this.loading = false;
        if (data.exito) {
          this.cancelar();
        } else {
          this._alertService.error(data.mensaje);
        }
      });
    } else {
      this._guiaService.actualizarGuia(objetoEnviar).subscribe(data => {
        this.loading = false;
        this.cancelar();
      });
    }
  }

  cargarDetalle(guiaDetalle: DetalleGuiaEntidad, index: number) {
    const guiaAModificar = Object.assign({}, guiaDetalle);
    const modalRef = this._modal.open(ContentPopupComponent, { size: 'lg' });

    modalRef.componentInstance.tipoContenido = TipoContenido.agregarDetalleGuia;
    modalRef.componentInstance.titulo = 'Registro de Detalle Guia';
    modalRef.componentInstance.data = guiaAModificar;

    modalRef.result.then((result) => {
      if (result.archivoAdjuntoTemp != null) {
        AppGlobals.convertFileToBuferArray(result.archivoAdjuntoTemp).then((resultado) => {
          result.nombreArchivo = result.archivoAdjuntoTemp.name;
          result.fotoMuestra = resultado;

          if (guiaDetalle == null) {
            this.guiaActual.detalleGuia.push(result);
          } else {
            this.guiaActual.detalleGuia[index] = result;
          }
        });
      } else {
        if (guiaDetalle != null) {
          result.nombreArchivo = guiaDetalle.nombreArchivo;
          result.fotoMuestra = guiaDetalle.fotoMuestra;

          this.guiaActual.detalleGuia[index] = result;
        } else {
          this.guiaActual.detalleGuia.push(result);
        }
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
