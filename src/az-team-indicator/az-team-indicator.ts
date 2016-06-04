/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-team-indicator')
class AzTeamIndicator extends polymer.Base {

  @property({ type: String, value: 'teamA', reflectToAttribute: true })
  public team: string;
}

AzTeamIndicator.register();
