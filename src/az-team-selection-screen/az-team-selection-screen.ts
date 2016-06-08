/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-team-selection-screen')
class AzTeamSelectionScreen extends polymer.Base {

  private _onTeamATap() {
    this.fire('team-select', {
      selectedTeam: 'teamA'
    });
  }

  private _onTeamBTap() {
    this.fire('team-select', {
      selectedTeam: 'teamB'
    });
  }

  private _onRandomTap() {
    this.fire('team-select', {
      selectedTeam: 'random'
    });
  }
}

AzTeamSelectionScreen.register();
