import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/models/game.model';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
    
    @Input()
    game:Game;

    more : string = 'none';

    ngOnInit(){}

    
    constructor(){}
    
    showMore(){
        
        if(this.more == 'block')
            this.more = 'none'
        else
            this.more = "block"
    }

    backgroundColor(){

        if(this.game.rightAnswer > this.game.quiz.questions.length * 2/3)
            return 'green';

        if(this.game.rightAnswer > this.game.quiz.questions.length * 1/3)
            return 'orange';

        else
            return 'red';
    }

    getGameDate(){

        var date = new Date(this.game.id);
        return date.toLocaleString();
    }
}