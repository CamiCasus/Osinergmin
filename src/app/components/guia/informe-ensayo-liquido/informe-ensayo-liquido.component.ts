import { Component, OnInit , Input} from '@angular/core';
import { InformeEnsayoCombustibleEntidad } from '../../../models/infoEnsayoCombustible';
import { MaestrosService } from '../../../services/maestros.service';
import { ItemTablaEntidad } from '../../../models/itemTablaEntidad';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-informe-ensayo-liquido',
  templateUrl: './informe-ensayo-liquido.component.html',
  styleUrls: ['./informe-ensayo-liquido.component.css']
})
export class InformeEnsayoLiquidoComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('infoliquido') infoEnsayoCombustible: InformeEnsayoCombustibleEntidad;

  formaLiquido: FormGroup;

  constructor(public _maestrosService: MaestrosService) { }

  ngOnInit() {
    if (this.infoEnsayoCombustible == null) {
      this.infoEnsayoCombustible = new InformeEnsayoCombustibleEntidad();
    }

    this.setForm(this.infoEnsayoCombustible);
  }

  setForm (infoEnsayoCombustible : InformeEnsayoCombustibleEntidad) {
    this.formaLiquido = new FormGroup({
      'observaciones': new FormControl(),
      'numeroInformeLaboratorio': new FormControl(),
      'octanaje': new FormControl(),
      'puntoInflamacion': new FormControl(),
      'presionVaporReid': new FormControl(),
      'contenidoAzufre4294': new FormControl(),
      'contenidoAzufre5453': new FormControl(),
      'viscosidadCinematica': new FormControl(),
      'contenidoManganeso': new FormControl(),
      'puntoEscurrimiento': new FormControl(),
      'contenidoPlomo': new FormControl(),
      'contenidoPlomoAstmd3341': new FormControl(),
      'contenidoPlomoAstmd3237': new FormControl(),
      'astmd86_pie': new FormControl(),
      'astmd86_5p': new FormControl(),
      'astmd86_10p': new FormControl(),
      'astmd86_20p': new FormControl(),
      'astmd86_50p': new FormControl(),
      'astmd86_90p': new FormControl(),
      'astmd86_95p': new FormControl(),
      'astmd86_pfe': new FormControl(),
      'astmd86_recup': new FormControl(),
      'aastmd86_residuo': new FormControl(),
      'aastmd86_perdidas': new FormControl(),
      'gravidadApi': new FormControl(),
      'densidadRelativa': new FormControl(),
      'indiceCetano': new FormControl(),
      'indiceCetanoProcedenciaA': new FormControl(),
      'indiceCetanoProcedenciaB': new FormControl(),
      'indiceCetanoBajoAzufre': new FormControl(),
      'contenidoFameVolumen': new FormControl(),
      'contenidoEtanolVolumen': new FormControl(),
      'totalOxigenadosVolumen': new FormControl(),
      'totalOxigeno': new FormControl(),
      'contenidoMtbeVolumen': new FormControl(),
      'contenidoTameVolumen': new FormControl(),
      'contenidoEtbeVolumen': new FormControl(),
      'contenidoMetanolVolumen': new FormControl(),
      'contenidoTertbutanoVolumen': new FormControl(),
      'contenidoDipeVolumen': new FormControl(),
      'contenidoMtbeMasa': new FormControl(),
      'contenidoTameMasa': new FormControl(),
      'contenidoEtbeMasa': new FormControl(),
      'contenidoEtanolMasa': new FormControl(),
      'contenidoMetanolMasa': new FormControl(),
      'contenidoTertbutanoMasa': new FormControl(),
      'contenidoDipeMasa': new FormControl(),
      'totalOxigenadosMasa': new FormControl(),
      'reaccionAlAgua': new FormControl(),
      'contenidoSolidos': new FormControl(),
      'contenidoGomas': new FormControl(),
      'puntoCongelamiento': new FormControl(),
      'aguaSedimentos': new FormControl(),
      'determinacionBenceno': new FormControl(),
      'aguaPorDestilacion': new FormControl(),
      'contaminacionparticulas': new FormControl(),
      'indiceCetanoFame': new FormControl(),
      'color': new FormControl(),
      'resultadoFinal': new FormControl(),
      'remanenteRetirado': new FormControl()
    });
  }

}
