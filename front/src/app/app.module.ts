import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizListTheme } from './quizzes/quiz-list-theme/quiz-list-theme.component'
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AccueilComponent } from './accueil/accueil.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { GameComponent } from './game/game.component';
import { SettingsComponent } from './settings/settings.component';
import { GameQuestionComponent } from './game/game-question/game-question.component';
import { GameHeaderComponent } from './game/game-header/game-header.component';
import { UserListComponent } from './users/users-list/users-list.component';
import { UserComponent } from './users/user/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';


import { RouteService } from 'src/services/route.service';
import { GameResultComponent } from './game/game-result/game-result.component';
import { PopupComponent } from './popup/popup.component';
import { HistoriesComponent } from './histories/histories.component';
import { HistoryGameComponent } from './histories/history-game/history-game.component';
import { HistoryComponent } from './histories/history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizListTheme,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    AccueilComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    GameComponent,
    SettingsComponent,
    GameQuestionComponent,
    GameHeaderComponent,
    GameResultComponent,
    UserListComponent,
    UserComponent,
    UserFormComponent,
    PopupComponent,
    HistoriesComponent,
    HistoryGameComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    RouteService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }