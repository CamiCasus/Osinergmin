import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { GuiaEntidad } from '../../../models/guiaEntidad';
import { GuiaService } from '../../../services/guia.service';
import { NgForm } from '@angular/forms';
import { AppGlobals } from '../../shared/app.globals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentPopupComponent, TipoContenido } from '../../shared/content-popup/content-popup.component';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  archivoActual: File;
  guiaActual: GuiaEntidad;

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
      let guiaId = params["id"];

      if (guiaId != null) {
        this._guiaService.getGuia(guiaId).subscribe(data => {
          this.guiaActual = data;
        });
      } else {
        this.guiaActual = new GuiaEntidad();
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
    objetoEnviar.nombreArchivo = this.archivoActual.name;

    AppGlobals.convertFileToBase64(this.archivoActual)
      .then((resultado) => {
        objetoEnviar.guiaAdjunta = resultado;
        console.log(objetoEnviar);
    });

    // this._guiaService.grabarGuia(form.value);
  }

  agregarDetalle() {
    const modalRef = this._modal.open(ContentPopupComponent, { size: 'lg'});
    modalRef.componentInstance.tipoContenido = TipoContenido.agregarProducto;
  }

  cancelar() {
    this._route.navigate(['/listado']);
  }
}
