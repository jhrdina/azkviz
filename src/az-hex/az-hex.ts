/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-hex')
class AzHex extends polymer.Base {

  @property({ type: String, reflectToAttribute: true })
  public hexState: string;
}

AzHex.register();
