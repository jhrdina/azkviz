import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '../az-question-screen/shared-styles.js';
import '../az-hex/az-hex.js';
import '../az-icons.js';

import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property, observe, computed } from "@polymer/decorators";
import { AzAnswer, AzQuestion } from "../az-questions-model/az-questions-model";

@customElement("az-question-single-answer")
export class AzQuestionSingleAnswer extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        #question {
          @apply (--az-question);
        }

        #question.clickable {
          cursor: pointer;
        }

        #answerLine {
          @apply (--layout-horizontal);
        }

        #answer {
          @apply (--az-answer);
          @apply (--layout-flex);
          padding-left: 0;
        }

        #correctWrongBtns {
          margin-top: -9px;
        }

        #correctButton,
        #wrongButton {
          color: #fff;
          opacity: 0.4;
          transition: opacity 0.5s;
        }

        #correctButton.active,
        #wrongButton.active {
          opacity: 1;
        }

        #correctButton {
          --az-hex-bkg-color: #97d71e;
        }

        #wrongButton {
          --az-hex-bkg-color: #ff602b;
        }
      </style>

      <div
        id="question"
        class$="[[_questionClickableClass]]"
        on-tap="_onQuestionTap"
      >
        {{question.text}}
      </div>

      <div id="answerLine" hidden$="[[!_answerVisible]]">
        <div id="answer">
          [[_correctAnswer.text]]
        </div>

        <div id="correctWrongBtns">
          <az-hex
            id="wrongButton"
            class$="[[_computeWrongButtonActiveClass(correct)]]"
            on-tap="_onWrongTap"
          >
            <iron-icon icon="az:close"></iron-icon>
          </az-hex>
          <az-hex
            id="correctButton"
            class$="[[_computeCorrectButtonActiveClass(correct)]]"
            on-tap="_onCorrectTap"
          >
            <iron-icon icon="az:check"></iron-icon>
          </az-hex>
        </div>
      </div>
    `;
  }

  @property({ type: Object })
  public question: AzQuestion;

  @property({ type: Boolean, notify: true })
  public correct: boolean | null = null;

  @property({ type: Boolean, notify: true })
  public answered: boolean = false;

  _answerVisible: boolean;
  private _correctAnswer: AzAnswer | null;

  public ready() {
    this.reset();
  }

  public reset() {
    this.correct = null;
    this.answered = false;
  }

  @observe("question.answers")
  private _answersChanged(answers: AzAnswer[]): void {
    this._correctAnswer = answers && answers.length > 0 ? answers[0] : null;
  }

  @observe("answered")
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

  @computed("_answerVisible")
  get _questionClickableClass(): string {
    return !this._answerVisible ? "clickable" : "";
  }

  private _computeWrongButtonActiveClass(correct: boolean | null): string {
    return correct === false ? "active" : "";
  }

  private _computeCorrectButtonActiveClass(
    correct: boolean | null,
    value: boolean
  ): string {
    return correct === true ? "active" : "";
  }
}
