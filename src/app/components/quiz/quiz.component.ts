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

  answers: string[] = []
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
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizQuestion.results[finalAnswer as keyof typeof quizQuestion.results]
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item == previous).length >
        arr.filter(item => item == current).length
      ){
        return previous
      }else { return current }
    })
    return result
  }

}
