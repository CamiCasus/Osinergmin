import { Component, OnInit, Input } from '@angular/core';
import { MaestrosService } from '../../../services/maestros.service';
import { ItemTablaEntidad } from '../../../models/itemTablaEntidad';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { GuiaService } from '../../../services/guia.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent, TipoMensaje } from '../../shared/message-modal/message-modal.component';
import { InformeEnsayoCombustibleEntidad } from '../../../models/informeEnsayoCombustibleEntidad';

@Component({
  selector: 'app-informe-ensayo-liquido',
  templateUrl: './informe-ensayo-liquido.component.html',
  styleUrls: ['./informe-ensayo-liquido.component.css']
})
export class InformeEnsayoLiquidoComponent implements OnInit {
  @Input() detalleGuiaId: number;
  infoEnsayoCombustible: InformeEnsayoCombustibleEntidad;
  loading: boolean;
  formaLiquido: FormGroup;

  constructor(
    public _maestrosService: MaestrosService,
    public _modal: NgbModal,
    public _guiaService: GuiaService,
    public _alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.infoEnsayoCombustible = new InformeEnsayoCombustibleEntidad();
    this.setForm(this.infoEnsayoCombustible);

    this._guiaService.obtenerInformeEnsayo(this.detalleGuiaId).subscribe(
      result => {
        this.loading = false;
        this.infoEnsayoCombustible = result;

        if (this.infoEnsayoCombustible == null) {
          this.infoEnsayoCombustible = new InformeEnsayoCombustibleEntidad();
        }

        this.setForm(this.infoEnsayoCombustible);
      });
  }

  setForm(infoEnsayoCombustible: InformeEnsayoCombustibleEntidad) {
    this.formaLiquido = new FormGroup({
      'id': new FormControl(infoEnsayoCombustible.id),
      'observaciones': new FormControl(infoEnsayoCombustible.observaciones),
      'numeroInformeLaboratorio': new FormControl(infoEnsayoCombustible.numeroInformeLaboratorio),
      'octanaje': new FormControl(infoEnsayoCombustible.octanaje),
      'puntoInflamacion': new FormControl(infoEnsayoCombustible.puntoInflamacion),
      'presionVaporReid': new FormControl(infoEnsayoCombustible.presionVaporReid),
      'contenidoAzufre4294': new FormControl(infoEnsayoCombustible.contenidoAzufre4294),
      'contenidoAzufre5453': new FormControl(infoEnsayoCombustible.contenidoAzufre5453),
      'viscosidadCinematica': new FormControl(infoEnsayoCombustible.viscosidadCinematica),
      'contenidoManganeso': new FormControl(infoEnsayoCombustible.contenidoManganeso),
      'puntoEscurrimiento': new FormControl(infoEnsayoCombustible.puntoEscurrimiento),
      'contenidoPlomo': new FormControl(infoEnsayoCombustible.contenidoPlomo),
      'contenidoPlomoAstmd3341': new FormControl(infoEnsayoCombustible.contenidoPlomoAstmd3341),
      'contenidoPlomoAstmd3237': new FormControl(infoEnsayoCombustible.contenidoPlomoAstmd3237),
      'astmd86_pie': new FormControl(infoEnsayoCombustible.astmd86_pie),
      'astmd86_5p': new FormControl(infoEnsayoCombustible.astmd86_5p),
      'astmd86_10p': new FormControl(infoEnsayoCombustible.astmd86_10p),
      'astmd86_20p': new FormControl(infoEnsayoCombustible.astmd86_20p),
      'astmd86_50p': new FormControl(infoEnsayoCombustible.astmd86_50p),
      'astmd86_90p': new FormControl(infoEnsayoCombustible.astmd86_90p),
      'astmd86_95p': new FormControl(infoEnsayoCombustible.astmd86_95p),
      'astmd86_pfe': new FormControl(infoEnsayoCombustible.astmd86_pfe),
      'astmd86_recup': new FormControl(infoEnsayoCombustible.astmd86_recup),
      'aastmd86_residuo': new FormControl(infoEnsayoCombustible.aastmd86_residuo),
      'aastmd86_perdidas': new FormControl(infoEnsayoCombustible.aastmd86_perdidas),
      'gravidadApi': new FormControl(infoEnsayoCombustible.gravidadApi),
      'densidadRelativa': new FormControl(infoEnsayoCombustible.densidadRelativa),
      'indiceCetano': new FormControl(infoEnsayoCombustible.indiceCetano),
      'indiceCetanoProcedenciaA': new FormControl(infoEnsayoCombustible.indiceCetanoProcedenciaA),
      'indiceCetanoProcedenciaB': new FormControl(infoEnsayoCombustible.indiceCetanoProcedenciaB),
      'indiceCetanoBajoAzufre': new FormControl(infoEnsayoCombustible.indiceCetanoBajoAzufre),
      'contenidoFameVolumen': new FormControl(infoEnsayoCombustible.contenidoFameVolumen),
      'contenidoEtanolVolumen': new FormControl(infoEnsayoCombustible.contenidoEtanolVolumen),
      'totalOxigenadosVolumen': new FormControl(infoEnsayoCombustible.totalOxigenadosVolumen),
      'totalOxigeno': new FormControl(infoEnsayoCombustible.totalOxigeno),
      'contenidoMtbeVolumen': new FormControl(infoEnsayoCombustible.contenidoMtbeVolumen),
      'contenidoTameVolumen': new FormControl(infoEnsayoCombustible.contenidoTameVolumen),
      'contenidoEtbeVolumen': new FormControl(infoEnsayoCombustible.contenidoEtbeVolumen),
      'contenidoMetanolVolumen': new FormControl(infoEnsayoCombustible.contenidoMetanolVolumen),
      'contenidoTertbutanoVolumen': new FormControl(infoEnsayoCombustible.contenidoTertbutanoVolumen),
      'contenidoDipeVolumen': new FormControl(infoEnsayoCombustible.contenidoDipeVolumen),
      'contenidoMtbeMasa': new FormControl(infoEnsayoCombustible.contenidoMtbeMasa),
      'contenidoTameMasa': new FormControl(infoEnsayoCombustible.contenidoTameMasa),
      'contenidoEtbeMasa': new FormControl(infoEnsayoCombustible.contenidoEtbeMasa),
      'contenidoEtanolMasa': new FormControl(infoEnsayoCombustible.contenidoEtanolMasa),
      'contenidoMetanolMasa': new FormControl(infoEnsayoCombustible.contenidoMetanolMasa),
      'contenidoTertbutanoMasa': new FormControl(infoEnsayoCombustible.contenidoTertbutanoMasa),
      'contenidoDipeMasa': new FormControl(infoEnsayoCombustible.contenidoDipeMasa),
      'totalOxigenadosMasa': new FormControl(infoEnsayoCombustible.totalOxigenadosMasa),
      'reaccionAlAgua': new FormControl(infoEnsayoCombustible.reaccionAlAgua),
      'contenidoSolidos': new FormControl(infoEnsayoCombustible.contenidoSolidos),
      'contenidoGomas': new FormControl(infoEnsayoCombustible.contenidoGomas),
      'puntoCongelamiento': new FormControl(infoEnsayoCombustible.puntoCongelamiento),
      'aguaSedimentos': new FormControl(infoEnsayoCombustible.aguaSedimentos),
      'determinacionBenceno': new FormControl(infoEnsayoCombustible.determinacionBenceno),
      'aguaPorDestilacion': new FormControl(infoEnsayoCombustible.aguaPorDestilacion),
      'contaminacionParticulas': new FormControl(infoEnsayoCombustible.contaminacionParticulas),
      'indiceCetanoFme': new FormControl(infoEnsayoCombustible.indiceCetanoFme),
      'color': new FormControl(infoEnsayoCombustible.color),
      'resultadoFinal': new FormControl(infoEnsayoCombustible.resultadoFinal),
      'remanenteRetirado': new FormControl(infoEnsayoCombustible.remanenteRetirado)
    });
  }
}
