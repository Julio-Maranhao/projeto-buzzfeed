import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
	id!:number;

	constructor(
		private activeRoute:ActivatedRoute,
		private router: Router
		){}

	ngOnInit(): void {
		this.activeRoute.firstChild?.params.subscribe(val => this.id = val['id']);
	}

	reloadPage():void {
		this.router.navigate(['/']).then(()=>{
			this.router.navigate(['/quiz', this.id])
		})
	}
}
