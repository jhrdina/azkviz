/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-hex-timer')
class AzHexTimer extends polymer.Base {

  private static FRAME_MS = 30;

  @property({ type: Number, value: 6 })
  public seconds: number;

  @property({ type: Boolean, notify: true, value: false })
  public active: boolean;

  private _secsLeft: number;

  public _angle: number;
  public _angleStep: number;

  private _stopPie: number;
  private _stopText: number;
  private _stopCallback: number;

  private _sound: HTMLAudioElement;

  public attached() {
    this._angle = 0;
    this._sound = new Audio("sound.ogg");
  }

  @observe('seconds')
  private _secondsChanged(seconds): void {
    this._secsLeft = seconds;
    this._angleStep = AzHexTimer.FRAME_MS * 360 / (seconds * 1000);
  }

  public pause(): void {
    clearInterval(this._stopPie);
    clearInterval(this._stopText);
  }

  @observe('active')
  private _activeChanged(): void {

    // Pie Animation
    if (!this.active) {
      clearInterval(this._stopPie);
      this._angle = 0;
      this._draw();

    } else {
      this._stopPie = setInterval(function() {

        if (this.active && (this._angle + this._angleStep) < 360) {
          this._angle += this._angleStep;
        } else {
          this._angle = 360;
          clearInterval(this._stopPie);
        }

        this._draw();
      }.bind(this), AzHexTimer.FRAME_MS);
    }

    // Text animation
    if (!this.active) {
      clearInterval(this._stopText);
      clearTimeout(this._stopCallback);
      this._stopSound();
      this._secsLeft = this.seconds;

    } else {
      this._stopText = setInterval(() => {
        this._secsLeft -= 1;

        if (this._secsLeft === 3) {
          this._sound.play();
        }

        if (this._secsLeft <= 0) {
          clearInterval(this._stopText);
          this.fire('finish');
        }
      }, 1000, this.seconds);

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
      var r = (this._angle * Math.PI / 180),
          x = Math.sin(r) * 29.44,
          y = Math.cos(r) * -29.44,
          mid = (this._angle > 180) ? 1 : 0;
      anim = 'M 0 0 v -29.44 A 29.44 29.44 1 ' + mid + ' 1 ' + x + ' ' + y + '';
    } else {
      anim = 'M 0 -29.44 a 29.44 29.44 0 1 1 0 58.88 a 29.44 29.44 0 1 1 0 -58.88';
    }

    this.$.pie.setAttribute('d', anim);
  }
}

AzHexTimer.register();
