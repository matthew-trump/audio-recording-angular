import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class ErrorMessageService {

    constructor() { }
    send(err: any) {
        console.log(err);
    }
}