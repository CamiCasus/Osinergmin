import { Pipe, PipeTransform } from '@angular/core';
import { TipoContenido } from '../components/shared/content-popup/content-popup.component';

@Pipe({
  name: 'tipoMuestra'
})
export class TipoMuestraPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value === TipoContenido.informeEnsayoGlp ? 'GLP' : 'Líquido';
  }
}
