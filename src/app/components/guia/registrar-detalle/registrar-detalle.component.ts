import { Component, OnInit, Input } from '@angular/core';
import { DetalleGuiaEntidad } from '../../../models/detalleGuiaEntidad';

@Component({
  selector: 'app-registrar-detalle',
  templateUrl: './registrar-detalle.component.html',
  styleUrls: ['./registrar-detalle.component.css']
})
export class RegistrarDetalleComponent implements OnInit {

  @Input('detalle') detalleGuiaActual: DetalleGuiaEntidad;

  constructor() { }

  ngOnInit() {
    if (this.detalleGuiaActual == null)
      this.detalleGuiaActual = new DetalleGuiaEntidad();
  }

}
