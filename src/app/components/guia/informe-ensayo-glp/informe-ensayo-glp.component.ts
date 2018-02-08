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
  }
}
