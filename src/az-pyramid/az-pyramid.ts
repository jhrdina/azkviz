/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-pyramid')
class AzPyramid extends polymer.Base {

  private _onHexTap(e: Event) {
    var hexNum = parseInt((<HTMLElement>e.currentTarget).innerText);
    if (hexNum === NaN) {
      console.warn('Invalid hex number in hex', e.currentTarget);
      return;
    }

    this.fire('hex-tap', {
      hexNum: hexNum
    });
  }
}

AzPyramid.register();
