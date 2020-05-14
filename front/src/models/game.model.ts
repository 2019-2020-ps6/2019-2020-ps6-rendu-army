import { Quiz } from './quiz.model';
import { Answer } from './question.model';

export interface Game{

    id:number;
    quiz:Quiz;
    answersSelected:Answer[];
    date?:number;
    step:number;
    rightAnswer:number;
    userId:number;
    isFinish:boolean;
}