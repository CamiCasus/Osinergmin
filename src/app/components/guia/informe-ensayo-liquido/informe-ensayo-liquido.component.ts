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
  }

}
