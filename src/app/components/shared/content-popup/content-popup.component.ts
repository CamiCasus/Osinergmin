import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content-popup',
  templateUrl: './content-popup.component.html',
  styleUrls: ['./content-popup.component.css']
})
export class ContentPopupComponent implements OnInit {
  @Input() tipoContenido: TipoContenido;
  @Input() titulo: string;
  @Input() data: any;

  tiposContenido = TipoContenido;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}

export enum TipoContenido {
  informeEnsayoLiquido = 1,
  informeEnsayoGlp = 2,
  agregarDetalleGuia = 3
}
