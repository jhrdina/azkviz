import "../az-question-screen/shared-styles.js";

import { DomRepeat } from "@polymer/polymer/lib/elements/dom-repeat";
import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";
import {
  AzQuestion,
  AzAnswer
} from "../az-questions-model/az-questions-model.js";

@customElement("az-question-multiple-answers")
export class AzQuestionMultipleAnswers extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          line-height: 1.42857;
        }

        #question {
          @apply (--az-question);
        }

        #answersList {
          list-style-position: inside;
          padding-left: 0;
          margin: 0;
        }

        .answer {
          @apply (--az-answer);
        }

        .answer.clickable {
          cursor: pointer;
        }

        .answer.correct {
          background: var(--az-answer-correct-bkg);
        }

        .answer.wrong {
          background: var(--az-answer-wrong-bkg);
        }
      </style>

      <!-- Question -->
      <div id="question">{{question.text}}</div>

      <!-- Answers -->
      <ol id="answersList" type="A">
        <dom-repeat id="answersRepeat" items="[[question.answers]]">
          <template>
            <li
              class$="answer [[_computeAnswerClasses(item, answered)]]"
              on-tap="_onAnswerTap"
            >
              [[item.text]]
            </li>
          </template>
        </dom-repeat>
      </ol>
    `;
  }

  $: {
    answersRepeat: DomRepeat;
  };

  @property({ type: Object })
  public question: AzQuestion;

  @property({ type: Boolean, notify: true })
  public correct: boolean;

  @property({ type: Boolean, notify: true })
  public answered: boolean = false;

  private _selectedAnswer: AzAnswer | undefined;

  public reset(): void {
    this.answered = false;
    this._selectedAnswer = undefined;
  }

  private _onAnswerTap(event: Event): void {
    this._selectedAnswer = this.$.answersRepeat.itemForElement(
      event.target as HTMLElement
    );
    if (!this._selectedAnswer || this.answered) {
      return;
    }
    this.correct = this._selectedAnswer.correct;
    this.answered = true;
  }

  private _computeAnswerClasses(item: AzAnswer): string {
    if (this.answered) {
      if (item.correct) {
        return "correct";
      } else if (item === this._selectedAnswer) {
        return "wrong";
      } else {
        return "";
      }
    } else {
      return "clickable";
    }
  }
}
