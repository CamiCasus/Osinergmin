import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AppGlobals {
    public static BASE_URL = 'http://10.26.10.148:1010';

    public static convertFileToBase64(fileInput: File): Promise<string> {

        let promise = new Promise<string>((resolve, reject) => {
            let resultado: string;

            var myReader: FileReader = new FileReader();

            myReader.onloadend = (e) => {
                resultado = myReader.result.split(',')[1];
                resolve(resultado);
            }

            myReader.readAsDataURL(fileInput);
        });

        return promise;
    }
}