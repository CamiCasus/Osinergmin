import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class AppGlobals {
    // public static BASE_URL = 'http://10.26.10.148:1010';
    public static BASE_URL = 'http://localhost:54525';

    public static getSpanishDataTable() {
        return {
            'processing': 'Procesando...',
            'lengthMenu': 'Mostrar _MENU_ registros',
            'zeroRecords': 'No se encontraron resultados',
            'emptyTable': 'Ningún dato disponible en esta tabla',
            'info': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
            'infoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
            'infoFiltered': '(filtrado de un total de _MAX_ registros)',
            'infoPostFix': '',
            'search': 'Buscar:',
            'url': '',
            // 'sInfoThousands':  ',',
            'loadingRecords': 'Cargando...',
            'paginate': {
                'first': 'Primero',
                'last': 'Último',
                'next': 'Siguiente',
                'previous': 'Anterior'
            },
            'aria': {
                'sortAscending': ': Activar para ordenar la columna de manera ascendente',
                'sortDescending': ': Activar para ordenar la columna de manera descendente'
            }
        };
    }

    public static convertFileToBinaryString(fileInput: File): Promise<string> {
        const promise = new Promise<string>((resolve, reject) => {
            let resultado: string;

            const myReader: FileReader = new FileReader();

            myReader.onloadend = (e) => {
                var arrayBuffer = myReader.result,
                    array = new Uint8Array(arrayBuffer),
                    binaryString = String.fromCharCode.apply(null, array);
                resolve(binaryString);
            };

            myReader.readAsArrayBuffer(fileInput);
        });

        return promise;
    }
}
