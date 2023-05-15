import { Component, OnInit } from '@angular/core';
import  quizQuestion  from '../../../assets/data/quiz_question.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title: string = ''

  questions: any
  questionSelected: any

  answer: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false
  
  constructor() { }

  ngOnInit(): void {
    if(quizQuestion){
      this.finished = false
      this.title = quizQuestion.title

      this.questions = quizQuestion.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value: string): void {
    this.answer.push(value)
    this.nextStep()
  }

  nextStep() {
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      this.finished = true
    }
  }

}
