import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/game.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';


@Component({
    selector: 'app-histories',
    templateUrl: './histories.component.html',
    styleUrls: ['./histories.component.scss']
})

export class HistoriesComponent implements OnInit {
    
    games : Game[]= [];
    user : User;

    ngOnInit(){}

    constructor(private gameService : GameService, private  userService : UserService){

        this.user = userService.getSelectedUser();

        if(this.user != null)
            gameService.setGamesFromUrl(this.user.id);

        else{
            userService.userSelected$.subscribe((user) => {
                
                this.user = user;
                gameService.setGamesFromUrl(this.user.id);
            })
        }

        gameService.games$.subscribe((gameList) => {
            this.games = gameList;
        })
    }  
}