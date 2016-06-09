/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzSelectAnswerEventDetail {
  correct: boolean;
}

@component('az-question-screen')
class AzQuestionScreen extends polymer.Base {

  @property({ type: Object, notify: true })
  public game: AzGame;

  @property({ type: Number })
  public hexNumber: number;

  private _isAnswered: boolean;
  private _correct: boolean;
  private _mode: string;

  public ready() {
    this._isAnswered = false;
  }

  @observe('game.currentQuestion.answers')
  private _answersChanged(answers): void {
    this._mode = answers && answers.length > 1 ? 'multiple' : 'single';
  }

  private _onBackTap() {

    // Warning: Resetting can influence value of _isAnswered
    switch (this._mode) {
      case 'multiple':
        (<AzQuestionMultipleAnswers>document.querySelector('az-question-multiple-answers')).reset();
        break;
      case 'single':
        (<AzQuestionSingleAnswer>document.querySelector('az-question-single-answer')).reset();
        break;
    }

    this.fire('select-answer', <AzSelectAnswerEventDetail> {
      correct: this._correct
    });

    this._isAnswered = false;
    this.fire('back-tap');
  }

  private _modeMatches(mode, comp) {
    return mode === comp;
  }
}

AzQuestionScreen.register();
