import { Component, OnInit, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DetalleGuiaListado } from '../../../models/detalleGuiaListado';
import { GuiaService } from '../../../services/guia.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentPopupComponent, TipoContenido } from '../../shared/content-popup/content-popup.component';
import { TipoMuestraPipe } from '../../../pipes/tipo-muestra.pipe';

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
    public _activatedRoute: ActivatedRoute,
    public _guiaService: GuiaService,
    public _modal: NgbModal) {
    this._activatedRoute.params.subscribe(params => {
      this.guiaId = params["id"]
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10
    };

    this._guiaService.getDetalleListadoGuia(this.guiaId)
      .subscribe(data => {
        this.detalleGuia = data;
        this.dtTrigger.next();
      });
  }

  registrarResultado(tipoMuestra: number) {
    const modalRef = this._modal.open(ContentPopupComponent, { size: 'lg' });
    modalRef.componentInstance.tipoContenido = TipoContenido.informeEnsayoGlp;

    // var textoTipoMuestra = TipoMuestraPipe.apply(tipoMuestra);
    // modalRef.componentInstance.titulo = `Ingreso de Resultado ${textoTipoMuestra}`;
  }
}
