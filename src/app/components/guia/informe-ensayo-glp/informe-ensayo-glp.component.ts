import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent, TipoMensaje } from '../../shared/message-modal/message-modal.component';
import { MaestrosService } from '../../../services/maestros.service';
import { GuiaService } from '../../../services/guia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { InformeEnsayoGlpEntidad } from '../../../models/informeEnsayoGlpEntidad';

@Component({
  selector: 'app-informe-ensayo-glp',
  templateUrl: './informe-ensayo-glp.component.html',
  styleUrls: ['./informe-ensayo-glp.component.css']
})
export class InformeEnsayoGlpComponent implements OnInit {
  @Input() detalleGuiaId: number;
  infoEnsayoGlp: InformeEnsayoGlpEntidad;
  loading: boolean;
  formaGlp: FormGroup;

  constructor(
    public _maestrosService: MaestrosService,
    public _modal: NgbModal,
    public _guiaService: GuiaService,
    public _alertService: AlertService) {}

  ngOnInit() {
    this.loading = true;
    this.infoEnsayoGlp = new InformeEnsayoGlpEntidad();
    this.setForm(this.infoEnsayoGlp);

    this._guiaService.obtenerInformeEnsayo(this.detalleGuiaId).subscribe(
      result => {
        this.loading = false;
        this.infoEnsayoGlp = result;

        if (this.infoEnsayoGlp == null) {
          this.infoEnsayoGlp = new InformeEnsayoGlpEntidad();
        }

        this.setForm(this.infoEnsayoGlp);
      });
  }

  setForm(infoEnsayoGlp: InformeEnsayoGlpEntidad) {
    this.formaGlp = new FormGroup({
      'id': new FormControl(infoEnsayoGlp.id),
      'observaciones': new FormControl(infoEnsayoGlp.observaciones),
      'numeroInformeLaboratorio': new FormControl(infoEnsayoGlp.numeroInformeLaboratorio),
      'densidadRelativa': new FormControl(infoEnsayoGlp.densidadRelativa),
      'presionVapor': new FormControl(infoEnsayoGlp.presionVapor),
      'numeroOctanoMotor': new FormControl(infoEnsayoGlp.numeroOctanoMotor),
      'metanoMol': new FormControl(infoEnsayoGlp.metanoMol),
      'etanoMol': new FormControl(infoEnsayoGlp.etanoMol),
      'etilenoMol': new FormControl(infoEnsayoGlp.etilenoMol),
      'propanoMol': new FormControl(infoEnsayoGlp.propanoMol),
      'propilenoMol': new FormControl(infoEnsayoGlp.propilenoMol),
      'isobutanoMol': new FormControl(infoEnsayoGlp.isobutanoMol),
      'nbutanoMol': new FormControl(infoEnsayoGlp.nbutanoMol),
      'trans2butenoMol': new FormControl(infoEnsayoGlp.trans2butenoMol),
      'butenoMol': new FormControl(infoEnsayoGlp.butenoMol),
      'isobutilenoMol': new FormControl(infoEnsayoGlp.isobutilenoMol),
      'cis2butenoMol': new FormControl(infoEnsayoGlp.cis2butenoMol),
      'isopentanoMol': new FormControl(infoEnsayoGlp.isopentanoMol),
      'npentanoMol': new FormControl(infoEnsayoGlp.npentanoMol),
      'butadienoMol': new FormControl(infoEnsayoGlp.butadienoMol),
      'hexano': new FormControl(infoEnsayoGlp.hexano),
      'corrosionLaminaCobre': new FormControl(infoEnsayoGlp.corrosionLaminaCobre),
      'determinacionEtilMercaptano': new FormControl(infoEnsayoGlp.determinacionEtilMercaptano)
    });
  }
}
