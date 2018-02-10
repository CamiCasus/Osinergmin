import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DetalleGuiaEntidad } from '../../../models/detalleGuiaEntidad';
import { MaestrosService } from '../../../services/maestros.service';
import { ProductoEntidad } from '../../../models/productoEntidad';
import { ItemTablaEntidad } from '../../../models/itemTablaEntidad';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-registrar-detalle',
  templateUrl: './registrar-detalle.component.html',
  styleUrls: ['./registrar-detalle.component.css']
})
export class RegistrarDetalleComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('detalle') detalleGuiaActual: DetalleGuiaEntidad;
  @ViewChild('fileDetalle') fileDetalle: ElementRef;
  productos: ProductoEntidad[];
  envases: ItemTablaEntidad[];
  origenesProducto: ItemTablaEntidad[];
  loading: boolean;

  formaDetalle: FormGroup;

  constructor(public _maestrosService: MaestrosService) { }

  ngOnInit() {
    if (this.detalleGuiaActual == null) {
      this.detalleGuiaActual = new DetalleGuiaEntidad();
    }

    this.setForm(this.detalleGuiaActual);

    this.loading = true;

    forkJoin(
      this._maestrosService.getProductos(),
      this._maestrosService.getEnvases(),
      this._maestrosService.getOrigenProducto()).subscribe((results) => {
        this.productos = results[0];
        this.envases = results[1];
        this.origenesProducto = results[2];

        this.loading = false;
    });
  }

  setForm(detalleGuiaActual: DetalleGuiaEntidad) {
    this.formaDetalle = new FormGroup({
      'productoId': new FormControl(detalleGuiaActual.productoId, Validators.required),
      'codigoEstablecimiento': new FormControl(detalleGuiaActual.codigoEstablecimiento, Validators.required),
      'cantidadMuestras': new FormControl(detalleGuiaActual.cantidadMuestras, [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      'fechaMuestreo': new FormControl(detalleGuiaActual.fechaMuestreo, Validators.required),
      'numeroActa': new FormControl(detalleGuiaActual.numeroActa, Validators.required),
      'numeroMuestra': new FormControl(detalleGuiaActual.numeroMuestra, Validators.required),
      'numeroPrescintoDirimencia': new FormControl(detalleGuiaActual.numeroPrescintoDirimencia, Validators.required),
      'numeroPrescintoLaboratorio': new FormControl(detalleGuiaActual.numeroPrescintoLaboratorio, Validators.required),
      'origenProducto': new FormControl(detalleGuiaActual.origenProducto, Validators.required),
      'tipoEnvase': new FormControl(detalleGuiaActual.tipoEnvase, Validators.required),
      'observaciones': new FormControl(detalleGuiaActual.observaciones),
      'nombreArchivo': new FormControl(detalleGuiaActual.nombreArchivo),
      'archivoAdjuntoTemp': new FormControl(detalleGuiaActual.archivoAdjuntoTemp),
      'nombreProducto': new FormControl(detalleGuiaActual.nombreProducto),
      'tipoProducto': new FormControl(detalleGuiaActual.tipoProducto),
      'nombreEnvase': new FormControl(detalleGuiaActual.nombreEnvase)
    });
  }

  getFiles(event) {
    const archivoActual = event.target.files[0];
    this.detalleGuiaActual.nombreArchivo = archivoActual.name;

    this.formaDetalle.patchValue({
      'nombreArchivo': archivoActual.name,
      'archivoAdjuntoTemp': archivoActual
    });
  }

  openFileBrowser() {
    this.fileDetalle.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: false }));
  }

  onChangeProducto(event) {
    const indexProducto = event.target.options.selectedIndex;

    this.formaDetalle.patchValue({
      'nombreProducto': this.productos[indexProducto].nombre,
      'tipoProducto': this.productos[indexProducto].tipoProducto
    });
  }

  onChangeEnvase(event) {
    const indexEnvase = event.target.options.selectedIndex;

    console.log(this.envases[indexEnvase]);

      this.formaDetalle.patchValue({
        'nombreEnvase': this.envases[indexEnvase].nombre
      });
  }
}
