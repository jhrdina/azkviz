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

  private _timerEnabled: boolean;
  private _timerRunning: boolean;

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
  private _correct: boolean | null;
  private _mode: string;

  public ready() {
    this._isAnswered = false;
  }

  public startTimer() {
    this._timerRunning = false;
    this._timerRunning = true;
  }

  private _timerFinishing: boolean;

  private _onTimerFinish() {
    this._timerFinishing = true;

    this._isAnswered = true;
    this._correct = false;

    this._timerFinishing = false;
  }

  @observe('_isAnswered')
  private _isAnsweredChanged(isAnswered): void {
    if (this._isAnswered && this.game.timeout > 0 && !this._timerFinishing) {
      this._timerRunning = false;
    }
  }

  @observe('game.timeout')
  private _gameTimeoutChanged(timeout): void {
      this._timerEnabled = timeout > 0;
  }

  @observe('game.currentQuestion.answers')
  private _answersChanged(answers): void {
    this._mode = answers && answers.length > 1 ? 'multiple' : 'single';
  }

  @observe('game.currentTeam')
  private _currentTeamChanged(currentTeam): void {
    // this.customStyle['--az-hex-timer-color'] = 'blue';
    this.updateStyles();
  }

  private _onBackTap() {

    this.fire('select-answer', <AzSelectAnswerEventDetail> {
      correct: this._correct
    });

    this._isAnswered = false;
    this._correct = null;
    this.fire('back-tap');

    // Warning: Resetting can influence value of _isAnswered
    switch (this._mode) {
      case 'multiple':
        (<AzQuestionMultipleAnswers>document.querySelector('az-question-multiple-answers')).reset();
        break;
      case 'single':
        (<AzQuestionSingleAnswer>document.querySelector('az-question-single-answer')).reset();
        break;
    }
  }

  private _modeMatches(mode, comp) {
    return mode === comp;
  }
}

AzQuestionScreen.register();
