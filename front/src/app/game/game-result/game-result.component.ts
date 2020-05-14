import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Game } from 'src/models/game.model';
import { Router } from '@angular/router';
import { GameService } from 'src/services/game.service';

@Component({
    selector: 'app-game-result',
    templateUrl: './game-result.component.html',
    styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {
    
    @Input()
    game: Game;

    @Output() 
    delete: EventEmitter<any> = new EventEmitter();

    public recapitulatif : String

    ngOnInit() {}

    constructor(private router: Router, private gameService: GameService){

    }

    getMessageResult(){

        if(this.game.rightAnswer == this.game.quiz.questions.length){

            document.documentElement.style.setProperty('--cbg', 'green');
            return 'Parfait vous êtes incollable en ' + this.game.quiz.theme + ' !';
        }

        if(this.game.rightAnswer > this.game.quiz.questions.length * 2/3){

            document.documentElement.style.setProperty('--cbg', 'green');
            return 'Félicitation vous frolez la perfection !';
        }

        if(this.game.rightAnswer > this.game.quiz.questions.length * 1/3){
           
            document.documentElement.style.setProperty('--cbg', 'orange');
            return 'Encore un petit effort vous y êtes presque !';
        }

        else{

            document.documentElement.style.setProperty('--cbg', 'red');
            return 'Dommage vous ferez mieux la prochaine fois...';  
        }
    }

    back(){
        this.router.navigate(['/quiz-list']);
    }

    retry(){

        var quiz = this.game.quiz;
        this.gameService.createGame(quiz);
        this.gameService.gameCreated$.subscribe((game: Game) => {
            console.log("Retrying")
            this.router.navigateByUrl('/accueil', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/game/'+ game.id]);
            }); 
        })
    }

}