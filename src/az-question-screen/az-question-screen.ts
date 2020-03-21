import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/iron-icon/iron-icon.js";
import { NeonSharedElementAnimatableBehavior } from "@polymer/neon-animation/neon-shared-element-animatable-behavior.js";

import "../az-hex/az-hex.js";
import "../az-icons.js";
import "../az-question-multiple-answers/az-question-multiple-answers.js";
import "../az-question-single-answer/az-question-single-answer.js";
import "../az-hex-timer/az-hex-timer.js";

import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property, observe } from "@polymer/decorators";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
import { AzGame } from "../az-game-model/az-game-model.js";
import { AzQuestionSingleAnswer } from "../az-question-single-answer/az-question-single-answer.js";
import { AzQuestionMultipleAnswers } from "../az-question-multiple-answers/az-question-multiple-answers.js";

interface AzSelectAnswerEventDetail {
  correct: boolean;
}

@customElement("az-question-screen")
class AzQuestionScreen extends (mixinBehaviors(
  [NeonSharedElementAnimatableBehavior],
  PolymerElement
) as typeof PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          line-height: 1.42857;
        }

        .container {
          @apply (--layout-horizontal);
          max-width: 730px;
          margin: 54px auto 0 auto;
        }

        .buttons-box {
          position: relative;
          width: 90px;
          height: 120px;
          margin-right: 15px;
        }

        #backButton,
        az-hex-timer {
          position: absolute;
          top: 52px;
          right: 28px;
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(1, 1);
        }

        #backButton[hidden],
        az-hex-timer[hidden] {
          display: initial !important;
          transform: scale(0);
        }

        /* Delay hex-timer animation especially when leaving the page
       so az-hex-timer's ghost doesn't reappear */
        :host.neon-animating az-hex-timer {
          transition-delay: 0.28s;
        }

        #currentHex {
          position: absolute;
          top: 5px;
          right: 0;
        }

        .question-box {
          @apply (--layout-flex);
          margin-right: 90px;
        }

        /* Not working in the shim,
       changed programatically. */
        az-hex-timer.teamA {
          --az-hex-timer-color: #ff8427;
        }

        az-hex-timer.teamB {
          --az-hex-timer-color: #00d3d8;
        }
      </style>

      <div class="container">
        <div class="buttons-box">
          <template is="dom-if" if="[[_timerEnabled]]">
            <az-hex-timer
              active="[[_timerRunning]]"
              seconds="[[game.timeout]]"
              on-finish="_onTimerFinish"
              hidden$="[[_isAnswered]]"
              class$="{{game.currentTeam}}"
            >
            </az-hex-timer>
          </template>
          <az-hex
            id="backButton"
            on-tap="_onBackTap"
            hidden$="[[!_isAnswered]]"
          >
            <iron-icon icon="az:arrow-back"></iron-icon>
          </az-hex>
          <az-hex id="currentHex" hex-state="[[game.currentTeam]]" disabled=""
            >[[hexNumber]]</az-hex
          >
        </div>
        <div class="question-box">
          <!-- Multiple choices -->
          <template
            is="dom-if"
            if="[[_modeMatches(_mode, 'multiple')]]"
            restamp="true"
          >
            <az-question-multiple-answers
              question="[[game.currentQuestion]]"
              answered="{{_isAnswered}}"
              correct="{{_correct}}"
            ></az-question-multiple-answers>
          </template>

          <!-- One Answer Mode -->
          <template
            is="dom-if"
            if="[[_modeMatches(_mode, 'single')]]"
            restamp="true"
          >
            <az-question-single-answer
              question="[[game.currentQuestion]]"
              answered="{{_isAnswered}}"
              correct="{{_correct}}"
            ></az-question-single-answer>
          </template>
        </div>
      </div>
    `;
  }

  @property({ type: Object, notify: true })
  public game: AzGame;

  @property({ type: Number })
  public hexNumber: number;

  private _timerEnabled: boolean;
  private _timerRunning: boolean;

  @property({
    type: Object
  })
  public sharedElements: any = function() {
    return {
      hero: this.$.currentHex
    };
  };

  @property({
    type: Object
  })
  public animationConfig: any = function() {
    return {
      entry: [
        {
          name: "hero-animation",
          id: "hero",
          toPage: this
        },
        {
          name: "fade-in-animation",
          node: this
        }
      ],
      exit: [
        {
          name: "hero-animation",
          id: "hero",
          fromPage: this
        },
        {
          name: "fade-out-animation",
          node: this
        }
      ]
    };
  };

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

  @observe("_isAnswered")
  private _isAnsweredChanged(isAnswered): void {
    if (this._isAnswered && this.game.timeout > 0 && !this._timerFinishing) {
      this._timerRunning = false;
    }
  }

  @observe("game.timeout")
  private _gameTimeoutChanged(timeout): void {
    this._timerEnabled = timeout > 0;
  }

  @observe("game.currentQuestion.answers")
  private _answersChanged(answers): void {
    this._mode = answers && answers.length > 1 ? "multiple" : "single";
  }

  @observe("game.currentTeam")
  private _currentTeamChanged(currentTeam): void {
    // this.customStyle['--az-hex-timer-color'] = 'blue';
    this.updateStyles();
  }

  private _onBackTap() {
    this.dispatchEvent(
      new CustomEvent("select-answer", {
        detail: <AzSelectAnswerEventDetail>{
          correct: this._correct
        }
      })
    );

    this._isAnswered = false;
    this._correct = null;
    this.dispatchEvent(new CustomEvent("back-tap"));

    // Warning: Resetting can influence value of _isAnswered
    switch (this._mode) {
      case "multiple":
        (<AzQuestionMultipleAnswers>(
          document.querySelector("az-question-multiple-answers")
        )).reset();
        break;
      case "single":
        (<AzQuestionSingleAnswer>(
          document.querySelector("az-question-single-answer")
        )).reset();
        break;
    }
  }

  private _modeMatches(mode, comp) {
    return mode === comp;
  }
}
