import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {
  @Input() titulo: string;
  @Input() mensaje: string;
  @Input() tipoMensaje: TipoMensaje = TipoMensaje.mensaje;

  public codigoVerificacion: string;
  public tiposMensaje = TipoMensaje;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }
}

export enum TipoMensaje {
  mensaje = 1,
  confirmacion = 2
}
