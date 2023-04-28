import { Injectable } from '@angular/core';
import { quizObject } from "../models/models";


@Injectable({
  providedIn: 'root'
})
export class OptionsQuizService {

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
			const finalAnswer:string = await this.checkResult(obj.answers)
			obj.finished = true;
			obj.answerSelected = obj.quiz_questions.results[finalAnswer as keyof typeof obj.quiz_questions.results].text
			obj.answerImage = obj.quiz_questions.results[finalAnswer as keyof typeof obj.quiz_questions.results].image
		}
	}

	async checkResult (answers:string[]){
		const result = answers.reduce((prev, curr, i, arr) => {
			if(arr.filter(item => item === prev).length >
			arr.filter(item => item === curr).length
			){
				return prev

			}else {
				return curr
			}
		})

		return result
	}
}
