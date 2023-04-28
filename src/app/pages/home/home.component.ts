import { Component } from '@angular/core';
import quiz_database  from "../../../assets/data/quiz_questions.json";
import { quizData } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

	quizList: quizData[] = quiz_database.quiz_list
}
