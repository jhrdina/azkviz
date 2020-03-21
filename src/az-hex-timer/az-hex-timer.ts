import '../roboto.js';
import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property, observe } from "@polymer/decorators";

@customElement("az-hex-timer")
class AzHexTimer extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          position: relative;
          display: block;
          width: 51px;
          height: 59px;
        }

        .timer-label {
          position: absolute;
          left: 0;
          top: 0;
          width: 51px;
          line-height: 59px;

          font-family: "Roboto", "Noto", sans-serif;
          text-align: center;

          font-size: 22px;
          font-weight: 500;
        }

        #pie {
          fill: var(--az-hex-timer-color, #ff8427);
        }
      </style>

      <svg xmlns="http://www.w3.org/2000/svg" height="59" width="51">
        <path
          fill="#e6e6e6"
          d="M50.998 44.605l-25.504 14.75L-.01 44.63V15.183L25.494.432l25.504 14.723z"
        ></path>
        <path id="pie" transform="translate(25.5,29.44)"></path>
        <path
          fill="#fff"
          d="M0 .118v14.72L25.5.117H0zm25.5 0L51 14.838V.117H25.5zM0 44.238v14.72h25.5L0 44.257zm25.5 14.72H51v-14.72l-25.5 14.72zM45.995 42.042l-20.508 11.86L4.98 42.063v-23.68l20.507-11.86 20.508 11.84z"
        ></path>
      </svg>
      <div class="timer-label">[[_secsLeft]]</div>
    `;
  }

  private static FRAME_MS = 30;

  @property({ type: Number })
  public seconds: number = 30;

  @property({ type: Boolean, notify: true })
  public active: boolean = false;

  private _secsLeft: number;

  public _angle: number;
  public _angleStep: number;

  private _stopPie: number;
  private _stopText: number;
  private _stopCallback: number;

  private _sound: HTMLAudioElement;

  public attached() {
    this._angle = 0;
    this._sound = new Audio("/src/az-hex-timer/sound.ogg");
  }

  @observe("seconds")
  private _secondsChanged(seconds): void {
    this._secsLeft = seconds;
    this._angleStep = (AzHexTimer.FRAME_MS * 360) / (seconds * 1000);
  }

  public pause(): void {
    clearInterval(this._stopPie);
    clearInterval(this._stopText);
  }

  @observe("active")
  private _activeChanged(): void {
    // Pie Animation
    if (!this.active) {
      clearInterval(this._stopPie);
      this._angle = 0;
      this._draw();
    } else {
      this._stopPie = setInterval(
        function() {
          if (this.active && this._angle + this._angleStep < 360) {
            this._angle += this._angleStep;
          } else {
            this._angle = 360;
            clearInterval(this._stopPie);
          }

          this._draw();
        }.bind(this),
        AzHexTimer.FRAME_MS
      );
    }

    // Text animation
    if (!this.active) {
      clearInterval(this._stopText);
      clearTimeout(this._stopCallback);
      this._stopSound();
      this._secsLeft = this.seconds;
    } else {
      this._stopText = setInterval(
        () => {
          this._secsLeft -= 1;

          if (this._secsLeft === 3) {
            this._sound.play();
          }

          if (this._secsLeft <= 0) {
            clearInterval(this._stopText);
            this.dispatchEvent(new CustomEvent("finish"));
          }
        },
        1000,
        this.seconds
      );

      // this._secsLeft -= 1;

      this._stopCallback = setTimeout(() => {
        // this.fire('finish');
      }, this.seconds * 1000);
    }
  }

  private _stopSound() {
    if (!this._sound) return;

    this._sound.pause();
    this._sound.currentTime = 0;
  }

  private _draw(): void {
    var anim;
    if (this._angle < 360) {
      var r = (this._angle * Math.PI) / 180,
        x = Math.sin(r) * 29.44,
        y = Math.cos(r) * -29.44,
        mid = this._angle > 180 ? 1 : 0;
      anim = "M 0 0 v -29.44 A 29.44 29.44 1 " + mid + " 1 " + x + " " + y + "";
    } else {
      anim =
        "M 0 -29.44 a 29.44 29.44 0 1 1 0 58.88 a 29.44 29.44 0 1 1 0 -58.88";
    }

    this.$.pie.setAttribute("d", anim);
  }
}
