import { Injectable } from '@angular/core';
import { question, quizObject } from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class GameQuizService {
	obj!:quizObject;

  constructor() { }

	buildObject(obj:quizObject): void {
		if (obj.quiz_questions) {
			obj.finished = false;
			obj.title = obj.quiz_questions.title;
			obj.questions = obj.quiz_questions.questions;
			obj.results = obj.quiz_questions.results;
			obj.prizes = obj.quiz_questions.prizes

			obj.questionIndex = 0;

			obj.questionSelected = this.getUniqueQuestionByDificulty(obj.oldQuestionsList, obj.questions, obj.prizes[obj.questionIndex].dificulty);
			obj.oldQuestionsList.push(obj.questionSelected.id);

			obj.questionMaxIndex = obj.quiz_questions.prizes.length;
			obj.lives = 2;
			obj.maxLives = 2;
			this.resetTimer(obj)
		}
	}

	changeCountDown(obj:quizObject): void{
		const interval = setInterval(() => {
			obj.questionRemainingTime -= 1
			if (obj.questionRemainingTime <= 0) {
				if(obj.finished) {
					clearInterval(interval)
					obj.questionRemainingTime = 0
				}
				if (!obj.finished){
					this.removeHeart(1, obj)
				}
				if (!obj.finished){
					obj.questionSelected = this.getUniqueQuestionByDificulty(obj.oldQuestionsList, obj.questions, obj.prizes[obj.questionIndex].dificulty);
					obj.oldQuestionsList.push(obj.questionSelected.id);
					this.resetTimer(obj)
				}
			 }
		}, 1000)
	}

	checkAnswer(userSelection:string | string[], obj:quizObject): void {
		Array.isArray(userSelection) ? obj.answers.push(...userSelection) : obj.answers.push(userSelection);
		if (userSelection === 'B'){
			this.removeHeart(1, obj)
			obj.questionSelected = this.getUniqueQuestionByDificulty(obj.oldQuestionsList, obj.questions, obj.prizes[obj.questionIndex].dificulty);
			obj.oldQuestionsList.push(obj.questionSelected.id);
			this.resetTimer(obj)

		} else {
			this.nextStep(obj);
			this.resetTimer(obj);
		}
	}

	removeHeart(qtd:number, obj:quizObject){
		obj.lives -= qtd;
		if (obj.lives < 0){
			this.gameOver(obj)
		}
	}

	resetTimer(obj:quizObject){
		obj.questionRemainingTime = 120 / obj.prizes[obj.questionIndex].dificulty
	}

	gameOver(obj:quizObject): void{
		obj.finished = true;
		let prizeIndex = obj.questionIndex - 1;
		if (prizeIndex < 0) {
			obj.answerSelected = 'Infelizmente você não ganhou nada'
		} else {
			obj.answerSelected = obj.quiz_questions.results['B'].text + obj.prizes[Math.max(prizeIndex, 0)].prize;
			obj.answerImage = obj.quiz_questions.results['B'].image;
		}
		obj.questionRemainingTime = 0;
	}

	async nextStep(obj:quizObject){
		obj.questionIndex += 1;
		if(obj.questionMaxIndex > obj.questionIndex){
			obj.questionSelected = this.getUniqueQuestionByDificulty(obj.oldQuestionsList, obj.questions, obj.prizes[obj.questionIndex].dificulty);
			obj.oldQuestionsList.push(obj.questionSelected.id);
			if (obj.prizes[obj.questionIndex].dificulty === 4) {
				this.removeHeart(obj.lives, obj)
			};
		}else {
			obj.finished = true;
			obj.answerSelected = obj.quiz_questions.results['A'].text + obj.prizes[obj.questionIndex - 1].prize;
			obj.answerImage = obj.quiz_questions.results['A'].image;
			obj.questionRemainingTime = 0;
		}
	}

	getRandomElement(list:question[]) {
		return list[Math.floor(Math.random() * list.length)]
	}

	getUniqueQuestionByDificulty(oldQuestions:number[], questionList: question[], dificulty:number) {
		const filteredQuestions =  questionList.filter(question => question.dificulty === dificulty && !oldQuestions.includes(question.id))
		return this.getRandomElement(filteredQuestions)
	}
}
