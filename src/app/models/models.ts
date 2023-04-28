// single question type
export type question = {
	id:number;
	question:string;
	options:{
		id:number;
		name:string;
		alias:string | string[];
	}[];
	dificulty:number;
}

type options = 'A' | 'B' | 'C' | 'D';
type result = Record<options,{text:string, image:string}>;

// quiz data on input data JSON
export type quizData = {
	id:number;
	type:string;
	image:string;
	title:string;
	prizes:{
		prize:string,
		dificulty:number
	}[];
	questions:question[];
	results:result;
}

// quiz object for redering HTML and Algorithm
export type quizObject = {
	quiz_questions:quizData;
	title:string;
	questions: question[];
	results: object;
	questionIndex:number;
	questionMaxIndex:number;
	questionSelected: question;
	answers:string[];
	answerSelected:string;
	answerImage:string;
	finished:boolean;
	oldQuestionsList: number[];
	questionRemainingTime:number;
	prizes:{
		prize:string,
		dificulty:number
	}[];
	lives:number;
	maxLives:number;
}
