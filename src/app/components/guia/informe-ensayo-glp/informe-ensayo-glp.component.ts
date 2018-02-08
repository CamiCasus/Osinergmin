import { Component, OnInit , Input} from '@angular/core';
import { InformeEnsayoGlpEntidad } from '../../../models/infoEnsayoGlp';
import { MaestrosService } from '../../../services/maestros.service';
import { ItemTablaEntidad } from '../../../models/itemTablaEntidad';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-informe-ensayo-glp',
  templateUrl: './informe-ensayo-glp.component.html',
  styleUrls: ['./informe-ensayo-glp.component.css']
})
export class InformeEnsayoGlpComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('infoglp') infoEnsayoGlp: InformeEnsayoGlpEntidad;

  formaGlp: FormGroup;

  constructor(public _maestrosService: MaestrosService) { }

  ngOnInit() {
    if (this.infoEnsayoGlp == null) {
      this.infoEnsayoGlp = new InformeEnsayoGlpEntidad();
  }

  this.setForm(this.infoEnsayoGlp);

  }

  setForm (infoEnsayoGlp : InformeEnsayoGlpEntidad) {
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
