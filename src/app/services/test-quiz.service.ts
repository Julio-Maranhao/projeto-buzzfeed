import { Injectable } from '@angular/core';
import { quizObject } from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class TestQuizService {
	obj!:quizObject;

  constructor() { }

	buildObject(obj:quizObject): void {
		if (obj.quiz_questions) {
			obj.finished = false;
			obj.title = obj.quiz_questions.title;
			obj.questions = obj.quiz_questions.questions;
			obj.results = obj.quiz_questions.results;

			obj.questionSelected = obj.questions[obj.questionIndex];

			obj.questionIndex = 0;
			obj.questionMaxIndex = obj.questions.length;
		}
	}

	checkAnswer(userSelection:string | string[], obj:quizObject): void {
		Array.isArray(userSelection) ? obj.answers.push(...userSelection) : obj.answers.push(userSelection);
		this.nextStep(obj);
	}

	async nextStep(obj:quizObject){
		obj.questionIndex += 1;
		if(obj.questionMaxIndex > obj.questionIndex){
			obj.questionSelected = obj.questions[obj.questionIndex]
		}else {
			const finalAnswer:string = 'A';
			const percent:number = obj.answers.filter(item => item === finalAnswer).length * 100 / obj.answers.length;
			obj.finished = true;
			obj.answerSelected = obj.quiz_questions.results[finalAnswer as keyof typeof obj.quiz_questions.results].text + ' ' + percent.toFixed(0) + '%'
			obj.answerImage = obj.quiz_questions.results[finalAnswer as keyof typeof obj.quiz_questions.results].image
		}
	}

}
