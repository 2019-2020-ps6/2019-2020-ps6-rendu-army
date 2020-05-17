import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GameComponent } from './game/game.component';
import { SettingsComponent } from './settings/settings.component';
import { QuizListTheme } from './quizzes/quiz-list-theme/quiz-list-theme.component';
import { UserListComponent } from './users/users-list/users-list.component';
import { HistoriesComponent } from './histories/histories.component';

const routes: Routes = [
    {path:'', component: UserListComponent},
    {path:'accueil', component: AccueilComponent},
    {path:'quiz-list', component: QuizListComponent},
    {path:'edit-quiz/:id', component: EditQuizComponent},
    {path:'edit-quiz', component: EditQuizComponent},
    {path:'game/:id', component: GameComponent},
    {path:'settings', component: SettingsComponent},
    {path:'quiz-list/:theme', component: QuizListTheme},
    {path:'history', component: HistoriesComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}