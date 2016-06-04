/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-welcome-screen')
class AzWelcomeScreen extends polymer.Base {

  @property({ type: String, value: 'az-welcome-screen' })
  public prop1: string;
}

AzWelcomeScreen.register();
