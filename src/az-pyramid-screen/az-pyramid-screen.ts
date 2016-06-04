/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-pyramid-screen')
class AzPyramidScreen extends polymer.Base {

  @property({ type: String, value: 'az-pyramid-screen' })
  public prop1: string;
}

AzPyramidScreen.register();
