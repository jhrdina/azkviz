import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import { PaperDialogElement } from "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-button/paper-button.js";
import { NeonSharedElementAnimatableBehavior } from "@polymer/neon-animation/neon-shared-element-animatable-behavior.js";
import "../az-pyramid/az-pyramid.js";
import "../az-team-indicator/az-team-indicator.js";
import "../az-icons.js";

import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";
import { AzGame } from "../az-game-model/az-game-model.js";
import { AzHexTapEventDetail } from "../az-pyramid/az-pyramid.js";

@customElement("az-pyramid-screen")
export class AzPyramidScreen extends (mixinBehaviors(
  [NeonSharedElementAnimatableBehavior],
  PolymerElement
) as typeof PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          @apply (--layout-vertical);
          /*position: relative;*/
        }

        #backButton {
          position: absolute;
          top: 4px;
          left: 4px;
          z-index: 10;
          transition: color 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .white {
          color: white;
        }

        az-pyramid {
          @apply (--layout-flex);
        }
      </style>

      <paper-icon-button
        id="backButton"
        class$="[[_computeBackButtonClass(game.finished)]]"
        icon="az:arrow-back"
        on-tap="_onBackTap"
      >
      </paper-icon-button>
      <az-team-indicator
        finished="[[game.finished]]"
        team="[[game.currentTeam]]"
      ></az-team-indicator>
      <az-pyramid states="[[game.pyramid]]" on-hex-tap="_onHexTap">
      </az-pyramid>

      <paper-dialog
        id="exitDialog"
        on-iron-overlay-closed="_onExitDialogClosed"
        modal=""
      >
        <h2>Ukončit hru?</h2>
        <p>
          Opravdu se chcete vrátit na úvodní obrazovku? Rozehraná hra bude
          ztracena.
        </p>
        <div class="buttons">
          <paper-button dialog-dismiss="">Zrušit</paper-button>
          <paper-button dialog-confirm="">Ukončit hru</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  $: {
    exitDialog: PaperDialogElement;
  };

  @property({ type: Object })
  public game: AzGame;

  @property({ type: Object })
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

  public sharedElements: any;

  private _onBackTap() {
    this.$.exitDialog.open();
  }

  private _onHexTap(event: Event, detail: AzHexTapEventDetail) {
    // Configure the page animation
    this.sharedElements = {
      hero: detail.hexElement
    };
  }

  private _onExitDialogClosed(event: Event, detail) {
    if (detail.confirmed) {
      this.dispatchEvent(new CustomEvent("back-tap"));
    }
  }

  private _computeBackButtonClass(gameFinished: boolean) {
    return gameFinished ? "white" : "";
  }
}
