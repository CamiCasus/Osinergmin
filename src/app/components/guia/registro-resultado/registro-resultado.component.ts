import { Component, OnInit, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DetalleGuiaListado } from '../../../models/detalleGuiaListado';
import { GuiaService } from '../../../services/guia.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentPopupComponent, TipoContenido } from '../../shared/content-popup/content-popup.component';
import { TipoMuestraPipe } from '../../../pipes/tipo-muestra.pipe';
import { AppGlobals } from '../../shared/app.globals';
import { MessageModalComponent, TipoMensaje } from '../../shared/message-modal/message-modal.component';
import { AlertService } from '../../../services/alert.service';
import { Observable } from 'rxjs/Observable';
import { OsinergminResponse } from '../../../models/osinergminResponse';

@Component({
  selector: 'app-registro-resultado',
  templateUrl: './registro-resultado.component.html',
  styleUrls: ['./registro-resultado.component.css']
})
export class RegistroResultadoComponent implements OnInit {

  loading: boolean;
  guiaId: number;
  dtOptions: DataTables.Settings = {};
  detalleGuia: DetalleGuiaListado[];
  dtTrigger: Subject<any> = new Subject();

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _guiaService: GuiaService,
    public _modal: NgbModal,
    public _alertService: AlertService) {
    this._activatedRoute.params.subscribe(params => {
      this.guiaId = params['id'];
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      language: AppGlobals.getSpanishDataTable()
    };

    this.loading = true;
    this._guiaService.getDetalleListadoGuia(this.guiaId)
      .subscribe(data => {
        this.loading = false;
        this.detalleGuia = data;
        this.dtTrigger.next();
      });
  }

  registrarResultado(tipoMuestra: number, detalleGuiaId: number) {
    const modalRef = this._modal.open(ContentPopupComponent, { size: 'lg' });
    const textoTipoMuestra = new TipoMuestraPipe().transform(tipoMuestra);

    modalRef.componentInstance.tipoContenido = tipoMuestra;
    modalRef.componentInstance.titulo = `Ingreso de Resultado ${textoTipoMuestra}`;
    modalRef.componentInstance.data = detalleGuiaId;

    modalRef.result.then((result) => {
      this.loading = true;

      const objetoEnviar = result;
      objetoEnviar.detalleGuiaId = detalleGuiaId;

      let respuestaServicio: Observable<OsinergminResponse>;

      console.log(objetoEnviar);
      if (tipoMuestra === TipoContenido.informeEnsayoGlp) {
        respuestaServicio = this._guiaService.presentarEnsayoGLP(objetoEnviar);
      } else if (tipoMuestra === TipoContenido.informeEnsayoLiquido) {
        respuestaServicio = this._guiaService.presentarEnsayoLiquido(objetoEnviar);
      }

      respuestaServicio.subscribe(
        data => {
          this.loading = false;
          if (data == null) {
            this._alertService.error('Ocurrió un error durante la carga de resultados, por favor intente en unos momentos');
          } else if (data.exito) {
            this._alertService.success('Se presentó satisfactoriamente el informe de ensayo.');
          } else {
            this._alertService.error(data.mensaje);
          }
        });

    }, result => { });
  }
}
