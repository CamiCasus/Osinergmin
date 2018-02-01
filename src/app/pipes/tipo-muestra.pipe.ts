import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoMuestra'
})
export class TipoMuestraPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value === 1 ? 'GLP' : 'Líquido';
  }
}
