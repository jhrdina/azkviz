/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-question-single-answer')
class AzQuestionSingleAnswer extends polymer.Base {

  @property({ type: Object })
  public question: AzQuestion;

  @property({ type: Boolean, notify: true, value: null })
  public correct: boolean | null;

  @property({ type: Boolean, notify: true, value: false })
  public answered: boolean;

  private _answerVisible: boolean;
  private _correctAnswer: AzAnswer | null;

  public ready() {
    this.reset();
  }

  public reset() {
    this.correct = null;
    this.answered = false;
  }

  @observe('question.answers')
  private _answersChanged(answers: AzAnswer[]): void {
    this._correctAnswer = answers && answers.length > 0 ? answers[0] : null;
  }

  @observe('answered')
  private _answeredChanged(answered: boolean): void {
    this._answerVisible = answered;
  }

  private _onQuestionTap() {
    this._answerVisible = true;
  }

  private _onCorrectTap() {
    this.correct = true;
    this.answered = true;
  }

  private _onWrongTap() {
    this.correct = false;
    this.answered = true;
  }

  @property({computed: '_answerVisible'})
  private _questionClickableClass(answerVisible: boolean): string {
    return !answerVisible ? 'clickable' : '';
  }

  private _computeWrongButtonActiveClass(correct: boolean | null): string {
    return correct === false ? 'active' : '';
  }

  private _computeCorrectButtonActiveClass(correct: boolean | null, value: boolean): string {
    return correct === true ? 'active' : '';
  }
}

AzQuestionSingleAnswer.register();
