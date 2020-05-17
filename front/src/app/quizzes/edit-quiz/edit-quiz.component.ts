import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  public textBody : string;
  private questionWidth : number = 50;
  private fdir = "row";

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) { 
    this.quizService.quizSelected$.subscribe((quiz) =>{

      this.quiz = quiz;
      if(!this.route.snapshot.paramMap.has('id')){
        this.router.navigate(['edit-quiz/' + quiz.id]);
      }
    });
    if(+sessionStorage.getItem("font")>=75){
      this.questionWidth = 90;
      this.fdir = "column";
    }
  }

  ngOnInit() {
    //console.log(this.route.snapshot.paramMap.get('id'))

    if(this.route.snapshot.paramMap.has('id')){

      const id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.quizService.setSelectedQuiz(id);
    }
  }

  textEdit(text : string){
    this.textBody = text
  }
}