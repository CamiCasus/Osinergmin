import { Component, OnInit , Input} from '@angular/core';
import { InformeEnsayoGlpEntidad } from '../../../models/infoEnsayoGlp';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent, TipoMensaje } from '../../shared/message-modal/message-modal.component';
import { MaestrosService } from '../../../services/maestros.service';
import { GuiaService } from '../../../services/guia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-informe-ensayo-glp',
  templateUrl: './informe-ensayo-glp.component.html',
  styleUrls: ['./informe-ensayo-glp.component.css']
})
export class InformeEnsayoGlpComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('infoglp') infoEnsayoGlp: InformeEnsayoGlpEntidad;
  loading: boolean;
  formaGlp: FormGroup;

  constructor(
    public _maestrosService: MaestrosService,
    public _modal: NgbModal,
    public _guiaService: GuiaService,
    public _alertService: AlertService
  ) {

   }

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

  presentarAOsinergmin(EnsayoGLPId) {
    const modalRef = this._modal.open(MessageModalComponent);
    modalRef.componentInstance.titulo = 'Grabar Ensayo GLP';
    modalRef.componentInstance.mensaje = '¿Estás seguro de realizar esta operación?';
    modalRef.componentInstance.tipoMensaje = TipoMensaje.confirmacion;

    modalRef.result.then((result) => {
      this.loading = true;
      this._guiaService.presentarEnsayoGLP(EnsayoGLPId).subscribe(data => {
        this.loading = false;

        if (data.exito) {
          this._alertService.success('Se presentó satisfactoriamente el Ensayo GLP a osinergmin');
        } else {
          this._alertService.error(data.mensaje);
        }
      });

    }, result => { });

    return false;
  }

}
