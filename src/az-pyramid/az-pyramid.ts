/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzHexTapEventDetail {
  hexElement: AzHex;
  hexNumber: number;
}

@component('az-pyramid')
class AzPyramid extends polymer.Base {

  @property({ type: Object })
  public states: AzPyramidStates;

  private _onHexTap(event: MouseEvent) {
    var hexNum = parseInt((<AzHex>event.currentTarget).innerText);
    if (hexNum === NaN) {
      console.warn('Invalid hex number in hex', event.currentTarget);
      return;
    }

    this.fire('hex-tap', <AzHexTapEventDetail> {
      hexNumber: hexNum,
      hexElement: event.currentTarget
    });
  }
}

AzPyramid.register();
