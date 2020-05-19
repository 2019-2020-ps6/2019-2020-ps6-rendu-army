import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { RSA_X931_PADDING } from 'constants';
import { resolve } from 'url';
import { first } from 'rxjs/operators';

  
@Injectable({
    providedIn: 'root'
})

export class PopupService {  

    private response$ : Subject<boolean> = new Subject()
    public name$ : Subject<String> = new Subject(); 
    private popup: any;

    constructor(){}

    setResponse(response : boolean){
        this.response$.next(response);
    }

    setName( name : String){
        this.name$.next(name);
    }

    add(popup: any) {
        // add modal to array of active modals
        this.popup = popup;
    }

    open(text : String, buttonTrue :string = null, buttonFalse : string = null, saisie : boolean=null){

        this.popup.open(text, buttonTrue, buttonFalse, saisie);
        return this.response$.pipe(first());
    }
}