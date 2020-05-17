import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/game.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';



@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  public textBody : string;

  private fdir : string;

  private falign : string;

  private fjust : string;

  private width : number;

  constructor(private router: Router, public quizService: QuizService, private gameService : GameService) {

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });

    this.fdir = "row";
    this.falign = "stretch";
    this.fjust = "";

    const userFont = +sessionStorage.getItem("font");

    if((window.matchMedia("(max-width : 1440px)").matches && userFont>=90) ||
    (window.matchMedia("(max-width : 1280px)").matches && userFont>=75)){
      this.fdir = "column";
      this.falign = "center";
    } else if((window.matchMedia("(max-width : 1680px)").matches || window.matchMedia("(max-width : 1920px)").matches)
     && userFont>=75){
      this.fjust = "space-around"
    }

    if(userFont>=90){
      this.width = 800;
    }else if(userFont>=75){
      this.width = 600;
    } else this.width = 340;
  }

  ngOnInit() {
  }

  quizSelected(quiz: Quiz) {

    console.log('Selected Quiz:', quiz);

    this.gameService.createGame(quiz);
    this.gameService.gameCreated$.subscribe((game: Game) => {
      this.router.navigate(['/game/'+ game.id]);
    })
  }

  quizDeleted(quiz : Quiz){
    this.quizService.deleteQuiz(quiz);
  }

  quizEdit(quiz: Quiz) {
    this.router.navigate(['/edit-quiz/'+ quiz.name]);
  }

  textEdit(text : string){
    this.textBody = text
  }

  createQuiz(){
    this.router.navigate(['edit-quiz']);
  }
}
