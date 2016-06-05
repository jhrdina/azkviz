/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-question-multiple-answers')
class AzQuestionMultipleAnswers extends polymer.Base {

  @property({ type: Object })
  public question: AzQuestion;

  @property({ type: Boolean, notify: true, readOnly: true })
  public correct: boolean;
  private _setCorrect: (correct: boolean) => void;

  @property({ type: Boolean, notify: true, readOnly: true, value: false })
  public answered: boolean;
  private _setAnswered: (correct: boolean) => void;

  private _selectedAnswer: AzAnswer;

  public reset() {
    this._setAnswered(false);
    this._selectedAnswer = undefined;
  }

  private _onAnswerTap(event: Event) {
    this._selectedAnswer = this.$.answersRepeat.itemForElement(event.target);
    this._setCorrect(this._selectedAnswer.correct);
    this._setAnswered(true);
  }

  private _computeAnswerClasses(item: AzAnswer, isAnswered) {
    if (isAnswered) {
      if (item.correct) {
        return 'correct';
      } else if (!item.correct && item === this._selectedAnswer) {
        return 'wrong';
      }
    } else {
      return 'clickable';
    }
  }
}

AzQuestionMultipleAnswers.register();
