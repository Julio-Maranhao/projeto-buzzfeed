import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

	@Input() totalTime!: number;
	@Input() remainingTime!: number;
	firstAlert!: number;
	dangerAlert!: number;

	ngOnInit(): void {
		this.firstAlert = Math.ceil(this.totalTime/2);
		this.dangerAlert = 5;
	}

}
