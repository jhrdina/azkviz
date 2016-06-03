/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-app')
class AzApp extends polymer.Base {

  @property({ type: String, value: 'az-app' })
  public prop1: string;
}

AzApp.register();
