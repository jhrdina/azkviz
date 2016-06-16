/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-help-screen')
class AzHelpScreen extends polymer.Base {

  private _onBackTap() {
    this.fire('back-tap');
  }
}

AzHelpScreen.register();
