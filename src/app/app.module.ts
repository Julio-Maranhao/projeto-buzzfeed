import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { OptionsQuizService } from './services/options-quiz.service';
import { HeartComponent } from './components/heart/heart.component';
import { CountdownComponent } from './components/countdown/countdown.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HomeComponent,
    QuizPageComponent,
    QuizCardComponent,
    HeartComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
		OptionsQuizService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
