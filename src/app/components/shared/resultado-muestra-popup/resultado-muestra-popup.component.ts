import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resultado-muestra-popup',
  templateUrl: './resultado-muestra-popup.component.html',
  styleUrls: ['./resultado-muestra-popup.component.css']
})
export class ResultadoMuestraPopupComponent implements OnInit {
  @Input() tipoMuestra;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
