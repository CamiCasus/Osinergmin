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
    if (this.archivoActual) {
      objetoEnviar.nombreArchivo = this.archivoActual.name;

      AppGlobals.convertFileToBase64(this.archivoActual)
        .then((resultado) => {
          objetoEnviar.id = this.guiaId;
          objetoEnviar.guiaAdjunta = resultado;
          objetoEnviar.detalleGuia = this.guiaActual.detalleGuia;

          if(this.guiaId == null){
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

  cargarDetalle(guiaDetalle: DetalleGuiaEntidad) {
    const modalRef = this._modal.open(ContentPopupComponent, { size: 'lg' });

    modalRef.componentInstance.tipoContenido = TipoContenido.agregarDetalleGuia;
    modalRef.componentInstance.titulo = "Registro de Detalle Guia";
    modalRef.componentInstance.data = guiaDetalle;

    modalRef.result.then((result) => {
      this.guiaActual.detalleGuia.push(result);
    }, (reason) => { });
  }

  cancelar() {
    this._route.navigate(['/listado']);
  }
}
