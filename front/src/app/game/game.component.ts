import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/models/game.model';
import { GameService } from 'src/services/game.service';
import { Answer } from 'src/models/question.model';
import { QuestionComponent } from '../questions/question/question.component';
import { T2sService } from 'src/services/t2s.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  onlyOnce : number;
  onlyOnce2 : number;
  
  constructor(private route: ActivatedRoute, private gameService: GameService, private t2sService : T2sService) { 
    this.onlyOnce=-1;
    this.onlyOnce2=-1;
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    gameService.setSelectedGame(id);
    
    this.gameService.gameSelected$.subscribe((game: Game) => {
      this.game=game;
    })
  }

  ngOnInit() {
  }

  /**
   * Permet de selectionner la reponse choisie par l'user
   * @param answer  reponse choisie par l'user
   */

  answerSelected(answer:Answer){
    ////Suppresion de la queue
    if(speechSynthesis.speaking || speechSynthesis.paused){
      speechSynthesis.cancel();
    }
    
    this.gameService.addAnswer(answer);
  }

  /**
   *Permet d'obtenir la question actuelle 
   */

  getCurrentQuestion(){
    //Si la partie n'est pas finie renvoi la questiona actuelle
    if(!this.isFinished()){

      //Ajout du texte de la question et des reponses au Text-to-speech seulement une fois
      if(!this.sameQuestion()){
        var rep=this.game.quiz.questions[this.game.step].answers;
        var text2="";
        text2=this.createAnswersText(text2,rep);
        var text =this.game.quiz.questions[this.game.step].label;
        text=text+" "+text2;
        this.t2sService.t2s(text);
        this.onlyOnce=this.game.step;
      }

      return this.game.quiz.questions[this.game.step];
    }

    
  }




  /**
   * Permet de creer le text contenant les réponses au format voulue (haut,bas,gauche,droite)
   * @param txt le texte a modifier
   * @param list la liste de reponses
   */

  createAnswersText(txt:string,list:Answer[]){
    const prefixes=["haut","gauche","droite","bas"];
    var i=0;
    for(i;i<list.length;i++){
      txt=txt+"Réponse "+prefixes[i]+" : "+list[i].value+" . ";
    }
    return txt;
  }

  /**
   * Permet de savoir si l'utilisateur en est toujours a la meme question. 
   */

  sameQuestion(){
    //console.log(this.game.step);
    //console.log(this.onlyOnce);
    //console.log(this.game.step==this.onlyOnce);
    return this.game.step==this.onlyOnce;
  }

  /**
   *Permet de repeter la question 
   */

  repeatQuestion(){
    this.onlyOnce-=1;
  }

  /**
   * Permet de savoir si une partie est terminee
   */

  isFinished(){

    //b est true si la partie est finie, false sinon
    var b=this.game.step >= this.game.quiz.questions.length;

    //lecture des resultats seulement une fois
    if(b && this.onlyOnce2!=this.onlyOnce){
      var txt = "Vous avez"+ this.game.rightAnswer +"bonne reponse sur" + this.game.quiz.questions.length +"questions .";
      this.t2sService.t2s(txt);
      this.onlyOnce2=this.onlyOnce;
    }

    return b;
  }

  /**
   * Suppression de la partie
   */

  deleteGame(){

    //Suppression de la queue du text-to-speech
    if(speechSynthesis.speaking){
      speechSynthesis.cancel();
    }
    if(sessionStorage.getItem("t2sOn")=="false"){
      speechSynthesis.cancel();
    }

    this.gameService.deleteGame();
  }

  callT2s(txt:string){
    this.t2sService.t2s(txt);
  }
}