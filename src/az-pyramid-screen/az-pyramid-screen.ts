/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-pyramid-screen')
class AzPyramidScreen extends polymer.Base {

  @property({ type: Object })
  public game: AzGame;

  private _onBackTap() {
    this.fire('back-tap');
  }
}

AzPyramidScreen.register();
