/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzSelectAnswerEventDetail {
  correct: boolean;
}

@component('az-question-screen')
@behavior(Polymer['NeonSharedElementAnimatableBehavior'])
class AzQuestionScreen extends polymer.Base {

  @property({ type: Object, notify: true })
  public game: AzGame;

  @property({ type: Number })
  public hexNumber: number;

  @property({ type: Object, value: function() {
    return {
      'hero': this.$.currentHex
    };
  }})
  public sharedElements: any;

  @property({ type: Object, value: function() {
    return {
      'entry': [{
        name: 'hero-animation',
        id: 'hero',
        toPage: this
      }, {
        name: 'fade-in-animation',
        node: this
      }],
      'exit': [{
        name: 'hero-animation',
        id: 'hero',
        fromPage: this
      }, {
        name: 'fade-out-animation',
        node: this
      }]
    };
  }})
  public animationConfig: any;

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
