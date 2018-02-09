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
  infoEnsayoGlp: InformeEnsayoGlpEntidad;
  loading: boolean;
  formaGlp: FormGroup;

  constructor(
    public _maestrosService: MaestrosService,
    public _modal: NgbModal,
    public _guiaService: GuiaService,
    public _alertService: AlertService) {}

  ngOnInit() {
    if (this.infoEnsayoGlp == null) {
      this.infoEnsayoGlp = new InformeEnsayoGlpEntidad();
    }

    this.setForm(this.infoEnsayoGlp);
  }

  setForm(infoEnsayoGlp: InformeEnsayoGlpEntidad) {
    this.formaGlp = new FormGroup({
      'id': new FormControl(),
      'observaciones': new FormControl(),
      'numeroInformeLaboratorio': new FormControl(),
      'densidadRelativa': new FormControl(),
      'presionVapor': new FormControl(),
      'numeroOctanoMotor': new FormControl(),
      'metanoMol': new FormControl(),
      'etanoMol': new FormControl(),
      'etilenoMol': new FormControl(),
      'propanoMol': new FormControl(),
      'propilenoMol': new FormControl(),
      'isobutanoMol': new FormControl(),
      'nbutanoMol': new FormControl(),
      'trans2butenoMol': new FormControl(),
      'butenoMol': new FormControl(),
      'isobutilenoMol': new FormControl(),
      'cis2butenoMol': new FormControl(),
      'isopentanoMol': new FormControl(),
      'npentanoMol': new FormControl(),
      'butadienoMol': new FormControl(),
      'hexano': new FormControl(),
      'corrosionLaminaCobre': new FormControl(),
      'determinacionEtilMercaptano': new FormControl()
    });
  }
}
