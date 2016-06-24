/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-question-single-answer')
class AzQuestionSingleAnswer extends polymer.Base {

  @property({ type: Object })
  public question: AzQuestion;

  @property({ type: Boolean, notify: true })
  public correct: boolean | null;

  @property({ type: Boolean, notify: true, value: false })
  public answered: boolean;

  private _answerVisible: boolean;
  private _correctAnswer: AzAnswer;
  private _buttonsState: 'correct' | 'wrong' | 'unknown';

  public ready() {
    this.reset();
  }

  public reset() {
    this.correct = null;
    this.answered = false;
    this._answerVisible = false;
    this._buttonsState = 'unknown';
  }

  @observe('question.answers')
  private _answersChanged(answers): void {
    this._correctAnswer = answers && answers.length > 0 ? answers[0] : null;
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

  @observe('answered')
  private _answeredChanged(answered): void {
    this._answerVisible = true;
  }

  @observe('correct')
  private _correctChanged(correct: boolean | null): void {
    if (correct === null) {
      this._buttonsState = 'unknown';
    } else {
      this._buttonsState = correct ? 'correct' : 'wrong';
    }
  }

  @property({computed: '_answerVisible'})
  private _questionClickableClass(answerVisible): string {
    return !answerVisible ? 'clickable' : '';
  }

  private _computeButtonActiveClass(button, buttonsState): string {
    return buttonsState === button ? 'active' : '';
  }
}

AzQuestionSingleAnswer.register();
