import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/models/game.model';

@Component({
    selector: 'app-history-game',
    templateUrl: './history-game.component.html',
    styleUrls: ['./history-game.component.scss']
})



export class HistoryGameComponent implements OnInit {
    
    @Input()
    game:Game;

    ngOnInit(){}

    
    constructor(){}   
}