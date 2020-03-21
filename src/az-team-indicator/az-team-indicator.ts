import "./wave-animation.js";

import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property, observe } from "@polymer/decorators";
import { NeonAnimationRunnerBehavior } from "@polymer/neon-animation/neon-animation-runner-behavior.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class";

@customElement("az-team-indicator")
class AzTeamIndicator extends (mixinBehaviors(
  [NeonAnimationRunnerBehavior],
  PolymerElement
) as typeof PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          margin: auto;

          position: relative;
        }

        #triangle {
          width: 80px;
          height: 20px;
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate(-50%, 0);
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            height 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host[finished] {
          width: 100%;
          height: auto;
        }

        :host[team="teamA"] #triangle {
          fill: var(--az-team-indicator-team-a-color, #ff8427);
        }

        :host[team="teamB"] #triangle {
          fill: var(--az-team-indicator-team-b-color, #00d3d8);
        }

        #wave {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;

          border-radius: 50%;
          width: 200px;
          height: 200px;
          background-color: var(--az-team-indicator-team-a-color, #ff8427);
        }

        :host[team="teamA"] #wave {
          background-color: var(--az-team-indicator-team-a-color, #ff8427);
        }

        :host[team="teamB"] #wave {
          background-color: var(--az-team-indicator-team-b-color, #00d3d8);
        }
      </style>
      <svg id="triangle" viewBox="0 0 80.000001 20" preserveAspectRatio="none">
        <path d="M0-.03h80L40 19.95z"></path>
      </svg>
      <div id="wave"></div>
    `;
  }

  $: {
    triangle: SVGElement
  }

  // From NeonAnimationRunnerBehavior:
  playAnimation: () => void;

  //=================================================================

  @property({ type: String, reflectToAttribute: true })
  public team: string = "teamA";

  @property({ type: Boolean })
  public noWave: boolean = false;

  @property({ type: Boolean, reflectToAttribute: true })
  public finished: boolean = false;

  @property({ type: Object })
  public animationConfig: any = function() {
    return {
      name: "wave-animation",
      node: this.$.wave,
      timing: {
        duration: 1500,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "both",
        delay: 200
      }
    };
  };

  @observe("team")
  private _teamChanged(team): void {
    if (!this.noWave) {
      this.playAnimation();
    }
  }

  @observe("finished")
  private _finishedChanged(finished): void {
    if (finished) {
      window.addEventListener("resize", this._onWindowResize.bind(this));
    } else {
      window.removeEventListener("resize", this._onWindowResize.bind(this));
    }
    this._updateWidth(100);
  }

  private _onWindowResize() {
    this._updateWidth(100);
  }

  private _updateWidth(height: number): void {
    const panelHeight = 48;
    height = Math.max(height, panelHeight + 1);
    if (this.finished) {
      this.$.triangle.style.width =
        (this.clientWidth * height) / (height - panelHeight) + "px";
      this.$.triangle.style.height = height + "px";
    } else {
      this.$.triangle.style.width = "";
      this.$.triangle.style.height = "";
    }
  }
}
