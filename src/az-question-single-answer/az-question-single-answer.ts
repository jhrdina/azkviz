/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-question-single-answer')
class AzQuestionSingleAnswer extends polymer.Base {

  @property({ type: Object })
  public question: AzQuestion;

  @property({ type: Boolean, notify: true, readOnly: true })
  public correct: boolean;
  private _setCorrect: (correct: boolean) => void;

  @property({ type: Boolean, notify: true, readOnly: true, value: false })
  public answered: boolean;
  private _setAnswered: (correct: boolean) => void;

  private _answerVisible: boolean;
  private _correctAnswer: AzAnswer;
  private _buttonsState: 'correct' | 'wrong' | 'unknown';

  public ready() {
    this.reset();
  }

  public reset() {
    this._setAnswered(false);
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
    this._buttonsState = 'correct';
    this._setCorrect(true);
    this._setAnswered(true);
  }

  private _onWrongTap() {
    this._buttonsState = 'wrong';
    this._setCorrect(false);
    this._setAnswered(true);
  }

  @property({computed: '_answerVisible'})
  private _questionClickableClass(answerVisible): string {
    return !answerVisible ? 'clickable' : '';
  }

  private _computeButtonActiveClass(button, buttonsState) {
    return buttonsState === button ? 'active' : '';
  }
}

AzQuestionSingleAnswer.register();
