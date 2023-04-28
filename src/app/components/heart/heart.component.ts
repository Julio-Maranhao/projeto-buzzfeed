import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css']
})
export class HeartComponent implements OnInit {
	@Input() lives!: number;
	@Input() maxLives!:number;
	lifeArray!: number[];

	constructor(){
	}
	ngOnInit(): void {
		this.lifeArray = [...Array(this.maxLives).keys()];
		this.lives = this.maxLives
	}
}
