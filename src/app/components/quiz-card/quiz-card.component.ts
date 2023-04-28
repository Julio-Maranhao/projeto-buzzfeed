import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent {
	@Input() id:string = '0';
	@Input() image:string = '';
	@Input() title:string = '';
}
