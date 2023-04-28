import { Component, OnInit } from '@angular/core';
import quiz_database  from "../../../assets/data/quiz_questions.json";
import { question, quizData, quizObject } from "../../models/models";
import { OptionsQuizService } from 'src/app/services/options-quiz.service';
import { TestQuizService } from 'src/app/services/test-quiz.service';
import { GameQuizService } from 'src/app/services/game-quiz.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, quizObject {
	//Main quiz selected
	quiz_questions!:quizData;
	//quiz properties
	title:string = ''
	questions!: question[];
	results!: object;
	quizType:string = '';
	prizes!:{
		prize:string,
		dificulty:number
	}[];
	// For selecting question by index
	questionIndex:number = 0;
	questionMaxIndex:number = 0;
	// question object selected
	questionSelected!: question;
	// for showing final result
	answers:string[] = [];
	answerSelected:string = '';
	answerImage:string = '';
	// quiz state for showing the results
	finished:boolean = false;
	// main service
	service!:any;
	// list of questions
	oldQuestionsList: number[] = [];
	// question time
	questionTime:number = 30;
	questionRemainingTime:number = 30;
	//Remainig Lives
	lives!:number;
	maxLives!:number;

	constructor(
		private serviceOptions:OptionsQuizService,
		private serviceTest: TestQuizService,
		private serviceGame: GameQuizService,
		private route: ActivatedRoute ){

			// get QUIZ ID by route parameters
			route.firstChild?.params.subscribe((val) =>{
				this.quiz_questions = quiz_database.quiz_list.find(element => element.id == val['id'])!;
			} )
			// If question not found by ID
			if (!this.quiz_questions) {
				this.finished = true;
				this.title = 'Quiz não encontrado';
				this.questionSelected = {
					id: 1,
					question: 'Sem questões para exibir',
					options:[],
					dificulty:1,
				};
				this.answerSelected = 'Nenhum Resultado a Exibir';
			}
			// Select main service
			this.quizType = this.quiz_questions ? this.quiz_questions.type : 'options'
			const serviceList = {
				'options': serviceOptions,
				'game': serviceGame,
				'test': serviceTest
			}
			this.service = serviceList[this.quizType as keyof typeof serviceList]

	}

	ngOnInit(): void {
		this.service.buildObject(this)
		if (this.quizType === 'game') {
			this.service.changeCountDown(this)
		}
	}

	userSelected(userSelection:string | string[]): void {
		this.service.checkAnswer(userSelection, this)
	}

}

