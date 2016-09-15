/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-question-multiple-answers')
class AzQuestionMultipleAnswers extends polymer.Base {

  @property({ type: Object })
  public question: AzQuestion;

  @property({ type: Boolean, notify: true })
  public correct: boolean;

  @property({ type: Boolean, notify: true, value: false })
  public answered: boolean;

  private _selectedAnswer: AzAnswer | undefined;

  public reset(): void {
    this.answered = false;
    this._selectedAnswer = undefined;
  }

  private _onAnswerTap(event: Event): void {
    this._selectedAnswer = this.$.answersRepeat.itemForElement(event.target);
    if (!this._selectedAnswer || this.answered) {
      return;
    }
    this.correct = this._selectedAnswer.correct;
    this.answered = true;
  }

  private _computeAnswerClasses(item: AzAnswer): string {
    if (this.answered) {
      if (item.correct) {
        return 'correct';
      } else if (item === this._selectedAnswer) {
        return 'wrong';
      } else {
        return ''
      }
    } else {
      return 'clickable';
    }
  }
}

AzQuestionMultipleAnswers.register();
