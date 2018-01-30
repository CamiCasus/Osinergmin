import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content-popup',
  templateUrl: './content-popup.component.html',
  styleUrls: ['./content-popup.component.css']
})
export class ContentPopupComponent implements OnInit {
  @Input() tipoContenido: TipoContenido;
  tiposContenido = TipoContenido;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.tipoContenido);
  }

}

export enum TipoContenido {
  informeEnsayoGlp = 1,
  informeEnsayoLiquido = 2,
  agregarProducto = 3
}