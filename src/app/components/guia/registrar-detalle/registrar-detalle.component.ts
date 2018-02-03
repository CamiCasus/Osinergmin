import { Component, OnInit, Input } from '@angular/core';
import { DetalleGuiaEntidad } from '../../../models/detalleGuiaEntidad';
import { MaestrosService } from '../../../services/maestros.service';
import { ProductoEntidad } from '../../../models/productoEntidad';
import { EnvaseEntidad } from '../../../models/envaseEntidad';

@Component({
  selector: 'app-registrar-detalle',
  templateUrl: './registrar-detalle.component.html',
  styleUrls: ['./registrar-detalle.component.css']
})
export class RegistrarDetalleComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('detalle') detalleGuiaActual: DetalleGuiaEntidad;
  productos: ProductoEntidad[];
  envases: EnvaseEntidad[];

  constructor(private _maestrosService: MaestrosService) { }

  ngOnInit() {
    if (this.detalleGuiaActual == null) {
      this.detalleGuiaActual = new DetalleGuiaEntidad();
    }

    this._maestrosService.getProductos().subscribe(data => {
      this.productos = data;
    });

    this._maestrosService.getEnvases().subscribe(data => {
      this.envases = data;
    });
  }

  onChangeProducto(event) {
    const indexProducto = event.target.options.selectedIndex - 1;

    this.detalleGuiaActual.nombreProducto = this.productos[indexProducto].nombre;
    this.detalleGuiaActual.tipoProducto = this.productos[indexProducto].tipoProducto;
  }

}
