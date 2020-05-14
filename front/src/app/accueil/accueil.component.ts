import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { GameService } from 'src/services/game.service';
import { PopupService } from 'src/services/popup.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  user : User;

 constructor(private router : Router, private userService : UserService, private gameService : GameService, private popupService : PopupService){

  this.user = userService.getSelectedUser();

  if(this.user != null)
    gameService.setNotFinishedGame(this.user.id);

  else{

    userService.userSelected$.subscribe((user) => {
      gameService.setNotFinishedGame(user.id);
    });
  }
  
  gameService.gameNotFinished$.subscribe((game)=>{

    if(game != null){

      popupService.open("Voulez-vous reprendre la partie en cours ?", "Oui", "Non").subscribe((response) => {

        if(response)
          this.router.navigate(['/game/'+ game.id]);

        else{

          gameService.deleteGame();
        }
      })
    }
  })
 }

  ngOnInit(){}

  list(){
    this.router.navigate(['quiz-list']);
  }

  settings(){
    this.router.navigate(['settings']);
  }

  history(){
    this.router.navigate(['history'])
  }

  back(){
    this.router.navigate([''])
  }
}