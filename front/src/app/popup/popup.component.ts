import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PopupService } from 'src/services/popup.service';
import { emit } from 'cluster';

@Component({ 
    selector: 'popup', 
    templateUrl: 'popup.component.html', 
    styleUrls: ['popup.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit, OnDestroy {

    info : string;
    buttonTrue : string;
    buttonFalse : string;
    saisie : boolean;
    name: String;

    private element : any;

    constructor(private modalService: PopupService, el: ElementRef) {

        this.element = el.nativeElement;
    }

    ngOnInit(): void {

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', el => {
            if (el.target.className === 'popup') {
                this.close(false, null);
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.element.remove();
    }

    // open modal
    open(info : string, buttonTrue :string, buttonFalse : string, saisie: boolean): void {

        this.info = info;
        this.buttonTrue = buttonTrue;
        this.buttonFalse = buttonFalse;
        this.saisie = saisie;
        this.element.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('popup');
        window.scroll(0,0);
    }


    // close modal
    close(b : boolean , name : String =null): void {


        this.element.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('popup');
        this.modalService.setResponse(b);
        this.modalService.setName(name);
    }

}