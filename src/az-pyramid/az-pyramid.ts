/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzHexTapEventDetail {
  hexNumber: number;
}

@component('az-pyramid')
class AzPyramid extends polymer.Base {

  @property({ type: Object })
  public states: AzPyramidStates;

  private _onHexTap(e: Event) {
    var hexNum = parseInt((<AzHex>e.currentTarget).innerText);
    if (hexNum === NaN) {
      console.warn('Invalid hex number in hex', e.currentTarget);
      return;
    }

    this.fire('hex-tap', <AzHexTapEventDetail> {
      hexNumber: hexNum
    });
  }
}

AzPyramid.register();
